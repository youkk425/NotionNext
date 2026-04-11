/**
 * 另一个落地页主题
 */
const CONFIG = {
  PROXIO_WELCOME_COVER_ENABLE: true, //是否显示页面进入的欢迎文字
  PROXIO_WELCOME_TEXT: '欢迎来到winterking\'s Blog，点击任意位置进入', // 欢迎文字，留空则不启用

  // 英雄区块导航
  PROXIO_HERO_ENABLE: true, // 开启英雄区
  PROXIO_HERO_TITLE_1: '一个很懒很懒的人，在自己的王国里，他只做自己想做的事情', // 英雄区文字
  PROXIO_HERO_TITLE_2: '没有时间，只有懒惰', // 英雄区文字
  // 英雄区两个按钮，如果TEXT留空则隐藏按钮
  PROXIO_HERO_BUTTON_1_TEXT: '随便看看', // 英雄区按钮
  PROXIO_HERO_BUTTON_1_URL:
    'https://winterkingdom.org/archive', // 英雄区按钮
  PROXIO_HERO_BUTTON_2_TEXT: '在Github上关注', // 英雄区按钮
  PROXIO_HERO_BUTTON_2_URL: 'https://github.com/youkk425', // 英雄区按钮
  PROXIO_HERO_BUTTON_2_ICON: '/images/starter/github-mark.svg', // 英雄区按钮2的图标，不需要则留空

  // 英雄区配图，如需隐藏，改为空值即可 ''
  PROXIO_HERO_BANNER_IMAGE: '', // hero区背景，默认是获取Notion背景，如需另外配置图片可以填写在这里
  PROXIO_HERO_BANNER_IFRAME_URL: '', // hero背景区内嵌背景网页 ，可以配置一个网页地址，例如动画网页https://my.spline.design/untitled-b0c6e886227646c34afc82cdc6de4ca2/

  // 文章区块
  PROXIO_BLOG_ENABLE: true, // 首页博文区块开关
  PROXIO_BLOG_TITLE: '作品',
  PROXIO_BLOG_COUNT: 4, // 首页博文区块展示前4篇文章
  PROXIO_BLOG_TEXT_1: '我的最新动态',

  // 区块默认内容显示文章的summary文本，但也支持用自定义图片或logo德国替换掉占位显示内容
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_1: '', // 填写要替换成的图片，支持图床或直接上传到项目中，示例  /images/feature-1.webp
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_2: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_3: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_4: '',

  PROXIO_ANNOUNCEMENT_ENABLE: true, //公告文字区块


  // 特性区块
  PROXIO_FEATURE_ENABLE: true, // 特性区块开关
  PROXIO_FEATURE_TITLE: '为什么来到我的王国？',
  PROXIO_FEATURE_TEXT_1: '我能让您找到自己喜欢的东西',
  PROXIO_FEATURE_TEXT_2: '不是吗？',

  // 特性1
  PROXIO_FEATURE_1_ICON_CLASS: 'fa-solid fa-stopwatch', // fas图标
  PROXIO_FEATURE_1_ICON_IMG_URL: '', // 图片图标选填，默认是fas图标，如果需要图片图标可以填写图片地址，示例/avatar.png
  PROXIO_FEATURE_1_TITLE_1: '喵言喵语',
  PROXIO_FEATURE_1_TEXT_1:
    '可以和我分享你的问题，我会尽力回答你。',

  PROXIO_FEATURE_2_ICON_CLASS: 'fa-solid fa-comments',
  PROXIO_FEATURE_2_ICON_IMG_URL: '',
  PROXIO_FEATURE_2_TITLE_1: '分享生活',
  PROXIO_FEATURE_2_TEXT_1: '与你分享我的生活， let\'s go！',

  PROXIO_FEATURE_3_ICON_CLASS: 'fa-solid fa-search',
  PROXIO_FEATURE_3_ICON_IMG_URL: '',
  PROXIO_FEATURE_3_TITLE_1: '细节把控',
  PROXIO_FEATURE_3_TEXT_1:
    '精益求精雕琢每个元素，确保令喵过目难忘',

  PROXIO_FEATURE_BUTTON_TEXT: '了解更多', // 按钮文字
  PROXIO_FEATURE_BUTTON_URL: 'https://github.com/youkk425', // 按钮跳转

  // 首页生涯区块
  PROXIO_CAREER_ENABLE: true, // 区块开关
  PROXIO_CAREER_TITLE: '生涯',
  PROXIO_CAREER_TEXT: '以下是我的职业生涯',

  // 生涯内容卡牌 ，title是标题 ，bio是备注，text是详情
  PROXIO_CAREERS: [
    {
      title: '建设王国',
      bio: '2026-Now',
      text: '懒懒散散，只做自己想做的事情，在自己的王国里，做着最喜欢的事情，过着最喜欢的生活'
    }
  ],

  // 首页用户测评区块
  PROXIO_TESTIMONIALS_ENABLE: true, // 测评区块开关
  PROXIO_TESTIMONIALS_TITLE: '用户反馈',
  PROXIO_TESTIMONIALS_TEXT_1: '我们的国民怎么说',
  PROXIO_TESTIMONIALS_TEXT_2:
    '哈基米哈基米哈基米哦南北绿豆',

  // 用户测评处的跳转按钮
  PROXIO_TESTIMONIALS_BUTTON_URL: '/about',
  PROXIO_TESTIMONIALS_BUTTON_TEXT: '联系我',

  // 这里不支持CONFIG和环境变量，需要一一修改此处代码。
  PROXIO_TESTIMONIALS_ITEMS: [
    {
      PROXIO_TESTIMONIALS_ITEM_TEXT:
        '喵喵喵，喵喵喵，喵喵喵！ ',
      PROXIO_TESTIMONIALS_ITEM_AVATAR:
        'https://winterking.dpdns.org/file/AgACAgUAAyEGAATGRc6ZAAOeadntXT190fjJ7LjyFWIqP9ymee0AAtkOaxv_D9FW6j3-C6-7kw0BAAMCAAN4AAM7BA.png',
      PROXIO_TESTIMONIALS_ITEM_NICKNAME: '哈基米',
      PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '喵星人',
      PROXIO_TESTIMONIALS_ITEM_URL: ''
    }
  ],

  //   FAQ 常见问题模块
  PROXIO_FAQ_ENABLE: false, // 常见问题模块开关
  PROXIO_FAQ_TITLE: '常见问题解答',
  PROXIO_FAQ_TEXT_1: '有任何问题吗？请看这里',
  PROXIO_FAQ_TEXT_2: '我们收集了常见的用户疑问',
  PROXIO_FAQS: [
    {
      q: 'NotionNext有帮助文档吗？',
      a: 'NotionNext提供了<a href="https://docs.tangly1024.com/about" className="underline">帮助文档</a>，操作<a href="https://www.bilibili.com/video/BV1fM4y1L7Qi/" className="underline">演示视频</a>，以及<a href="https://docs.tangly1024.com/article/chat-community" className="underline">交流社群</a>来协助您完成网站的搭建部署'
    },
    {
      q: '部署后要如何编写文章？',
      a: '您可以在Notion中之间添加或修改类型为Post的页面，内容将被实时同步在站点中，详情参考<a className="underline" href="https://docs.tangly1024.com/article/start-to-write">《帮助文档》</a>'
    },
    {
      q: '站点部署失败，更新失败？',
      a: '通常是配置修改错误导致，请检查配置或者重试操作步骤，或者通过Vercel后台的Deployments中找到错误日志，并向网友求助'
    },
    {
      q: '文章没有实时同步？',
      a: '先检查Notion_Page_ID是否正确配置，其次由于博客的每个页面都有独立缓存，刷新网页后即可解决'
    }
  ],

  // 关于作者区块
  PROXIO_ABOUT_ENABLE: true, // 关于作者区块区块开关
  PROXIO_ABOUT_TITLE: '关于作者',
  PROXIO_ABOUT_TEXT_1: '我是一名让心灵到处流浪的人，灵魂在这里安睡',
  PROXIO_ABOUT_TEXT_2:
    '喜欢技术，喜欢生活，喜欢分享，喜欢随缘，喜欢一切美好的事物',
  PROXIO_ABOUT_PHOTO_URL: '/avatar.png',
  PROXIO_ABOUT_KEY_1: '经验年限',
  PROXIO_ABOUT_VAL_1: '2年+',
  PROXIO_ABOUT_KEY_2: '客户',
  PROXIO_ABOUT_VAL_2: '0+',
  PROXIO_ABOUT_KEY_3: '交付项目',
  PROXIO_ABOUT_VAL_3: '0+',
  PROXIO_ABOUT_KEY_4: '累积创作时长（小时）',
  PROXIO_ABOUT_VAL_4: '100+',

  PROXIO_ABOUT_BUTTON_URL: '/about',
  PROXIO_ABOUT_BUTTON_TEXT: '关于我',

  // 横向滚动文字
  PROXIO_BRANDS_ENABLE: true, // 滚动文字
  PROXIO_BRANDS: [
    'Web Design',
    'AI Agent',
    'vibe coding',
  ],

  PROXIO_FOOTER_SLOGAN: '极简，记录，科技，生活，分享，创造',

  // 页脚三列菜单组
  // 页脚菜单
  PROXIO_FOOTER_LINKS: [
    {
      name: '友情链接',
      menus: [
        {
          title: 'NotionNext',
          href: 'https://www.tangly1024.com'
        }
      ]
    },
    {
      name: '开发者',
      menus: [
        { title: 'Github', href: 'https://github.com/tangly1024/NotionNext' }
      ]
    }
  ],

  PROXIO_FOOTER_BLOG_LATEST_TITLE: '最新文章',

  PROXIO_FOOTER_PRIVACY_POLICY_TEXT: '隐私政策',
  PROXIO_FOOTER_PRIVACY_POLICY_URL: '/privacy-policy',

  PROXIO_FOOTER_PRIVACY_LEGAL_NOTICE_TEXT: '法律声明',
  PROXIO_FOOTER_PRIVACY_LEGAL_NOTICE_URL: '/legacy-notice',

  PROXIO_FOOTER_PRIVACY_TERMS_OF_SERVICE_TEXT: '服务协议',
  PROXIO_FOOTER_PRIVACY_TERMS_OF_SERVICE_URL: '/terms-of-use',

  // 404页面的提示语
  PROXIO_404_TITLE: '我们似乎找不到您要找的页面。',
  PROXIO_404_TEXT: '抱歉！您要查找的页面不存在。可能已经移动或删除。',
  PROXIO_404_BACK: '回到主页',

  // 页面底部的行动呼吁模块
  PROXIO_CTA_ENABLE: true,
  PROXIO_CTA_TITLE: '你到达了我的王国的边界',
  PROXIO_CTA_TITLE_2: '但winterkingdom一直在这里',
  PROXIO_CTA_DESCRIPTION:
    '感谢您访问我的王国喵！如果您喜欢这里的内容，请按下 CTRL+D 将本站收藏起来，以便随时回来查看最新的文章和更新！',
  PROXIO_CTA_BUTTON: true, // 是否显示按钮
  PROXIO_CTA_BUTTON_URL: '/about',
  PROXIO_CTA_BUTTON_TEXT: '联系我',

  PROXIO_POST_REDIRECT_ENABLE: true, // 默認開啟重定向
  PROXIO_POST_REDIRECT_URL: 'https://winterkingdom.org', // 重定向域名
  PROXIO_NEWSLETTER: process.env.NEXT_PUBLIC_THEME_PROXIO_NEWSLETTER || false // 是否开启邮件订阅 请先配置mailchimp功能 https://docs.tangly1024.com/article/notion-next-mailchimp
}
export default CONFIG
