# QWEN.md

NotionNext — 用 Notion 搭建独立站。基于 Next.js + Notion API 的开源站点系统：在 Notion 里管理文章/分类/标签/菜单，NotionNext 负责发布为可访问、可搜索、可运营的网站。

## 技术栈

- **框架**: Next.js 14 (Pages Router) + React 18
- **样式**: Tailwind CSS 3
- **Notion 渲染**: react-notion-x (`notion-client` / `notion-utils` 锁定 7.10.0)
- **包管理**: Yarn 1.22.22（**不要混用 npm/pnpm**，仓库只保留 `yarn.lock`）
- **Node**: 22 LTS（见 `.nvmrc` / `.node-version`；`@ai-sdk/google` 要求 Node >=22）
- **语言**: JavaScript 为主 + 少量 TypeScript（`strict: true`，`noEmit`）；`@/*` 路径别名映射到项目根
- **测试**: Jest + @testing-library/react + jest-environment-jsdom
- **文档站**: VitePress（`docs/` → `notionnext.tangly1024.com`）
- **部署**: Vercel 为主，也支持 Netlify / Cloudflare Pages / 静态导出

## 常用命令

```bash
nvm use          # 切到 .nvmrc 指定的 Node 22
yarn             # 安装依赖
yarn dev         # 本地开发 (localhost:3000)
yarn build       # 生产构建 (BUILD_MODE=true)
yarn export      # 静态导出
yarn start       # 生产模式运行

# 代码质量
yarn lint        # next lint
yarn lint:fix    # 自动修复
yarn type-check  # tsc --noEmit
yarn format      # prettier --write .
yarn pre-commit  # lint:fix + format + type-check
yarn quality     # 聚合质量检查脚本

# 测试
yarn test            # Jest
yarn test:watch      # 监听模式
yarn test:coverage   # 覆盖率
yarn test:ci         # CI 模式

# 文档站
yarn docs:site:dev     # VitePress 本地预览
yarn docs:site:build   # 构建文档站

# 性能
yarn perf:audit:themes  # 全主题 Lighthouse 审计（新增/大改主题必做）
```

## 项目结构

```
NotionNext/
├── blog.config.js        # 主配置入口，聚合 conf/*.config.js
├── conf/                 # 拆分的配置模块（comment/contact/post/analytics/image/font/code/animation/widget/ad/plugin/ai/performance/layout-map/notion/dev 等）
├── pages/                # Next.js Pages Router 路由
│   ├── index.js          # 首页
│   ├── [prefix]/         # 多语言前缀 / 文章动态路由
│   ├── api/              # API 路由 (rss, revalidate, cache, notion-comments, subscribe, auth)
│   ├── archive/ category/ tag/ search/   # 列表页
│   ├── auth/ dashboard/ sign-in/ sign-up/ # Clerk 鉴权页
│   └── sitemap.xml.js
├── components/           # 全局复用 React 组件（评论、统计、SEO、动画、挂件、广告、LazyImage 等）
├── themes/               # 25 个主题，每个主题一个目录
│   ├── theme.js          # 主题动态加载核心（dynamic import + fallback）
│   └── <theme>/
│       ├── index.js      # 导出 LayoutBase / LayoutIndex / LayoutSlug / LayoutSearch / LayoutArchive / LayoutCategoryIndex / LayoutTagIndex / Layout404 + CONFIG
│       ├── config.js     # 主题私有配置（THEME_CONFIG）
│       └── components/    # 主题私有组件
├── lib/
│   ├── config.js         # siteConfig() — 配置读取优先级: Notion配置表 > 环境变量 > blog.config.js
│   ├── global.js         # GlobalContextProvider — 全局上下文（主题/深色/语言/加载状态）
│   ├── db/notion/        # Notion 数据获取层（getNotionPost, getPostBlocks, getMetadata, getAllPageIds, getAllCategories, getAllTags, RateLimiter 等）
│   ├── cache/            # 多层缓存（memory / file / redis / vercel / build_session）
│   ├── site/             # 站点服务层（adapters / processors + site.api.ts / site.service.ts）
│   ├── lang/             # 国际化文本（lib/lang.js 注册）
│   ├── utils/            # 工具函数（post, lang, font, password, redirect, sitemap, rss 等）
│   ├── plugins/          # 第三方插件集成
│   ├── middleware/       # 中间件
│   └── build/            # 构建时辅助
├── hooks/                # React hooks (useAdjustStyle, useWindowSize)
├── types/                # TypeScript 类型定义
├── styles/               # 全局样式
├── middleware.ts         # Clerk 鉴权中间件 + UUID 重定向
├── next.config.js        # Next.js 配置（i18n / rewrites / redirects / images / 主题扫描）
├── tailwind.config.js    # Tailwind 配置
├── tsconfig.json         # TS 配置（strict，path alias @/*）
└── docs/                 # VitePress 文档源码
```

## 核心架构要点

### 配置系统（三层优先级）

`lib/config.js` 的 `siteConfig(key, defaultVal, extendConfig)` 是读取配置的统一入口，优先级：

1. **Notion 配置表**（最高）— 运行时从 Notion 数据库读取
2. **环境变量** — Vercel / `.env.local`
3. **`blog.config.js`** — 合并 `conf/*.config.js`（最低）

部分配置（如 `NEXT_REVALIDATE_SECOND`、`POSTS_PER_PAGE`、`THEME`、`PSEUDO_STATIC` 等服务端配置）只从 `extendConfig` / `defaultVal` / `BLOG[key]` 读取，不走 Notion。配置值统一经 `convertVal` 做字符串→数字/布尔/对象转换。

### 主题系统（运行时动态加载）

- `next.config.js` 启动时扫描 `themes/` 下所有子目录名注入 `publicRuntimeConfig.THEMES`
- `themes/theme.js` 通过 `next/dynamic` + `import('@/themes/<name>')` 在运行时按 `BLOG.THEME` 或 URL `?theme=` 加载布局；缺失时回退到 `example` 主题，再退到空布局
- 每个主题导出约定的布局组件：`LayoutBase`（外壳）、`LayoutIndex`（首页）、`LayoutPostList`、`LayoutSlug`（文章详情）、`LayoutSearch`、`LayoutArchive`、`LayoutCategoryIndex`、`LayoutTagIndex`、`Layout404`，以及 `CONFIG`（作为 `THEME_CONFIG`）
- **无编译期 `@theme-components` 别名**，全靠运行时 `@/themes/<name>` 动态 import
- 新增主题：复制 `themes/example` 改名即可，目录名即主题 key

### Notion 数据层

- `lib/db/notion/getNotionPost.js`、`getPostBlocks.js` 获取文章与块数据
- `lib/db/notion/getMetadata.js` 读取站点元数据
- `lib/db/notion/getAllPageIds.js`、`getAllCategories.js`、`getAllTags.js` 生成列表
- `lib/db/notion/RateLimiter.ts` 限速 Notion API
- `lib/db/SiteDataApi.js` 统一站点数据出口
- 多层缓存：`lib/cache/` 下 memory / 本地文件 / Redis / Vercel / build_session

### 全局上下文

`lib/global.js` 的 `GlobalContextProvider` 注入 `useGlobal()`，提供 `theme` / `isDarkMode` / `locale` / `lang` / `onLoading` / `fullWidth` / `NOTION_CONFIG` / `THEME_CONFIG` / `runtimeConfigOverrides` 等。组件通过 `useGlobal()` 读取而非直接读 `BLOG`。

### 鉴权

`middleware.ts` 使用 Clerk（若配置 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`）；未配置时走 `noAuthMiddleware`，仅处理 `UUID_REDIRECT`。`/dashboard` 路由需登录。

## 代码规范

### Prettier（`.prettierrc.json`）

- 单引号、无分号、行尾无逗号、`arrowParens: avoid`、`printWidth: 80`、JSX 单引号

### ESLint（`.eslintrc.js`）

- 基于 `next` + `prettier` + `@typescript-eslint/recommended`
- `.js` 文件放宽 TS 规则（`no-explicit-any` 等关闭）；`.ts/.tsx` 严格
- React Hooks 规则强制开启

### TypeScript（`tsconfig.json`）

- `strict: true`，`noImplicitAny`，`noUncheckedIndexedAccess`，`exactOptionalPropertyTypes`，`noImplicitOverride`
- `noEmit: true`（仅类型检查，Next.js 负责编译）
- 路径别名 `@/*` → `./*`

### 命名

- 组件 PascalCase（`LazyImage`）；文件 kebab-case（`lazy-image.js`）；变量/函数 camelCase；常量 UPPER_SNAKE_CASE

### 提交规范（Conventional Commits）

```
<type>(<scope>): <description>
```
类型：`feat` / `fix` / `docs` / `style` / `refactor` / `test` / `chore` / `perf` / `ci` / `build` / `revert`

### 协作规则

- 每个任务独立分支，禁止直接提交到 `main`
- PR 保持聚焦，不混入无关重构
- 不提交 `.env.local` 或个人本地文件
- 提交前至少跑 `yarn lint` / `yarn type-check` / 必要测试
- 修改 `package.json` 必须同时提交 `yarn.lock`
- 新增/大改主题须跑 `yarn perf:audit:themes` 并提交 `docs/performance/theme-audit-latest.{md,json}`

## 关键配置文件

| 文件 | 用途 |
| --- | --- |
| `blog.config.js` | 主配置，合并所有 `conf/*.config.js` |
| `conf/comment.config.js` | 评论插件（Twikoo/Giscus/Gitalk/Cusdis/Utterances/Waline/Artalk） |
| `conf/contact.config.js` | 作者联系方式 |
| `conf/post.config.js` | 文章与列表（每页条数、URL 前缀、排序、预览） |
| `conf/analytics.config.js` | 访问统计（Vercel/Google/Baidu/CNZZ/Ackee/Busuanzi） |
| `conf/image.config.js` | 图片相关 |
| `conf/font.config.js` | 字体 |
| `conf/code.config.js` | 代码块样式（Prism 主题、Mac 风格栏、行号、折叠） |
| `conf/animation.config.js` | 动效（烟花/樱花/繁星/彩带/ Nest） |
| `conf/widget.config.js` | 悬浮挂件（宠物/音乐播放器/聊天客服） |
| `conf/ad.config.js` | 广告（Google Adsense / WWAds） |
| `conf/plugin.config.js` | 第三方插件（Algolia 全文索引） |
| `conf/ai.config.js` | AI（摘要/聊天机器人） |
| `conf/performance.config.js` | 性能优化 |
| `conf/layout-map.config.js` | 路由→布局映射自定义 |
| `conf/notion.config.js` | Notion 数据库表头字段映射 |
| `conf/dev.config.js` | 开发调试配置 |
| `.env.example` | 环境变量模板（复制为 `.env.local`） |

## 环境变量

必填：`NOTION_PAGE_ID`（支持多语言 `id,zh:id,en:id`）

常用：`NEXT_PUBLIC_THEME`、`NEXT_PUBLIC_LANG`、`NEXT_PUBLIC_AUTHOR`、`NEXT_PUBLIC_APPEARANCE`、`REVALIDATION_TOKEN`、`ENABLE_CACHE`、`NOTION_BUILD_CACHE_PURGE_DATA`、`BUILD_PREFETCH_ENABLED`、`STATIC_PAGE_GENERATION_TIMEOUT`

完整列表见 `.env.example`。真实值放 `.env.local`（已 gitignore）。

## 测试

- 框架：Jest + @testing-library/react，配置见 `jest.config.js`
- 测试位置：`__tests__/`（按 `components` / `lib` / `scripts` / `themes` 分组）及 `**/*.(test|spec).{js,jsx,ts,tsx}`
- 别名映射：`@/*`、`@/components/*`、`@/lib/*`、`@/pages/*`、`@/styles/*`、`@/types/*`、`@/conf/*`、`@/themes/*`
- setup：`jest.setup.js`（afterEach）、`jest.env.js`（环境变量）
- 覆盖率采集 `components/`、`lib/`、`pages/`（排除 `_app` / `_document` / `api/`）

## 构建与部署备注

- `next.config.js` 在 `build` / `export` 前会清理 `public/sitemap.xml`、`public/rss/*`，并准备 Notion 构建会话
- 静态导出（`yarn export`）禁用 i18n / rewrites / redirects，走 `exportPathMap` 忽略 `/sitemap.xml` 与 `/auth`
- 图片：远程 http/https 全放开（`remotePatterns: '**'`），支持 avif/webp，`dangerouslyAllowSVG: true`
- 伪静态：`PSEUDO_STATIC=true` 时文章 URL 以 `.html` 结尾（rewrites 处理）
- `postinstall` 自动执行 `patch-package`（补丁在 `patches/`）
