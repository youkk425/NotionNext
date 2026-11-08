'use client'

import { BellFillIcon } from './EndspaceIcons'

/**
 * NoticeTimeline - 公告时间线弹窗（端 space 风格）
 * 左侧/右侧交替排列，中间时间轴；最新公告在最上方。
 * @param {{ notices: Array<{id, title, summary, publishDay}>, onClose: () => void }} props
 */
const NoticeTimeline = ({ notices = [], onClose }) => {
  if (!notices.length) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8'
      onClick={onClose}
    >
      {/* 遮罩 */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

      {/* 弹窗 */}
      <div
        className='relative w-full max-w-3xl max-h-[80vh] overflow-y-auto border border-[var(--endspace-border-base)] bg-[var(--endspace-surface)] shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className='sticky top-0 flex items-center justify-between px-5 py-3 border-b border-[var(--endspace-border-base)] bg-[var(--endspace-surface)] z-10'>
          <div className='flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-[var(--endspace-text-primary)]'>
            <BellFillIcon size={16} className='text-[var(--endspace-accent-yellow)]' />
            公告存档 ARCHIVE
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='关闭公告'
            className='w-8 h-8 flex items-center justify-center border border-[var(--endspace-border-base)] text-[var(--endspace-text-muted)] hover:text-[var(--endspace-text-primary)] hover:border-[var(--endspace-accent-yellow)] transition-colors cursor-pointer'
          >
            ✕
          </button>
        </div>

        {/* 时间线主体 */}
        <div className='relative px-4 py-8 md:px-10'>
          {/* 中间时间轴 */}
          <div className='absolute left-1/2 top-0 bottom-0 w-px bg-[var(--endspace-border-base)] -translate-x-1/2' />

          {notices.map((item, index) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={item.id || index}
                className={`relative flex items-start mb-10 last:mb-0 ${
                  isLeft ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* 时间轴节点 */}
                <div className='absolute left-1/2 -translate-x-1/2 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--endspace-accent-yellow)] bg-[var(--endspace-surface)]' />

                {/* 内容卡片 */}
                <div
                  className={`w-[calc(50%-1.75rem)] border border-[var(--endspace-border-base)] bg-[var(--endspace-bg-base)] p-4 hover:border-[var(--endspace-accent-yellow)] transition-colors ${
                    isLeft ? 'mr-auto text-right' : 'ml-auto text-left'
                  }`}
                >
                  <div className='text-[10px] font-mono uppercase tracking-widest text-[var(--endspace-text-muted)]'>
                    {item.publishDay || '—'}
                  </div>
                  <div className='mt-1 font-bold text-sm text-[var(--endspace-text-primary)]'>
                    {item.title}
                  </div>
                  {item.summary && (
                    <div className='mt-1.5 text-xs leading-relaxed text-[var(--endspace-text-muted)]'>
                      {item.summary}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NoticeTimeline