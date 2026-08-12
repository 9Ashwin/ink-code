# editorial-portfolio-builder — 执行蓝图

需求（Stage 0）：**设计师 · 5 页全做 · 精美占位内容**
复刻对象：原站「INK & CODE」墨色杂志编辑风（虚构人物 陈未远 / Chen Weiyuan）。

## 阶段
| 阶段 | 内容 | 门禁 |
|---|---|---|
| Stage 2 ✅ | 脚手架：Vite+React+Tailwind3.4、设计 token、素材、共享组件、首页、路由 | build exit 0 + 契约 grep 全过 |
| Stage 3 ⏳ | 4 个页面子代理并行（projects/about/blog/contact，各一 worktree 分支） | 各页 build exit 0 后 commit |
| Stage 4 | 逐个 merge 到 master，依赖冲突并集处理 | fresh install + build exit 0 |
| Stage 5 | 上线级检查（SEO/a11y/表单演示态）+ 交付 | 版本保存即交付 |

## Stage 3 页面代理分工
- `pg-projects` → src/pages/Projects.tsx（作品索引 + 筛选 + 详情弹层）
- `pg-about` → src/pages/About.tsx（人物特稿 + 时间轴 + 技能矩阵 + 下载）
- `pg-blog` → src/pages/Blog.tsx（文章索引 + 阅读视图）
- `pg-contact` → src/pages/Contact.tsx（表单 + 编辑部信息 + FAQ）

## 契约（全阶段）
- 页面代理作用域：仅 `src/pages/X.tsx` + `src/components/<x>/`；禁改 App.tsx / data.ts / index.css / 共享组件 / public
- 弹层/阅读视图用 state 驱动，不加路由
- 动画红线：GSAP scrub 必须 fromTo()；字符级标题 ≤20 字符 stagger 0.03；同屏动画 ≤8
- 数据唯一来源 src/lib/data.ts（只读）
- 合并逐个 merge，禁 octopus
