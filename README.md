# 🖋️ INK & CODE — 墨色杂志编辑风作品集

[![Deploy](https://github.com/9Ashwin/ink-code/actions/workflows/deploy.yml/badge.svg)](https://github.com/9Ashwin/ink-code/actions)

米白纸底上的墨色印刷品：超大 Archivo Black 英文刊头 × 中文衬线标题、信号橙刊号/印章/下划线点缀、撕纸边缘、胶带贴照片、半调网点、1px 墨线卡片 + 硬阴影、字符级"铅字落版"动画、Lenis 平滑滚动 + GSAP 滚动叙事、自定义杂志光标。

一个仓库，一件事：**独立技术杂志特刊质感的个人简历 / 作品展示站**。

在线预览：<https://9ashwin.github.io/ink-code/>

> 当前内容为虚构人物「陈未远 / Chen Weiyuan」的精美占位示例，可整体替换为真实信息。

---

## 🌐 技术栈

Vite 8 · React 19 · TypeScript · Tailwind CSS 3.4 · GSAP ScrollTrigger · Framer Motion · Lenis · React Router

## 📄 页面结构（5 路由）

| 路由 | 页面 |
|---|---|
| `/` | 首页：开刊动画 + 杂志封面 Hero + 目录条 + 精选作品横向卷动 + 黑版技术栈 + 履历摘要 + 卷首语 + 最新刊文 + 联系 CTA |
| `/projects` | 作品：目录式大索引 + 分类筛选 + 案例报道详情弹层 |
| `/about` | 经历：人物特稿 + 数据速览 + 竖向时间轴 + 技能矩阵 + 证书 / PDF 下载卡 |
| `/blog` | 写作：文章网格 + 分类筛选 + 杂志阅读视图（首字下沉 / 进度条 / 上一篇下一篇） |
| `/contact` | 联系：来信表单（演示态）+ 编辑部信息栏 + FAQ 手风琴 |

## 🚀 本地运行

```bash
npm install
npm run dev        # 开发模式 → http://localhost:5173/（根路径）
npm run build      # 生产构建（base 自动切到 /ink-code/，并生成 404.html SPA fallback）
npm run preview    # 预览构建产物 → http://localhost:4173/ink-code/
```

## ☁️ 部署（GitHub Pages）

push `master` 自动触发 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages。

- **SPA fallback**：构建脚本会把 `index.html` 复制为 `404.html`，子路由（如 `/projects`）直接刷新返回 HTTP 404 状态但页面正常渲染，站内导航无此问题。
- **CDN 缓存**：刚部署完 1~2 分钟内可能拿到旧版，强刷（Cmd+Shift+R）生效。
- **回滚**：git 历史每个阶段独立 commit，`git reset --hard <commit>` 后重推即可回到旧版。

## ✏️ 自定义内容

| 想改什么 | 位置 |
|---|---|
| 姓名 / 角色 / 标签 / 社交链接 | `src/lib/data.ts` 顶部 `profile` |
| 项目数据（8 个） | `src/lib/data.ts` `projects` |
| 经历时间轴 / 技能矩阵 / 证书 | `src/lib/data.ts` `experience` / `skillColumns` / `certificates` |
| 文章（8 篇，含正文） | `src/lib/data.ts` `posts` |
| FAQ | `src/lib/data.ts` `faq` |
| 肖像 / 项目图 / 文章封面 | `public/*.jpg`（黑白处理在全局 CSS `.photo-editorial`） |
| 站点标题 / SEO / OG | `index.html` |
| 视觉 token（色板 / 字体 / 硬阴影） | `tailwind.config.js` + `src/index.css` |

## 📦 技能来源

本站由 `editorial-portfolio-builder` 技能工作流构建（需求确认 → 读蓝图 → 脚手架 → 4 页面并行 → 合并 → 交付）。

## 📄 License

MIT
