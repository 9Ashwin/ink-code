# 完整工作流手册

> 本手册为通用建站工作流（与 portfolio-site-builder 同源）。在 editorial-portfolio-builder 中使用时：
> Stage 1 设计阶段通常被"直接读 references/design/ 蓝图"替代（复刻场景）；只有当用户要求改动风格时才走完整设计师子代理。

> 目录：Stage 0 需求 → Stage 1 设计 → Stage 2 脚手架 → Stage 3 页面并行 → Stage 4 合并构建 → Stage 5 交付 → 踩坑案例库

## Stage 0 — 需求确认（主代理，5 分钟）

用一次 `ask_user` 问 2–3 题（别拆分多次打断）：

1. **职业方向**：设计师/程序员/产品运营/通用 —— 决定作品展示形式（画廊 vs 项目卡片 vs 案例研究）
2. **视觉风格**：给具体可选项而不是开放题，例如"简约高级 / 杂志编辑风 / 深色科技 / 多巴胺撞色"
3. **内容来源**："先用精美占位示例"（默认推荐，最快出效果）vs"用户提供真实信息"

同时写一份 `plan.md` 当执行蓝图（阶段、每阶段子代理分工、门禁标准）。

## Stage 1 — 设计（1 个设计师子代理，前台阻塞）

**Prompt 模板**（系统提示：world-class web designer；任务）：

```
Read <design-guide 路径> in full. Follow it as your design reference.
## User Request
"<用户原始请求逐字复制 + Stage 0 的回答拼进去>"
## Instructions
…create a complete design. Aim for content-rich, ambitious…
Write all design files to /mnt/agents/output/design/:
- design.md — Global design document
- [page].md — One per page
```

规则：prompt 里**不要加自己的创意倾向**（颜色建议、参考公司），设计师独立决策；
用户原话逐字复制，不要改写。

**验收门禁**：design.md 必须含 ① 完整色板（带色值）② 字体方案 ③ 页面列表（路由）
④ 共享组件规格（Navbar/Footer）⑤ 资源清单（文件名+描述+尺寸）⑥ 依赖清单。
缺项直接让设计师补，别进入下一阶段。

## Stage 2 — 脚手架（1 个子代理，前台阻塞）

任务：共享组件 + 首页 + 全部媒体资源 + 路由 stub。Prompt 必含（按重要性）：

1. worktree 搭建命令 + 读 react-dev / design.md / home.md
2. **按资源清单生成所有媒体**（明确指定用图像生成工具；如果子代理说"没有生成工具"
   而用搜索+PIL 凑，主代理要抽查 2–3 张关键图的质量——程序化绘制的扁平插画通常 OK，
   照片级人像不行就得主代理自己生成）
3. **共享组件精确路径**：`src/components/Navbar.tsx`（含所有路由链接）、`Footer.tsx`、
   `Layout.tsx`，以及 design.md 里的共享基元（SectionHeader/Stamp/Tag/Tape 等）
4. 路由模式契约：Layout 用 `{children}` ⇒ App 用 `<Layout><Routes>…`；
   用 `<Outlet/>` ⇒ 嵌套 Route。**二选一，混用渲染白屏但 build 通过**
5. Navbar 定位契约：默认 `sticky top-0 z-50`；`fixed` 时 Layout 补顶部 padding
6. 占位人物姓名/字体/色板必须与 design.md 完全一致

**验收门禁**（合并后逐项核对，这步最严）：

```bash
ls src/components/ | grep -E "Navbar|Footer|Layout"   # 三个都在
grep -n "Route path" src/App.tsx                       # 每个路由都有 stub
grep -nw "fixed" src/components/Navbar.tsx             # 若命中，检查 Layout 有 pt 补偿
grep -rn "<Outlet" src/components/Layout.tsx           # 与 App.tsx 的用法一致
ls public/                                             # 对照资源清单
grep -rn "<占位人名>" src/ | wc -l                     # 只有一个名字，无第二个候选人
```

任何一个不过 → 派一个修复子代理补齐（给它精确的缺口清单），**不要带病进入 Stage 3**。

## Stage 3 — 页面并行（每页 1 个子代理，同一条消息全部发出）

分支命名 `pg-<page>`，全部从 master 切。每个 prompt 必含：

1. worktree 搭建命令（唯一路径 `$HOME/app-pg-<page>`）
2. 读 react-dev + design.md + 自己页面的 md（强调 faithful implementation）
3. `cat` 现有共享代码（Navbar/Footer/Layout/基元/index.css/App.tsx/data.ts）
4. **作用域白名单**：只能改 `src/pages/<X>.tsx` + `src/components/<x>/`；
   明确列出禁止修改清单（App.tsx、index.css、共享组件、public/、其他页面）
5. 数据文件归属：全站共享的 `src/lib/data.ts` 只能分配给一个代理（或都不许动，
   数据放各自目录），否则必冲突
6. 弹层/阅读视图等用 state 驱动（路由归 App.tsx，页面代理不能加路由）
7. 自验：`npm run build` exit 0 后 commit，立即返回

后台并行 + `wait_for_message` 收割；每完成一批向用户简报一次。

## Stage 4 — 合并构建（主代理亲自做）

```bash
git branch final-build && <setup worktree>
# 逐个 merge（不要 octopus——任何冲突都会整体失败）：
for b in pg-home pg-projects ...; do git merge $b --no-edit; done
```

**依赖冲突处理**（多个代理加同一包时必现）：
- package.json：取并集（同一包只留一份，dependencies/devDependencies 分布无所谓）
- package-lock.json：`git checkout --ours` 后 `npm install` 重新调和
- 解决后必须 `npm install && npm run build` exit 0 才算过

契约复查（Navbar fixed/Layout 模式）→ 提交 → merge 回 master。

## Stage 5 — 交付与迭代

- 静态站：版本工具 `build_version`，`type:"static"`，project_dir 指向共享仓库路径；
  保存即交付，**之后不要再截图/开浏览器验证**
- 告知用户：预览=版本卡片；发布=用户自己点「发布」按钮；旧版本可回滚
- 迭代改版：一律从 master 切新分支 + 新 worktree，不复用旧 worktree

## 上线级检查（交付前可选但推荐）

构建通过之外，面向"真实上线"的快速检查（各 1 分钟）：
- **运行时冒烟**：build 只能抓编译错误——有条件就在浏览器里点开每个路由 + 触发一次关键交互（弹层/表单提交），确认无白屏无报错
- **SEO/分享**：`index.html` 有 `<title>`、description、OG 图（放 `public/og-cover.png` 并在 meta 引用）
- **可访问性保底**：彩色底上文字对比度合格；所有图片有 alt；弹层可 Esc 关闭；按钮有焦点态
- **表单**：纯前端表单必须明示"提交成功"是演示态（或接 localStorage 存档），别让用户以为真的发出去了
- **回滚路径**：交付时告知用户旧版本 ID 可回滚

## 踩坑案例库（真实项目提炼）

| 坑 | 症状 | 预防 |
|---|---|---|
| 脚手架子代理"自由发挥" | 没建 Layout/Footer、路由是锚点单页、字体和人名跟设计稿不一致 | Stage 2 门禁逐项 grep，不合格派修复代理 |
| `from()` 用在 GSAP scrub 时间线 | 元素全程透明不可见，build 无报错 | 页面代理 prompt 里写明 scrub 必须 `fromTo()` |
| 多代理加同一依赖 | merge 时 package.json/lock 冲突 | 逐个 merge + 并集/重 install |
| Layout 与 App 路由模式混用 | 页面白屏但 build 通过 | 契约检查：`grep Outlet Layout` 对比 App 写法 |
| 子代理声称"没有图像生成工具" | 用图搜+PIL 凑图 | 主代理抽查图片质量；关键视觉图主代理自己生成 |
| 图搜素材带版权水印 | Shutterstock 水印条直接渲染在项目封面区（盲评被抓） | **素材入库前逐张目检**；水印常在底部白条，可裁掉；优先用生成工具自产 |
| fixed Navbar 无补偿 | 每页顶部被吃掉一截 | 优先 sticky；fixed 必须 Layout 补 padding |
