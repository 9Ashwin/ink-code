/**
 * 全站共享占位数据（虚构人物：陈未远 / Chen Weiyuan，全栈工程师）。
 * 图片引用统一用 .jpg（素材包为压缩体积存为 .jpg，design 文档中的 .png 已全局替换）。
 * 本文件为全站唯一数据源：各页面只读 import，禁止在此之外重复定义数据。
 */

export interface Project {
  id: string
  no: string
  name: string
  nameEn: string
  desc: string
  year: string
  cat: 'WEB 应用' | '开源工具' | '移动端' | '图形与可视化'
  stack: string[]
  cover: string
  featured?: boolean
  stamp?: string
  role: string
  team: string
  status: string
  summary: string
  challenge: string
  solution: string
  metrics: { value: string; label: string }[]
}

export interface Post {
  id: string
  title: string
  date: string
  cat: '工程实践' | '语言与工具' | '随想' | '翻译'
  read: string
  cover: string
  excerpt: string
  feature?: boolean
  body: { title: string; paragraphs: string[] }[]
}

export const profile = {
  name: '陈未远',
  nameEn: 'Chen Weiyuan',
  initials: 'C.W.Y',
  role: 'FULL-STACK ENGINEER',
  roleZh: '全栈工程师',
  tagline: '写代码，也写杂志般的代码注释。',
  portraitHero: '/portrait-hero.jpg',
  portraitAbout: '/portrait-about.jpg',
  collage: '/collage-desk.jpg',
  location: '上海',
  timezone: 'UTC+8',
  status: 'OPEN TO WORK',
  email: 'hi@chenweiyuan.dev',
  github: 'github.com/chenweiyuan',
  githubUrl: 'https://github.com/chenweiyuan',
  juejin: 'juejin.cn/user/chenweiyuan',
  juejinUrl: 'https://juejin.cn/user/chenweiyuan',
  x: '@chenweiyuan',
  xUrl: 'https://x.com/chenweiyuan',
  rss: 'chenweiyuan.dev/feed.xml',
  site: 'chenweiyuan.dev',
  coords: '31.23°N, 121.47°E',
  est: 'EST. 2019',
  years: '6+',
}

export const navLinks = [
  { to: '/', label: '首页', en: 'HOME' },
  { to: '/projects', label: '作品', en: 'WORKS' },
  { to: '/about', label: '经历', en: 'PROFILE' },
  { to: '/blog', label: '写作', en: 'WRITING' },
  { to: '/contact', label: '联系', en: 'CONTACT' },
]

export const metrics = [
  { value: 6, suffix: '+', label: '年工程经验' },
  { value: 4.2, suffix: 'k', label: 'GitHub Stars', decimals: 1 },
  { value: 23, suffix: '', label: '上线的生产项目' },
  { value: 12, suffix: '', label: '篇技术长文' },
]

export const stackRows = [
  { cat: 'FRONTEND', items: ['TypeScript', 'React', 'Next.js', 'Vue'] },
  { cat: 'BACKEND', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL'] },
  { cat: 'INFRA', items: ['Docker', 'K8s', 'AWS', 'Terraform'] },
  { cat: 'CRAFT', items: ['Git', 'Vim', 'Figma', '写作'] },
]

export const projects: Project[] = [
  {
    id: 'devflow', no: '01', name: 'DevFlow 流水线', nameEn: 'VISUAL CI/CD ORCHESTRATOR',
    desc: 'CI/CD 可视化编排平台，让每一次部署都像翻杂志一样顺滑。',
    year: '2024', cat: 'WEB 应用', stack: ['TypeScript', 'React', 'Node.js'],
    cover: '/proj-devflow.jpg', featured: true,
    role: 'LEAD DEV', team: '5 人', status: 'IN PRODUCTION',
    summary: '把 Docker 化 CI/CD 流水线抽象成可拖拽的可视化 DAG，用状态机保证每一步可回放、可暂停、可续跑。',
    challenge: '公司数百条流水线散落在 YAML 与脚本里，构建失败定位一次平均要 40 分钟。',
    solution: '设计了 DAG 可视化编排层 + 事件溯源式运行记录，失败节点高亮并一键回放到出错步骤。',
    metrics: [
      { value: '40%', label: '部署提速' },
      { value: '200+', label: '使用团队' },
      { value: '99.9%', label: '可用性' },
    ],
  },
  {
    id: 'atlas', no: '02', name: 'Atlas 图谱引擎', nameEn: 'REAL-TIME KNOWLEDGE GRAPH',
    desc: '实时协作知识图谱，十万节点，六十帧。',
    year: '2024', cat: '图形与可视化', stack: ['Rust', 'WASM', 'WebGL'],
    cover: '/proj-atlas.jpg', featured: true,
    role: 'CORE DEV', team: '4 人', status: 'OPEN SOURCE',
    summary: 'Rust 编写图布局引擎编译到 WASM，WebGL 渲染十万级节点保持 60fps，支持多人实时协同编辑。',
    challenge: '十万节点 + 多人协同 = 布局计算与 WebGL 重绘的双重瓶颈。',
    solution: '增量布局 + 力导向算法下放到 WASM 线程，渲染层用 LOD 与脏矩形重绘控制开销。',
    metrics: [
      { value: '100k', label: '节点实时渲染' },
      { value: '60fps', label: '交互帧率' },
      { value: '1.2k', label: 'GitHub Stars' },
    ],
  },
  {
    id: 'pulse', no: '03', name: 'Pulse 健康监控', nameEn: 'MOBILE OBSERVABILITY APP',
    desc: '把告警做成晨报的移动端全栈监控 App。',
    year: '2023', cat: '移动端', stack: ['React Native', 'Go'],
    cover: '/proj-pulse.jpg', featured: true,
    role: 'FULL-STACK', team: '3 人', status: 'SHIPPED',
    summary: '面向中小团队的移动监控台：告警聚合、晨报推送、一键进入上下文排查。',
    challenge: '监控数据噪声大，运维同学被告警淹没却错过真问题。',
    solution: '告警相关性聚类 + 每日晨报摘要，把“十万火急”压缩成“三件要紧事”。',
    metrics: [
      { value: '60%', label: '告警噪声下降' },
      { value: '10k', label: '日活用户' },
      { value: '4.9', label: '应用评分' },
    ],
  },
  {
    id: 'tinycc', no: '04', name: 'TinyCC 编译器', nameEn: 'C SUBSET TO LLVM',
    desc: '从零到 hello world，只用 4000 行。',
    year: '2023', cat: '开源工具', stack: ['Rust', 'LLVM'],
    cover: '/proj-compiler.jpg', featured: true,
    role: 'SOLO DEV', team: '1 人', status: 'OPEN SOURCE',
    summary: '教学用 C 子集编译器，词法/语法/语义/LLVM IR 生成全链路，注释比代码更幽默。',
    challenge: '让“写一个编译器”从黑魔法变成普通人两周能啃完的教程。',
    solution: '按最小可运行子集迭代，每章配一个可跑通的可执行示例。',
    metrics: [
      { value: '4k', label: '行代码' },
      { value: '1.6k', label: 'Stars' },
      { value: '18', label: '章教程' },
    ],
  },
  {
    id: 'garden', no: '05', name: 'Markdown Garden', nameEn: 'LOCAL-FIRST NOTES',
    desc: '本地优先、双向链接的笔记工具，文件就是一切。',
    year: '2022', cat: '开源工具', stack: ['Tauri', 'Svelte'],
    cover: '/proj-terminal.jpg',
    role: 'SOLO DEV', team: '1 人', status: 'OPEN SOURCE',
    summary: 'Tauri 打包的本地优先笔记工具，笔记就是 Markdown 文件，双向链接与图谱可视。',
    challenge: '云端笔记让你成为自己数据的租户。',
    solution: '一切文件落本地 Git 仓库，导出即原样 Markdown，零供应商锁定。',
    metrics: [
      { value: '900', label: 'Stars' },
      { value: '100%', label: '数据本地' },
      { value: '2.1MB', label: '安装体积' },
    ],
  },
  {
    id: 'gridbot', no: '06', name: 'Gridbot', nameEn: 'GRID TRADING BACKTEST',
    desc: '交易网格策略回测框架，参数扫描一把梭。',
    year: '2022', cat: '开源工具', stack: ['Python', 'Pandas'],
    cover: '/proj-terminal.jpg',
    role: 'SOLO DEV', team: '1 人', status: 'OPEN SOURCE',
    summary: '网格交易策略回测框架，支持参数网格扫描与可视化归因。',
    challenge: '回测引擎要快、要可复现，还要能解释每一笔盈亏从哪来。',
    solution: '向量化撮合 + 归因报表，一次扫描跑完 10 万组参数组合。',
    metrics: [
      { value: '100k', label: '参数组合/次' },
      { value: '600', label: 'Stars' },
      { value: '0', label: '玄学依赖' },
    ],
  },
  {
    id: 'typo', no: '07', name: 'Typo 中文排版引擎', nameEn: 'CHINESE TYPOGRAPHY LIB',
    desc: 'Web 中文排版库，让标点悬挂成为默认。',
    year: '2021', cat: '开源工具', stack: ['TypeScript'],
    cover: '/proj-compiler.jpg', stamp: 'OPEN SOURCE',
    role: 'CORE DEV', team: '2 人', status: 'OPEN SOURCE',
    summary: '面向中文 Web 的排版库：标点悬挂、两端对齐、孤行控制。',
    challenge: '浏览器对中文排版的原生支持远落后于英文。',
    solution: '纯 TypeScript 实现标点压缩与悬挂，无运行时依赖，3KB gzip。',
    metrics: [
      { value: '3KB', label: 'gzip 体积' },
      { value: '1.1k', label: 'Stars' },
      { value: '6', label: '次重写' },
    ],
  },
  {
    id: 'dotfiles', no: '08', name: 'Dotfiles', nameEn: 'ENVIRONMENT AS CODE',
    desc: '开发环境即代码，换机 20 分钟重建一切。',
    year: '2019—', cat: '开源工具', stack: ['Shell', 'Lua'],
    cover: '/proj-terminal.jpg', stamp: 'LONGTERM',
    role: 'SOLO DEV', team: '1 人', status: 'MAINTAINED',
    summary: '持续维护多年的开发环境仓库：Neovim / zsh / tmux 配置即代码，一键换机。',
    challenge: '配置会腐烂，环境不可复现，换机器像重新学走路。',
    solution: '模块化 + 幂等安装脚本，新机器一条命令回到熟悉的一切。',
    metrics: [
      { value: '7', label: '年维护' },
      { value: '1cmd', label: '重建环境' },
      { value: '∞', label: '顺手的小脚本' },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export interface Experience {
  period: string
  company: string
  role: string
  points: string[]
  stack?: string[]
  current?: boolean
  education?: boolean
}

export const experience: Experience[] = [
  {
    period: '2022 — 现在', company: '星舟科技', role: '高级前端工程师',
    current: true,
    stack: ['TypeScript', 'React', '微前端'],
    points: [
      '主导设计中台前端微前端架构，统一 200+ 内部产品的技术栈与组件库。',
      '推动构建流水线升级，构建时间从 18 分钟降至 4 分钟。',
      '带 4 人小组，负责 Code Review 与技术分享文化。',
    ],
  },
  {
    period: '2020 — 2022', company: '云脉网络', role: '全栈工程师',
    stack: ['Go', 'CRDT', 'PostgreSQL'],
    points: [
      '从零设计并实现实时协作编辑后端（CRDT），支撑产品从 0 到 10 万 DAU。',
      '搭建可观测性体系，MTTR 下降 70%。',
    ],
  },
  {
    period: '2019 — 2020', company: '独立开发 & 开源', role: 'Indie Hacker',
    stack: ['Rust', 'TypeScript', 'Python'],
    points: [
      '发布三款开发者工具（Typo / Dotfiles / Gridbot），累计获得 4.2k Stars。',
      '开始技术写作，形成“工程即写作”的方法论。',
    ],
  },
  {
    period: '2015 — 2019', company: '华东理工大学', role: '计算机科学 · 学士',
    education: true,
    points: [
      'ACM 校队成员。',
      '毕业设计《基于 WebAssembly 的在线代码评测系统》获校优。',
    ],
  },
]

export const skillColumns = [
  {
    key: 'DAILY', label: '精通', icon: 'daily',
    skills: [
      { name: 'TypeScript', level: 95, years: '6 yrs' },
      { name: 'React', level: 92, years: '6 yrs' },
      { name: 'Node.js', level: 90, years: '5 yrs' },
      { name: 'PostgreSQL', level: 85, years: '5 yrs' },
      { name: 'Git', level: 88, years: '7 yrs' },
    ],
  },
  {
    key: 'WEEKLY', label: '熟练',
    skills: [
      { name: 'Rust', level: 78, years: '2 yrs', note: '写了两个生产项目，还在还债' },
      { name: 'Go', level: 80, years: '3 yrs' },
      { name: 'Docker', level: 82, years: '4 yrs' },
      { name: 'K8s', level: 72, years: '3 yrs' },
      { name: 'Next.js', level: 85, years: '3 yrs' },
      { name: 'Figma', level: 70, years: '3 yrs' },
    ],
  },
  {
    key: 'PLAYED', label: '玩过',
    skills: [
      { name: 'WebGL', level: 60, years: '1 yr' },
      { name: 'LLVM', level: 55, years: '1 yr' },
      { name: 'Elixir', level: 50, years: '0.5 yr' },
      { name: '钢琴', level: 40, years: '彩蛋' },
    ],
  },
]

export const certificates = [
  { year: '2024', name: '掘金优秀作者' },
  { year: '2023', name: 'AWS SAA 认证' },
  { year: '2023', name: '公司年度技术影响力奖' },
  { year: '2018', name: 'ICPC 区域赛铜牌' },
]

export const posts: Post[] = [
  {
    id: 'fp-mental-health', title: '函数式编程治好了我的精神内耗', date: '2025.02.18',
    cat: '随想', read: '14 MIN READ', cover: '/blog-cover-1.jpg', feature: true,
    excerpt: '当我不再试图控制每一个状态，而是描述状态之间的流转，焦虑就转移给了类型系统——它比我更有耐心。',
    body: [
      { title: '控制欲的错觉', paragraphs: ['写命令式代码时，我总想亲手拧住每一个状态，仿佛松开手程序就会崩塌。后来我发现真正让程序崩塌的，恰好是这种事无巨细的控制。', '函数式的第一步不是学 monad，而是接受一件事：状态不该被“维护”，只该被“推导”。让数据流替你说话。'] },
      { title: '把副作用赶到墙角', paragraphs: ['副作用不可怕，可怕的是它藏在任何一处。把 IO 全部赶到程序边界，纯函数核心自然变得可测试、可推理、可被同事放心重构。', '这和你整理工位是一个道理：脏东西只留在门口，桌子永远干净。'] },
      { title: '类型是耐心的老师', paragraphs: ['类型系统把我的“万一”全部提前到编译期回答。剩下的运行时问题，数量少到可以逐个拥抱。', '焦虑的本质是未知，而类型把未知变成待办。'] },
    ],
  },
  {
    id: 'rust-build-script', title: '我用 Rust 重写了公司的构建脚本', date: '2025.01.06',
    cat: '工程实践', read: '8 MIN READ', cover: '/blog-cover-4.jpg',
    excerpt: '一段 900 行的 Bash 被 300 行 Rust 替代，构建时间从 11 分钟掉到 3 分钟。这不是炫技，是工程债清偿。',
    body: [
      { title: '为什么是 Bash 的锅', paragraphs: ['Bash 适合粘合命令，不适合描述构建逻辑。分支一多，引号与空格就联合起来报复你。', '我们把增量编译、缓存校验、并行任务全部搬进 Rust，用类型把“错误路径”提前锁死。'] },
      { title: '结果', paragraphs: ['同一台机器，全量构建 11 分钟 → 3 分钟；增量构建进入秒级。同事的第一反应是怀疑脚本作弊。'] },
    ],
  },
  {
    id: 'pg-index', title: 'PostgreSQL 索引：一本被翻烂的书', date: '2024.11.02',
    cat: '工程实践', read: '10 MIN READ', cover: '/blog-cover-2.jpg',
    excerpt: 'B+ 树、位图扫描、覆盖索引、部分索引——用一张表把索引讲成图书馆的检索系统。',
    body: [
      { title: '索引是目录，不是藏书', paragraphs: ['索引不存数据，它只告诉你数据在哪一页。理解这一点，就理解了为什么“别在低基数列上建索引”。'] },
      { title: 'EXPLAIN 是你的朋友', paragraphs: ['每次 DBA 发来 EXPLAIN，都是一次阅读理解考试。把 Seq Scan 读作“全馆翻书”，把 Index Scan 读作“翻目录取书”。'] },
    ],
  },
  {
    id: 'web-cn-typo', title: 'Web 中文排版的 100 个细节', date: '2024.09.15',
    cat: '语言与工具', read: '12 MIN READ', cover: '/blog-cover-3.jpg',
    excerpt: '标点悬挂、孤行控制、中文引号、竖排注释……中文排版在 Web 上欠了太多债，这是还债清单的第一页。',
    body: [
      { title: '标点不是装饰', paragraphs: ['中文标点占全角，排版的难点在于悬挂与压缩。好的中文排版，读者不会注意到标点——因为它从不捣乱。'] },
      { title: '字体回退的玄学', paragraphs: ['系统字体、西文混排、粗体模拟……一个字号要试三个平台。这份清单写给我的下一个项目，也写给看这篇文章的你。'] },
    ],
  },
  {
    id: 'vim-neovim', title: '从 Vim 到 Neovim：一个配置即代码的故事', date: '2024.06.20',
    cat: '语言与工具', read: '9 MIN READ', cover: '/blog-cover-4.jpg',
    excerpt: '我的 .config 是我的第二大脑。这份配置随我搬了五次家（机器），每次重建都不超过二十分钟。',
    body: [
      { title: '配置即代码', paragraphs: ['把配置当项目维护：版本管理、issue 追踪、文档齐全。换机不再是一场灾难，而是一次清爽的重装。'] },
      { title: '少即是多的插件哲学', paragraphs: ['我删掉的插件比装过的多。每一行配置都该有理由，否则它就是未来的一行 bug。'] },
    ],
  },
  {
    id: 'refactor-refactor', title: '重构一次失败的重构', date: '2024.03.11',
    cat: '随想', read: '7 MIN READ', cover: '/blog-cover-2.jpg',
    excerpt: '我们重构了三次，前两次都失败了。失败的原因不是技术，而是我们没有定义“重构成功”的标准。',
    body: [
      { title: '没有标准的重构是赌博', paragraphs: ['重构开始前，先写下可度量的成功标准：这段代码的下一个改动者能多快上手？测试覆盖是否不变？'] },
      { title: '小步慢跑', paragraphs: ['第三次我们把重构拆成 40 个 PR，每个都可独立上线。恐惧消失了，因为每一步都在验证。'] },
    ],
  },
  {
    id: 'crdt-intro', title: 'CRDT 入门：让协作编辑不再神秘（译）', date: '2023.12.05',
    cat: '翻译', read: '11 MIN READ', cover: '/blog-cover-3.jpg',
    excerpt: '无冲突复制数据类型，是多人实时协作的基石。这篇译文带你从“听过”到“会写一个”。',
    body: [
      { title: 'CRDT 在解决什么', paragraphs: ['两个节点同时编辑同一处，如何合并而不丢字？CRDT 给出一类数学上保证收敛的数据结构。'] },
      { title: '从 G-Counter 开始', paragraphs: ['最朴素的 CRDT 是只增计数器。从它出发，你会在十分钟内理解“合并函数必须满足交换律”意味着什么。'] },
    ],
  },
  {
    id: 'dev-env-2023', title: '我的 2023 开发环境全公开', date: '2023.08.19',
    cat: '语言与工具', read: '6 MIN READ', cover: '/blog-cover-4.jpg',
    excerpt: '终端、编辑器、窗口管理、快捷键一图流。工具不该是负担，配置不该是玄学。',
    body: [
      { title: '桌面', paragraphs: ['一台 16 寸 MacBook Pro + 一块 4K 屏。窗口管理交给 yabai，工作区按项目切。'] },
      { title: '终端', paragraphs: ['Ghostty + zsh + zoxide，别名比你想象的少。真正的高效来自肌肉记忆，不是花哨配置。'] },
    ],
  },
]

export const faq = [
  { q: '你接什么样的项目？', a: '有技术挑战或有意思的领域：开发者工具、实时系统、数据可视化。周期 2 周以上的远程协作最佳。' },
  { q: '接全职 offer 吗？', a: '长期看机会。比起 title，我更在意团队的技术品味和写作文化。' },
  { q: '可以约线下咖啡吗？', a: '上海静安 / 徐汇一带，工作日下午。手冲优先，连锁免谈（也是开玩笑的）。' },
  { q: '这个网站用什么做的？', a: 'React + Vite + Tailwind + GSAP，源码在 GitHub 开源，欢迎参考。' },
]

export const resumeFileName = 'chen-weiyuan-resume.pdf'
