import { getPublicPostBlockMap } from '@/lib/utils/publicPost'
import BLOG from '@/blog.config'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { getPostBlocks } from '@/lib/db/SiteDataApi'
import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'
import { Feed } from 'feed'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { decryptEmail } from '@/lib/plugins/mailEncrypt'

export function shouldGenerateRssForLocale({
  locale,
  defaultLocale = BLOG.LANG
} = {}) {
  return !locale || locale === defaultLocale
}

/**
 * 生成RSS内容
 * @param {*} post
 * @returns
 */
const createFeedContent = async (post, rssFullContent = true, allPages) => {
  // 关闭RSS全文或文章已加密时，只返回摘要
  if (!rssFullContent || (post.password && post.password !== '')) {
    return post.summary
  }
  const blockMap = await getPostBlocks(post.id, 'rss-content')
  if (blockMap) {
    post.blockMap = blockMap
    // Notion修改了数据格式再次做统一兼容
    post.blockMap = getPublicPostBlockMap(post, adapterNotionBlockMap(post.blockMap), allPages)
    // 格式化内容，部分的样式字段格式在此处理
    if (post.blockMap?.block) {
      post.blockMap.block = formatNotionBlock(post.blockMap.block)
    }

    const content = ReactDOMServer.renderToString(<NotionPage post={post} />)
    const regexExp =
      /<div class="notion-collection-row"><div class="notion-collection-row-body"><div class="notion-collection-row-property"><div class="notion-collection-column-title"><svg.*?class="notion-collection-column-title-icon">.*?<\/svg><div class="notion-collection-column-title-body">.*?<\/div><\/div><div class="notion-collection-row-value">.*?<\/div><\/div><\/div><\/div>/g
    return content.replace(regexExp, '')
  }
}

/**
 * 从 props 构建 Feed 实例，静态生成与 /api/rss 共用同一套逻辑，
 * 保证两份订阅输出（全文、作者邮箱、子路径、加密保护）完全一致。
 * @param {*} props
 */
export async function buildFeed(props) {
  const { NOTION_CONFIG, siteInfo, latestPosts, allPages } = props
  const TITLE = siteInfo?.title
  const DESCRIPTION = siteInfo?.description
  const LINK = siteInfo?.link
  const AUTHOR = NOTION_CONFIG?.AUTHOR || BLOG.AUTHOR
  const LANG = NOTION_CONFIG?.LANG || BLOG.LANG
  const SUB_PATH = NOTION_CONFIG?.SUB_PATH || BLOG.SUB_PATH
  const CONTACT_EMAIL = decryptEmail(
    NOTION_CONFIG?.CONTACT_EMAIL || BLOG.CONTACT_EMAIL
  )
  const RSS_FULL_CONTENT = siteConfig('RSS_FULL_CONTENT', true, NOTION_CONFIG)

  // 优先使用数据层已排序的 latestPosts；API 场景回退到 allPages 过滤
  const posts = latestPosts?.length
    ? latestPosts
    : (allPages || [])
        .filter(p => p.type === 'Post' && p.status === 'Published')
        .sort(
          (a, b) =>
            new Date(b.publishDay || b.publishDate || 0) -
            new Date(a.publishDay || a.publishDate || 0)
        )
        .slice(0, 20)

  const year = new Date().getFullYear()
  const feed = new Feed({
    title: TITLE,
    description: DESCRIPTION,
    link: `${LINK}/${SUB_PATH}`,
    language: LANG,
    favicon: `${LINK}/favicon.png`,
    copyright: `All rights reserved ${year}, ${AUTHOR}`,
    author: {
      name: AUTHOR,
      email: CONTACT_EMAIL,
      link: LINK
    }
  })
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: `${LINK}/${post.slug}`,
      description: post.summary,
      content: await createFeedContent(post, RSS_FULL_CONTENT, allPages),
      // publishDay 缺失时回退，避免生成 Invalid Date
      date: new Date(post?.publishDay || post?.publishDate || Date.now())
    })
  }
  return feed
}

/**
 * 生成RSS数据（构建阶段写入静态文件，供旧订阅地址兼容）
 * @param {*} props
 */
export async function generateRss(props) {
  // 检查 feed 文件是否在10分钟内更新过
  if (isFeedRecentlyUpdated('./public/rss/feed.xml', 10)) {
    return
  }

  console.log('[RSS订阅] 生成/rss/feed.xml')
  const feed = await buildFeed(props)
  try {
    fs.mkdirSync('./public/rss', { recursive: true })
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
    fs.writeFileSync('./public/rss/feed.json', feed.json1())
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
    // RSS被高频词访问将大量消耗服务端资源，故作为静态文件
  }
}

/**
 * 检查上次更新，如果10分钟内更新过就不操作。
 * @param {*} filePath
 * @param {*} intervalMinutes
 * @returns
 */
function isFeedRecentlyUpdated(filePath, intervalMinutes = 10) {
  try {
    const stats = fs.statSync(filePath)
    const now = new Date()
    const lastModified = new Date(stats.mtime)
    const timeDifference = (now - lastModified) / (1000 * 60) // 转换为分钟
    return timeDifference < intervalMinutes
  } catch (error) {
    // 如果文件不存在，我们需要创建它
    return false
  }
}
