import { siteConfig } from '@/lib/config'

/**
 * 文章过期提醒默认文案；%%DAYS%% 为距最后更新天数的占位符
 */
export const DEFAULT_ARTICLE_EXPIRATION_MESSAGE =
  '这篇文章最后更新于 %%DAYS%% 天前，内容可能已过时，请谨慎参考。'

const DEFAULT_DAYS_THRESHOLD = 90
const DAY_MS = 24 * 60 * 60 * 1000

/**
 * 归一化开关配置；兼容 siteConfig 返回的字符串 'true' / 'false'
 * @param {*} value
 * @returns {boolean}
 */
export function isArticleExpirationEnabled(value) {
  if (typeof value === 'string') {
    return !['false', '0', 'off', 'no'].includes(value.trim().toLowerCase())
  }
  return Boolean(value)
}

/**
 * 计算文章过期提醒信息
 * 依据最后编辑时间 lastEditedDay 判断文章是否超过阈值天数
 * @param {Object} post 文章数据
 * @param {Object} [options] 可选覆盖项，便于主题复用与测试
 * @param {*} [options.enabled] 是否启用，默认读取 ARTICLE_EXPIRATION_ENABLED
 * @param {number|string} [options.daysThreshold] 阈值天数，默认读取 ARTICLE_EXPIRATION_DAYS
 * @param {string} [options.message] 文案模板，默认读取 ARTICLE_EXPIRATION_MESSAGE
 * @param {Date|number|string} [options.now] 当前时间，默认当前时刻
 * @returns {{ daysOld: number, message: string } | null} 无需提醒时返回 null
 */
export function getArticleExpirationInfo(post, options = {}) {
  const {
    enabled = siteConfig('ARTICLE_EXPIRATION_ENABLED', false),
    daysThreshold = siteConfig(
      'ARTICLE_EXPIRATION_DAYS',
      DEFAULT_DAYS_THRESHOLD
    ),
    message = siteConfig(
      'ARTICLE_EXPIRATION_MESSAGE',
      DEFAULT_ARTICLE_EXPIRATION_MESSAGE
    ),
    now = new Date()
  } = options

  if (!isArticleExpirationEnabled(enabled) || !post?.lastEditedDay) {
    return null
  }

  const editedAt = new Date(post.lastEditedDay)
  const current = now instanceof Date ? now : new Date(now)
  if (Number.isNaN(editedAt.getTime()) || Number.isNaN(current.getTime())) {
    return null
  }

  const parsedThreshold = Number(daysThreshold)
  const threshold = Number.isFinite(parsedThreshold)
    ? parsedThreshold
    : DEFAULT_DAYS_THRESHOLD

  // 未来时间按 0 天处理，避免 Math.abs 把未来日期算成很久以前
  const daysOld = Math.max(
    0,
    Math.floor((current.getTime() - editedAt.getTime()) / DAY_MS)
  )

  if (daysOld < threshold) {
    return null
  }

  return { daysOld, message }
}
