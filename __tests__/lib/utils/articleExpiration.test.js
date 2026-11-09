import {
  getArticleExpirationInfo,
  isArticleExpirationEnabled
} from '@/lib/utils/articleExpiration'

const DAY_MS = 24 * 60 * 60 * 1000
// 本地时间 2026-11-09 12:00，避免测试依赖运行时区
const now = new Date(2026, 10, 9, 12, 0, 0)
const daysAgo = days => new Date(now.getTime() - days * DAY_MS).toISOString()

describe('articleExpiration', () => {
  describe('isArticleExpirationEnabled', () => {
    it('treats false-like strings and falsy values as disabled', () => {
      expect(isArticleExpirationEnabled('false')).toBe(false)
      expect(isArticleExpirationEnabled(' FALSE ')).toBe(false)
      expect(isArticleExpirationEnabled('0')).toBe(false)
      expect(isArticleExpirationEnabled(false)).toBe(false)
      expect(isArticleExpirationEnabled(0)).toBe(false)
    })

    it('treats true-like values as enabled', () => {
      expect(isArticleExpirationEnabled('true')).toBe(true)
      expect(isArticleExpirationEnabled(true)).toBe(true)
      expect(isArticleExpirationEnabled(90)).toBe(true)
    })
  })

  describe('getArticleExpirationInfo', () => {
    it('returns null when disabled', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(200) },
          { enabled: 'false', now }
        )
      ).toBeNull()
    })

    it('returns null without a post or lastEditedDay', () => {
      expect(getArticleExpirationInfo({}, { enabled: true, now })).toBeNull()
      expect(getArticleExpirationInfo(null, { enabled: true, now })).toBeNull()
    })

    it('returns null for unparsable dates', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: 'not-a-date' },
          { enabled: true, now }
        )
      ).toBeNull()
    })

    it('shows only at or beyond the threshold', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(89) },
          { enabled: true, daysThreshold: 90, now }
        )
      ).toBeNull()
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(90) },
          { enabled: true, daysThreshold: 90, now }
        )
      ).toMatchObject({ daysOld: 90 })
    })

    it('parses the localized date format used by lastEditedDay', () => {
      const info = getArticleExpirationInfo(
        { lastEditedDay: '2026-8-1' },
        { enabled: true, daysThreshold: 90, now }
      )
      expect(info.daysOld).toBe(100)
    })

    it('clamps future edit dates to zero days', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(-30) },
          { enabled: true, daysThreshold: 90, now }
        )
      ).toBeNull()
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(-30) },
          { enabled: true, daysThreshold: 0, now }
        )
      ).toMatchObject({ daysOld: 0 })
    })

    it('passes the message template through for the theme to render', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(120) },
          {
            enabled: true,
            daysThreshold: 90,
            message: '已更新 %%DAYS%% 天',
            now
          }
        )
      ).toEqual({ daysOld: 120, message: '已更新 %%DAYS%% 天' })
    })

    it('falls back to the default threshold when it is not a number', () => {
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(89) },
          { enabled: true, daysThreshold: 'abc', now }
        )
      ).toBeNull()
      expect(
        getArticleExpirationInfo(
          { lastEditedDay: daysAgo(90) },
          { enabled: true, daysThreshold: 'abc', now }
        )
      ).toMatchObject({ daysOld: 90 })
    })
  })
})
