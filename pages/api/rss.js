import BLOG from '@/blog.config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { buildFeed } from '@/lib/utils/rss'

/**
 * In-memory RSS cache to avoid regenerating on every request.
 * Survives across ISR revalidations within the same serverless instance.
 */
let rssCache = {
  xml: null,
  atomXml: null,
  json: null,
  updatedAt: 0
}

const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

function isCacheFresh() {
  return rssCache.xml && Date.now() - rssCache.updatedAt < CACHE_TTL_MS
}

/**
 * Generate RSS feed content from site data.
 * Uses the same buildFeed() as the build-time static feed, so the dynamic
 * endpoint and public/rss/feed.xml are identical (full content, author
 * email, SUB_PATH and password-protected post handling included).
 */
async function generateRssContent() {
  const locale = BLOG.LANG
  const pageId = BLOG.NOTION_PAGE_ID

  // Parse the first (default) page ID for data fetching
  const pageIds = pageId.split(',')
  const targetId = pageIds[0].includes(':')
    ? pageIds[0].split(':')[1]
    : pageIds[0]

  const props = await fetchGlobalAllData({
    from: 'rss-api',
    pageId: targetId,
    locale
  })
  if (!props || !props.allPages) {
    return null
  }

  // Keep the previous empty-feed behavior: no published posts => 503
  const publishedPosts = props.allPages.filter(
    p => p.type === 'Post' && p.status === 'Published'
  )
  if (publishedPosts.length === 0) {
    return null
  }

  const feed = await buildFeed(props)
  return {
    xml: feed.rss2(),
    atomXml: feed.atom1(),
    json: feed.json1()
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    if (!isCacheFresh()) {
      const content = await generateRssContent()
      if (content) {
        rssCache = {
          ...content,
          updatedAt: Date.now()
        }
      }
    }

    if (!rssCache.xml) {
      return res.status(503).json({ message: 'RSS feed not available' })
    }

    const format = req.query.format || 'rss'

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600')

    if (format === 'atom') {
      res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
      return res.status(200).send(rssCache.atomXml)
    }

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.status(200).send(rssCache.json)
    }

    // Default: RSS 2.0
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    return res.status(200).send(rssCache.xml)
  } catch (error) {
    console.error('[RSS API] Error generating feed:', error)
    return res.status(500).json({ message: 'Failed to generate RSS feed' })
  }
}
