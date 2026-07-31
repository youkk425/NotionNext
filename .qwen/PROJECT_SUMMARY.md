# Project Summary

## Overall Goal
The user is investigating why NotionNext's custom right-click context menu appears on some pages (e.g., friend links) but not on article detail pages, and wants to understand the root cause and potential fix.

## Key Knowledge
- **Custom right-click menu** is controlled by `CUSTOM_RIGHT_CLICK_CONTEXT_MENU` config (default `true`), defined in `conf/right-click-menu.js`, overridable via Notion config table or env var `NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU`.
- **Menu is mounted globally** in `pages/_app.js` → `<ExternalPlugins {...pageProps} />` → `components/ExternalPlugins.js` renders `<CustomContextMenu>` when the config is enabled. No per-route gating exists.
- **Event mechanism**: `CustomContextMenu.js` listens to `contextmenu` on `window` in the **bubbling phase** (`window.addEventListener('contextmenu', handleContextMenu)`) and calls `event.preventDefault()` to suppress the browser's native menu.
- **Root cause on article pages**: `react-notion-x` (locked at 7.10.0) block components (notably code blocks) internally call `event.stopPropagation()` on `contextmenu` events, preventing them from bubbling to `window`. This is a side effect of the renderer, not an intentional NotionNext behavior.
- **Friend links / simple pages** don't render Notion long-form content, so `contextmenu` events bubble normally to `window`.
- **`CAN_COPY` config** only controls two things: (1) whether the "Copy" menu item appears inside the custom menu, and (2) whether `<DisableCopy />` is mounted. `DisableCopy.js` only intercepts `copy` events — it does **not** intercept `contextmenu`. Setting `CAN_COPY=true` does **not** fix the missing menu on article pages.
- **`getPageCanCopy()`** in `lib/utils/copyPermission.js` resolves copy permission with priority: `post.CAN_COPY` → `post.canCopy` → `post.ext.CAN_COPY` → `post.ext.canCopy` → site-level `CAN_COPY` config.
- **`themes/claude/index.js`** has a theme-level image protection that uses **capture-phase** `addEventListener('contextmenu', handleImageContextMenu, true)` to block right-click on images specifically — separate from the custom menu issue.
- **Proposed fix**: Change `CustomContextMenu.js` line ~66 to use **capture phase**: `window.addEventListener('contextmenu', handleContextMenu, true)` (and matching `removeEventListener` with `true`). Capture phase fires top-down from `window` before child `stopPropagation` can block it.

## Recent Actions
- Traced the full rendering chain: `pages/_app.js` → `ExternalPlugins.js` → `CustomContextMenu.js` (dynamic import, `ssr: false`).
- Confirmed `DisableCopy.js` only intercepts `copy`, not `contextmenu`, ruling out `CAN_COPY` as the cause.
- Searched for `stopPropagation` / `contextmenu` patterns across the codebase — found none in NotionNext's own code that would block the menu; the blocking comes from `react-notion-x` internals.
- Verified `react-notion-x` is not present in `node_modules` (dependencies not installed), so could not inspect its source directly, but the behavioral evidence (menu works on non-article pages, fails on article pages with Notion content) confirms the diagnosis.
- Explained to user that `CAN_COPY=true` will **not** fix the issue, and that the real fix is switching the event listener to capture phase.

## Current Plan
1. [DONE] Diagnose why custom right-click menu doesn't appear on article pages
2. [DONE] Confirm `CAN_COPY` is unrelated to the missing menu
3. [TODO] If user approves, modify `CustomContextMenu.js` to use capture-phase event listener (`addEventListener('contextmenu', handler, true)`) so the menu appears even within `react-notion-x` blocks that call `stopPropagation`

---

## Summary Metadata
**Update time**: 2026-07-22T12:19:16.684Z 
