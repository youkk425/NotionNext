import fs from 'fs'
import { buildFeed, generateRss, shouldGenerateRssForLocale } from '@/lib/utils/rss'
import { getPostBlocks } from '@/lib/db/SiteDataApi'
import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'

const addItemMock = jest.fn()
const rss2Mock = jest.fn(() => '<rss>ok</rss>')
const atom1Mock = jest.fn(() => '<atom>ok</atom>')
const json1Mock = jest.fn(() => '{"ok":true}')

jest.mock('feed', () => ({
  Feed: jest.fn().mockImplementation(() => ({
    addItem: addItemMock,
    rss2: rss2Mock,
    atom1: atom1Mock,
    json1: json1Mock
  }))
}))

jest.mock('react-dom/server', () => ({
  __esModule: true,
  default: {
    renderToString: jest.fn(() => '<div>rss-content</div>')
  }
}))

jest.mock('@/components/NotionPage', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('@/lib/db/SiteDataApi', () => ({
  getPostBlocks: jest.fn()
}))

jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  formatNotionBlock: jest.fn(block => block)
}))

jest.mock('@/lib/utils/notion.util', () => ({
  adapterNotionBlockMap: jest.fn(blockMap => blockMap)
}))

describe('generateRss', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(fs, 'statSync').mockImplementation(() => {
      throw new Error('ENOENT')
    })
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {})
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('adapts and formats blockMap before rendering RSS content', async () => {
    const rawBlockMap = {
      block: {
        x1: { id: 'x1', type: 'text' }
      }
    }
    const adaptedBlockMap = {
      block: {
        y1: { id: 'y1', type: 'text' }
      }
    }
    const formattedBlock = {
      y1: { id: 'y1', type: 'text', properties: {} }
    }

    getPostBlocks.mockResolvedValue(rawBlockMap)
    adapterNotionBlockMap.mockReturnValue(adaptedBlockMap)
    formatNotionBlock.mockReturnValue(formattedBlock)

    await generateRss({
      NOTION_CONFIG: {
        AUTHOR: 'author',
        LANG: 'zh-CN',
        SUB_PATH: '',
        CONTACT_EMAIL: ''
      },
      siteInfo: {
        title: 'site',
        description: 'desc',
        link: 'https://example.com'
      },
      latestPosts: [
        {
          id: 'post-1',
          slug: 'hello',
          title: 'Hello',
          summary: 'Summary',
          publishDay: '2026-02-18'
        }
      ]
    })

    expect(getPostBlocks).toHaveBeenCalledWith('post-1', 'rss-content')
    expect(adapterNotionBlockMap).toHaveBeenCalledWith(rawBlockMap)
    expect(formatNotionBlock).toHaveBeenCalledWith(
      expect.objectContaining({
        y1: expect.objectContaining({ id: 'y1', type: 'text' })
      })
    )
    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: '<div>rss-content</div>'
      })
    )
    expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
  })

  it('uses summary without fetching blocks when RSS_FULL_CONTENT is disabled', async () => {
    await generateRss({
      NOTION_CONFIG: {
        AUTHOR: 'author',
        LANG: 'zh-CN',
        SUB_PATH: '',
        CONTACT_EMAIL: '',
        RSS_FULL_CONTENT: 'false'
      },
      siteInfo: {
        title: 'site',
        description: 'desc',
        link: 'https://example.com'
      },
      latestPosts: [
        {
          id: 'post-1',
          slug: 'hello',
          title: 'Hello',
          summary: 'Summary',
          publishDay: '2026-08-25'
        }
      ]
    })

    expect(getPostBlocks).not.toHaveBeenCalled()
    expect(adapterNotionBlockMap).not.toHaveBeenCalled()
    expect(formatNotionBlock).not.toHaveBeenCalled()
    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Summary',
        content: 'Summary'
      })
    )
    expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
  })

  it('generates RSS only for the default locale during multi-locale builds', () => {
    expect(shouldGenerateRssForLocale({ locale: undefined })).toBe(true)
    expect(
      shouldGenerateRssForLocale({ locale: 'zh-CN', defaultLocale: 'zh-CN' })
    ).toBe(true)
    expect(
      shouldGenerateRssForLocale({ locale: 'en', defaultLocale: 'zh-CN' })
    ).toBe(false)
  })
})

describe('buildFeed', () => {
  const baseProps = {
    NOTION_CONFIG: {
      AUTHOR: 'author',
      LANG: 'zh-CN',
      SUB_PATH: 'sub',
      CONTACT_EMAIL: ''
    },
    siteInfo: {
      title: 'site',
      description: 'desc',
      link: 'https://example.com'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('falls back to allPages filtering when latestPosts is absent', async () => {
    await buildFeed({
      ...baseProps,
      allPages: [
        {
          type: 'Post',
          status: 'Published',
          id: 'new',
          slug: 'new-post',
          title: 'New',
          summary: 's1',
          publishDay: '2026-10-02'
        },
        {
          type: 'Post',
          status: 'Draft',
          id: 'draft',
          slug: 'draft',
          title: 'Draft',
          summary: 's2',
          publishDay: '2026-10-01'
        }
      ]
    })

    expect(addItemMock).toHaveBeenCalledTimes(1)
    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New',
        link: 'https://example.com/new-post'
      })
    )
  })

  it('sorts fallback posts newest-first and caps at 20 items', async () => {
    const allPages = Array.from({ length: 25 }, (_, i) => ({
      type: 'Post',
      status: 'Published',
      id: `p${i}`,
      slug: `p${i}`,
      title: `P${i}`,
      summary: `s${i}`,
      publishDay: `2026-01-${String(i + 1).padStart(2, '0')}`
    }))

    await buildFeed({ ...baseProps, allPages })

    expect(addItemMock).toHaveBeenCalledTimes(20)
    expect(addItemMock.mock.calls[0][0]).toMatchObject({ title: 'P24' })
  })

  it('returns only the summary for password-protected posts', async () => {
    await buildFeed({
      ...baseProps,
      latestPosts: [
        {
          id: 'locked',
          slug: 'locked',
          title: 'Locked',
          summary: 'protected-summary',
          password: '123',
          publishDay: '2026-01-01'
        }
      ]
    })

    expect(getPostBlocks).not.toHaveBeenCalled()
    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({ content: 'protected-summary' })
    )
  })

  it('falls back to publishDate when publishDay is missing', async () => {
    await buildFeed({
      ...baseProps,
      latestPosts: [
        {
          id: 'p1',
          slug: 'p1',
          title: 'P1',
          summary: 'sum',
          publishDate: '2026-05-20'
        }
      ]
    })

    const addedItem = addItemMock.mock.calls[0][0]
    expect(addedItem.date.toISOString().startsWith('2026-05-20')).toBe(true)
  })
})
