# CLAUDE.md — INK & CODE 作品集

墨色杂志编辑风个人简历/作品展示站（虚构人物：陈未远 / Chen Weiyuan）。

## 常用命令

```bash
npm run dev       # 开发（根路径 /）
npm run build     # 生产构建 → dist/（base=/ink-code/，并生成 404.html SPA fallback）
npm run preview   # 预览构建产物
npm run lint      # oxlint
```

## 结构约定

- **数据唯一来源**：`src/lib/data.ts`（profile/projects/experience/skills/posts/faq…）。改内容只动这里。
- **共享组件**：`src/components/primitives.tsx`（SectionHeader/Stamp/Tag/Tape/InkButton）、`ui.tsx`（Dialog/CloseButton/Accordion）、`Marquee.tsx`、`Navbar.tsx`/`Footer.tsx`/`Layout.tsx`。
- **动画工具**：`src/lib/anim.ts`（gsap/ScrollTrigger 已注册 + `splitChars`/`splitWords`/`letterpress`）。
- **路由**：`src/App.tsx` 用 `BrowserRouter`（GitHub Pages 下由 404.html 兜底 SPA 刷新）。弹层/阅读视图用 state 驱动，不加路由。

## 动画红线

- GSAP scroll scrub 时间线**必须用 `fromTo()`**，禁 `from()`（终值会被烘烤成透明）。
- 文字动画：标题字符级（≤20 字符，stagger 0.03s）、副标题词级、正文块级；同屏动画 ≤8。
- 印章"盖下"：`scale 1.4→1 + rotate→-8°`，elastic。
- 每个 GSAP 动画组件用 `gsap.context(() => {...}, root)` 包裹并返回 `() => ctx.revert()`。

## 部署

push `master` → `.github/workflows/deploy.yml` → GitHub Pages（`https://9ashwin.github.io/ink-code/`）。

## 风格反面清单

禁渐变玻璃拟态、禁圆角 SaaS 卡片、禁蓝紫科技感渐变。这是一个"纸质刊物"，不是 SaaS landing。
