# 首页 `/` — 杂志封面 + 全刊导览

整页结构像一本杂志：封面（Hero）→ 目录条 → 精选报道（作品横向卷动）→ 整版专题（技术栈黑版）→ 履历摘要 → 卷首语（关于预览）→ 最新文章 → 约稿启事（联系 CTA）。

**全局滚动**：Lenis 平滑滚动；页面加载时先播"开刊动画"：墨黑色块从中央向两侧裂开（0.6s），露出 Hero。

---

## Section 0 — 顶刊头条（Hero 上方细条）

**布局**：Navbar 下方一条高 36px 的细带，底部 1px 墨线。左：mono 小字 "VOL.01 / 2025 春 · 总第 001 期"；中：动态日期（JS 取当天，格式 `2025.03.14 FRI`）；右："OPEN TO WORK ●"（信号橙脉冲点）。
**动画**：页面加载后 0.8s，整条从上方 -100% 滑入（0.4s ease-out）。

---

## Section 1 — Hero 封面

**布局**（桌面 12 栏，高 100vh，纸白底）：
- 背景：淡半调点阵 + 一个超大纸白色描边空心字 "ENGINEER"（Archivo Black，stroke-only，opacity 0.06，宽约 140vw，缓慢 60s 水平漂移循环）
- **左上**（栏 1–7）：mono 编号 "ISSUE 001 — PORTFOLIO"，下方超大刊名三行堆叠：
  - 行 1：`陈未远`（Noto Serif SC 900，`clamp(72px,10vw,150px)`）
  - 行 2：`CHEN`（Archivo Black，同尺寸，纯描边空心）
  - 行 3：`WEIYUAN`（Archivo Black，实心墨黑，字母 "Y" 替换为信号橙）
- 刊名下方一行 mono 定位语：`FULL-STACK ENGINEER — 全栈工程师 / 写代码，也写杂志般的代码注释。`
- **右上**（栏 8–12）：`portrait-hero.png` 以 -2° 旋转放置，四周米白边框 12px（宝丽来感），底部手写风 mono 题注 "fig.01 — 本刊主角，摄于工位"；照片左上贴一条胶带（CSS 模拟），右下盖信号橙印章 "EST. 2019 / 从业六年"
- **拼贴碎件**：照片左下叠一张便签纸（旋转 3°，Paper Dark 底，mono 字："TODO: ship something great →"）；右上漂浮 mono 小标签 "based in Shanghai / UTC+8"
- **底部**：一条横向 marquee（底部 1px 墨线分隔）：`TYPESCRIPT — REACT — NODE.JS — RUST — 开源贡献者 — OPEN SOURCE — ` 循环，Archivo Black 48px 空心字，速度 30s/轮

**动画**：
- 加载：刊名三行字符级动画，y 60→0、rotate 4deg→0、opacity 0→1，stagger 0.035s，依次三行各延迟 0.15s；mono 编号从左 wipe 入（0.5s）
- 照片：从 scale 1.15 + rotate -6° 缓动落版到 -2°（1s, power3.out），印章延迟 0.8s "盖下"（scale 1.6→1 + rotate -14°→-8°，elastic 回弹）
- 滚动：ScrollTrigger scrub——刊名以 0.3 倍速上移，照片 0.6 倍速上移（视差分离），空心背景字加速漂移
**交互**：hover 照片 → 轻微 tilt（跟随鼠标 ±4°）+ 颗粒噪点闪烁；hover "OPEN TO WORK" 点 → 弹出 tooltip "接受远程协作与有趣的项目"

**资产**：`portrait-hero.png`、`texture-grain.png`

---

## Section 2 — 目录条（Contents Strip）

**布局**：整版墨黑底，高 auto（约 200px），内部 5 个横向排列的"目录项"，各占一栏，之间 1px 纸白 20% 透明竖线分隔：
`01 精选作品 WORKS →` / `02 技术栈 STACK →` / `03 职业经历 CAREER →` / `04 写作 WRITING →` / `05 联系 CONTACT →`
每项 = mono 橙色编号 + Noto Serif SC 中文大词 + Archivo 英文小词。
**动画**：滚动进入视口 15% 时，各项自下方 40px 依次 stagger 0.08s 上浮出现；底色整版从纸白"翻转"为墨黑（clip-path 圆形扩张，0.8s）。
**交互**：点击平滑滚动到对应板块；hover 项 → 整项反白（纸白底墨黑字）+ 箭头右移 8px。

---

## Section 3 — 精选作品（横向卷动画廊）

**布局**：纸白底，顶部 Section Header：`02 — FEATURED / 精选作品` + 右侧 mono 副注 "SCROLL → 横向翻阅"。
- 下方是一个**横向滚动区**：外层 pin 住 200vh，内部一排 4 张大幅作品卡（每张宽 60vw）随垂直滚动水平移动（GSAP ScrollTrigger scrub）
- **作品卡结构**（拼贴感）：图片（`proj-devflow.png` 等，黑白，500px 高）+ 左上角超大刊号数字 `01`（Archivo Black 120px，信号橙，与图片重叠出血）+ 图片下方 1px 墨线 + 中文项目名（Noto Serif SC 40px）+ 英文副题 mono + 一行技术栈 Tag（TypeScript / React / Rust…）+ 右侧竖排 mono "ROLE: LEAD DEV"
- 卡片之间交替上下错位 60px（拼贴错落感）

**四个精选项目**（占位内容）：
1. **DevFlow 流水线** — CI/CD 可视化编排平台（TS / React / Node）"让每一次部署都像翻杂志一样顺滑"
2. **Atlas 图谱引擎** — 实时协作知识图谱（Rust / WASM / WebGL）"十万节点，六十帧"
3. **Pulse 健康监控** — 移动端全栈监控 App（React Native / Go）"把告警做成晨报"
4. **TinyCC 编译器** — 教学用 C 子集编译器（Rust / LLVM）"从零到 hello world，只用 4000 行"

**动画**：pin 期间横向位移 scrub；每张卡进入视口中央时，刊号数字从 200% scale 缩至 100%（scrub 联动）；离开 pin 时最后一张卡"翻页"式 rotate 8° 淡出。
**交互**：hover 卡片图片 → 黑白转彩色（filter 过渡 0.5s）+ 轻微放大 1.03；点击 → 跳 `/projects` 并打开对应详情弹层；卡片右下角 "READ CASE →" mono 链接。
**资产**：`proj-devflow.png`、`proj-atlas.png`、`proj-pulse.png`、`proj-compiler.png`

---

## Section 4 — 技术栈整版（黑版专题）

**布局**：墨黑整版，pin 住 150vh 的滚动叙事：
- 顶部 mono 橙色 `03 — STACK / 武器库`，左侧 H2 `每天都在用的工具`（纸白 Noto Serif SC），右侧竖排英文大空心字 "ARSENAL"
- 主体：4 行**技术带**，每行 = 类别名（mono 橙色：FRONTEND / BACKEND / INFRA / CRAFT）+ 横向排列的技术词（Archivo Black 64px 纸白，词间 "·"）：如 `TypeScript · React · Next.js · Vue` / `Node.js · Go · Rust · PostgreSQL` / `Docker · K8s · AWS · Terraform` / `Git · Vim · Figma · 写作`
- pin 期间：滚动进度依次"点亮"各行——未激活行 opacity 0.15，激活行全亮且橙色类别名闪烁一次

**动画**：pin 150vh scrub；每行激活时词组从字间距 0.2em 收紧到正常（0.6s）；底部一条橙色进度线随 scrub 增长。
**交互**：hover 单个技术词 → 词变信号橙 + 下方浮现 mono 小注（熟练度年限，如 "6 yrs / daily driver"）。
**退出**：滚动到底，整版底部撕纸边缘（SVG 锯齿）过渡到下一板块纸白底。

---

## Section 5 — 职业经历摘要

**布局**：纸白底，Section Header `04 — CAREER / 履历节选` + 右侧 "完整简历 → /about" mono 链接。
- 三行"报纸表格"式条目（顶部/底部 1px 墨线，行间细分隔线）：每行 = 左侧年份区间（mono 大字 24px）+ 中间公司+职位（`星舟科技 · 高级前端工程师`，Noto Serif SC 28px）+ 一句话成就（Noto Sans SC 灰）+ 右侧箭头
- 条目内容：
  1. `2022 — 现在` / 星舟科技 · 高级前端工程师 / "主导中台前端架构，服务 200+ 内部产品"
  2. `2020 — 2022` / 云脉网络 · 全栈工程师 / "从零搭建实时协作后端，支撑 10 万 DAU"
  3. `2019 — 2020` / 独立开发 / "三款开源工具，累计 4.2k GitHub Stars"

**动画**：进入视口 20% 时各行从 x -60px 滑入 + opacity，stagger 0.12s；年份数字做计数滚动（2019→2022 等，1s）。
**交互**：hover 行 → 整行底色变 Paper Dark，箭头变橙并右移；点击 → 跳 `/about` 锚定对应经历。

---

## Section 6 — 卷首语（关于预览带）

**布局**：整宽横向带，左侧 55% = `collage-desk.png` 黑白大图（胶带贴角装饰），右侧 45% Paper Dark 底，内部：
- mono 橙色 `EDITOR'S NOTE / 卷首语`
- 引言（Noto Serif SC 28px，行首大号引号 "「" 出血）：`"好的工程和好的杂志一样——结构清晰、细节讲究、读起来有节奏。"`
- 署名 mono：— 陈未远 / 本刊唯一撰稿人
- CTA 按钮 "认识这位工程师 →"（墨线描边按钮，hover 墨块从左 wipe 填充反白）

**动画**：图片视差（scrub 0.4 倍速）；引言词级 stagger 上浮；按钮墨块 wipe 0.4s。
**资产**：`collage-desk.png`

---

## Section 7 — 最新写作（文章索引）

**布局**：纸白底，Section Header `05 — WRITING / 最新刊文` + "全部文章 → /blog"。
- 非对称网格：左侧一篇**头条文章**（占 7 栏）：`blog-cover-1.png` 大图 + 标题 `《函数式编程治好了我的精神内耗》`（Noto Serif SC 36px）+ 摘要两行 + mono 元信息 "2025.02 · 12 min read · #工程随笔"
- 右侧 5 栏：两篇小文章纵向堆叠（小图 + 标题 + 日期）：`《我用 Rust 重写了公司的构建脚本》`、`《PostgreSQL 索引：一本被翻烂的书》`
- 头条文章右上角贴印章 "EDITOR'S PICK"

**动画**：进入视口时头条图 clip-path 从左展开（0.8s），标题字符级 stagger；小文章从右 40px 滑入 stagger 0.15s。
**交互**：hover 文章 → 图片彩色化 + 标题下方橙色下划线滑入；点击 → `/blog`。
**资产**：`blog-cover-1.png`、`blog-cover-2.png`、`blog-cover-3.png`

---

## Section 8 — 联系 CTA（约稿启事）

**布局**：墨黑整版收尾（Footer 前）。中央超大文字两行：
- 行 1：`有项目想聊聊？`（Noto Serif SC 900，纸白，`clamp(48px,8vw,110px)`）
- 行 2：`LET'S TALK →`（Archivo Black，信号橙，hover 时整词做字母波浪跳跃动画）
- 下方 mono 小字：`hi@chenweiyuan.dev — 通常在 24 小时内回信 · 接受远程协作`
- 四角散落 mono 小注（拼贴感）："NO BORING PROJECTS / 有趣优先"、"回复率 98%"、"GMT+8 在线"

**动画**：进入视口 30%，行 1 字符级落下，行 2 从右侧 100px wipe 入；四角小注延迟 0.5s 逐个"盖印"出现。
**交互**：点击行 2 → 跳 `/contact`；hover 邮箱 → 复制到剪贴板 + 印章 "COPIED" 盖下反馈。

---

## 移动端适配要点

- Hero 刊名缩至 clamp 下限；照片置于刊名下方全宽；marquee 字号 28px
- 精选作品横向卷动改为原生横向 snap 滚动条（保留卡片设计）
- 技术栈词组字号 32px，换行堆叠
- 经历表格改为纵向卡片
- 目录条改为两行网格
