import { siteConfig } from '@/lib/config'
import { getArticleExpirationInfo } from '@/lib/utils/articleExpiration'

/**
 * 文章过期提醒组件
 * 当文章超过指定天数时显示提醒
 * @param {Object} props - 组件属性
 * @param {Object} props.post - 文章数据
 * @returns {JSX.Element|null}
 */
export default function ArticleExpirationNotice({ post }) {
  const expirationInfo = getArticleExpirationInfo(post)
  if (!expirationInfo) {
    return null
  }

  const { daysOld, message } = expirationInfo
  // 使用 %%DAYS%% 作为天数占位符，拆分后高亮渲染天数
  const [messageBefore, messageAfter = ''] = message.split('%%DAYS%%')

  return (
    <div
      className={
        'p-4 rounded-lg border border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 shadow-sm'
      }>
      <div className='flex items-start'>
        <i className='fas fa-exclamation-triangle text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0' />
        <div className='ml-1'>
          <div className='text-blue-600 dark:text-blue-400 font-medium'>
            {siteConfig('ARTICLE_EXPIRATION_TITLE', '温馨提醒')}
          </div>
          <div className='flex items-center mt-1 text-sm text-gray-700 dark:text-gray-300'>
            <i className='far fa-clock text-red-500 dark:text-red-400 mr-1' />
            <span>
              {messageBefore}
              <span className='text-red-500 dark:text-red-400 font-bold'>
                {daysOld}
              </span>
              {messageAfter}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
