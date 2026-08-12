# 作品页 `/projects` — 全部作品索引（杂志目录式）

整页是"作品特刊"的完整目录：可筛选的大号索引列表 + 项目详情弹层（案例报道版式）。

---

## Section 1 — 页头刊头

**布局**：纸白底，上接 Navbar，padding-top 160px。
- mono 橙色编号 `VOL.02 — WORKS / 作品特辑`
- 超大标题两行：`作品索引`（Noto Serif SC 900）+ `SELECTED WORKS 2019—2025`（Archivo Black 空心描边，出血至右边缘）
- 右侧竖排 mono 小字："共 08 篇报道 · 持续更新"
- 底部 1px 墨线 + 下方一条筛选带（见下）

**动画**：加载时标题字符级落下（y 50→0, stagger 0.03s）；英文行从右侧 wipe 入（0.7s）；墨线 scaleX 0→1（0.8s）。

---

## Section 2 — 筛选带

**布局**：一行 mono 大写筛选标签，1px 墨线上下夹住：`全部 08 / WEB 应用 / 开源工具 / 移动端 / 图形与可视化`。当前项 = 墨黑填充反白。
**动画**：标签 stagger 0.06s 上浮进场。
**交互**：点击切换 → 下方列表用 Framer Motion layout 动画重排（0.5s，卡片位置/透明度过渡）。

---

## Section 3 — 作品索引大列表

**布局**：杂志目录式大行列表，每行高约 140px，行间 1px 细墨线。每行结构（桌面）：
- 左：超大序号 `01`–`08`（Archivo Black 72px，默认空心，hover 变实心信号橙）
- 中左：项目中文名（Noto Serif SC 40px）+ 下方 mono 英文副题
- 中右：技术栈 Tags（mono 胶囊）+ 年份（mono 大字）
- 右：缩略图 120×80（黑白小图，默认 opacity 0.6）
- **hover 大图**：鼠标所在行上方浮出 480×320 大图（跟随鼠标 x 方向，延迟 0.1s 缓动），黑白→彩色，旋转 -2°，带胶带角

**八个项目**（占位）：
1. DevFlow 流水线 — CI/CD 可视化编排 · TypeScript / React / Node.js · 2024
2. Atlas 图谱引擎 — 实时协作知识图谱 · Rust / WASM / WebGL · 2024
3. Pulse 健康监控 — 全栈监控 App · React Native / Go · 2023
4. TinyCC 编译器 — 教学用编译器 · Rust / LLVM · 2023
5. Markdown Garden — 本地优先笔记工具 · Tauri / Svelte · 2022
6. Gridbot — 交易网格回测框架 · Python / Pandas · 2022
7. Typo 中文排版引擎 — Web 中文排版库 · TypeScript · 2021（印章 "OPEN SOURCE"）
8. Dotfiles — 开发环境即代码 · Shell / Lua · 2019—（印章 "LONGTERM"）

**动画**：进入视口 15%，各行从 x -40px + opacity stagger 0.08s 进场；序号在 scroll scrub 下从空心渐变为实心（颜色填充跟随滚动进度）。
**交互**：hover 行 → 整行背景 Paper Dark、序号变橙、缩略图全亮、浮出大图；点击行 → 打开**详情弹层**。
**资产**：`proj-devflow.png`、`proj-atlas.png`、`proj-pulse.png`、`proj-terminal.png`、`proj-compiler.png`（其余项目复用黑白拼贴占位图）

---

## Section 4 — 项目详情弹层（Case Report Modal）

**布局**：shadcn Dialog 覆写——全屏弹层，Paper 底，顶部 1px 墨线 + mono 栏 "CASE FILE NO.01 — DEVFLOW"，右上角 X 关闭（旋转 hover）。
内容版式（杂志报道式，双栏 12 网格）：
- 左栏（7 栏）：大图 hero（黑白，顶部胶带装饰）→ 正文段落（标题 Noto Serif SC 32px，正文 17px/1.8）→ "挑战与方案"小节 → 第二张图 → "成果数据"三栏大字数字（如 `40% 部署提速 / 200+ 使用团队 / 99.9% 可用性`）
- 右栏（4 栏，sticky）：mono 元信息表（ROLE / YEAR / STACK / TEAM / STATUS）→ 技术栈 Tags → 链接按钮组：`访问线上 ↗` `GitHub 仓库 ↗`（墨线按钮，hover 墨块 wipe 填充）
- 底部：上一篇 / 下一篇项目导航（大箭头 + 项目名）

**动画**：弹层打开 = 整层从底部 100vh 上滑（0.5s power3.out），内部元素 stagger 0.05s 上浮；关闭反向。数字指标进入视口时计数滚动。
**交互**：Esc / 点击遮罩关闭；键盘 ←→ 切换上下项目。

---

## Section 5 — 页尾引导

**布局**：列表结束处，撕纸边缘过渡 + Paper Dark 带：mono "没找到想看的？" + 大标题 `去 GitHub 看我的全部开源 →`（Archivo Black，hover 橙色波浪）+ 副注 mono "github.com/chenweiyuan — 每周都在提交"
**动画**：进入视口标题字符级落下。
**交互**：点击外链 GitHub。

---

## 移动端适配

- 索引列表行改为卡片式堆叠（序号缩小至 48px，缩略图全宽置顶）
- hover 浮出大图禁用，改为卡片内固定图
- 筛选带横向滚动
- 详情弹层改全屏抽屉，单栏流式
