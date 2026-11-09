import { siteConfig } from '@/lib/config'
import { getArticleExpirationInfo } from '@/lib/utils/articleExpiration'
import { IconAlertTriangle } from '@tabler/icons-react'

/**
 * Endspace 文章过期提醒
 * 视觉风格跟随主题：等宽字体、细边框、左侧强调条
 * @param {Object} props
 * @param {Object} props.post 文章数据
 * @returns {JSX.Element|null}
 */
export default function EndspaceExpirationNotice({ post }) {
  const expirationInfo = getArticleExpirationInfo(post)
  if (!expirationInfo) {
    return null
  }

  const { daysOld, message } = expirationInfo
  const [messageBefore, messageAfter = ''] = message.split('%%DAYS%%')

  return (
    <div className='relative mb-8 border border-l-2 border-[var(--endspace-border-base)] border-l-[var(--endspace-accent-yellow)] bg-[var(--endspace-bg-secondary)] px-4 py-3 font-mono text-xs text-[var(--endspace-text-secondary)]'>
      <div className='flex items-start gap-3'>
        <IconAlertTriangle
          size={16}
          stroke={1.5}
          className='mt-0.5 flex-shrink-0 text-[var(--endspace-text-primary)]'
        />
        <div className='flex-1'>
          <div className='mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--endspace-text-muted)]'>
            {siteConfig('ARTICLE_EXPIRATION_TITLE', '温馨提醒')}
          </div>
          <p className='leading-relaxed'>
            {messageBefore}
            <span className='font-bold text-[var(--endspace-text-primary)]'>
              {daysOld}
            </span>
            {messageAfter}
          </p>
        </div>
      </div>
      <span className='pointer-events-none absolute right-2 top-2 text-[10px] tracking-widest text-[var(--endspace-text-muted)]'>
        WARN // STALE
      </span>
    </div>
  )
}
