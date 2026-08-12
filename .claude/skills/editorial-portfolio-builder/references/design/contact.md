# 联系页 `/contact` — 约稿 / 合作（"读者来信"版式）

整页做成杂志"读者来信 / 约稿函"栏目：左侧表单即"来信"，右侧是"编辑部信息"。

---

## Section 1 — 页头

**布局**：纸白底，padding-top 160px。
- mono 橙色 `VOL.05 — CONTACT / 读者来信`
- 超大标题两行：`来杯咖啡？`（Noto Serif SC 900，`clamp(56px,9vw,120px)`）+ Archivo Black 信号橙实心 "SAY HELLO."（字母 hover 波浪）
- 副注 mono："通常 24 小时内回信 · 远程协作优先 · 谢绝 KPI 面议"

**动画**：标题字符级落下（stagger 0.04s）；英文行字母逐个弹入（spring）；副注延迟 0.5s 浮现。

---

## Section 2 — 主区（表单 + 信息栏）

**布局**：12 栏，左 7 栏 = 表单卡，右 4 栏（留 1 栏呼吸）= 信息栏，底部 1px 墨线分隔全页。

### 左侧：来信表单卡（墨线边框 + 硬阴影 + 顶部胶带贴条，像贴在墙上的信纸）
- 卡头 mono："LETTERS TO THE EDITOR — 编辑部收"
- 字段（每个字段 = mono 标签 + 底部 1px 墨线的极简输入，focus 时墨线变信号橙并轻微加粗动画）：
  1. `你的名字 / NAME *`（input）
  2. `邮箱 / EMAIL *`（input，格式校验）
  3. `来意 / SUBJECT`（chips 选择：项目合作 / 全职机会 / 技术交流 / 只是想打个招呼——选中 chip 墨黑反白）
  4. `正文 / MESSAGE *`（textarea，5 行，占位提示 "随便写，这里没有字数限制，只有诚意检测（开玩笑的）。"）
- 提交按钮：大号墨黑块 `寄出这封信 →`（纸白字），hover 信号橙填充 wipe
- 提交成功态：表单卡整体"盖章"——信号橙大印章 "RECEIVED / 已收到" 旋转 -12° 盖下（elastic 动画）+ 文字 "信已收到，我会尽快回信。— 陈"（手写感 Noto Serif SC）

**动画**：表单卡 rotate 1.5°→0 落版（0.8s）；字段标签 stagger 0.08s 上浮；focus 下划线 scaleX 0→1。
**交互**：校验失败字段抖动 + 墨线变橙 + mono 错误提示；提交前端模拟成功（无后端，localStorage 记录）。

### 右侧：编辑部信息栏（Paper Dark 底，mono 表格）
- `EMAIL` hi@chenweiyuan.dev（点击复制 + 印章 "COPIED"）
- `GITHUB` github.com/chenweiyuan ↗
- `BLOG / 掘金` juejin.cn/user/chenweiyuan ↗
- `X / TWITTER` @chenweiyuan ↗
- `RSS` chenweiyuan.dev/feed.xml ↗
- 分隔线 + 小地图感装饰：mono "上海 · 静安 / 31.23°N, 121.47°E" + 一个 ASCII 风格坐标点装饰
- 分隔线 + 状态块：绿色脉冲点 + "当前状态：可接远程协作与顾问项目" + mono 小字 "更新时间 2025.03"

**动画**：信息栏从右 60px 滑入；每条链接 stagger 0.07s。
**交互**：链接 hover → 文字变橙 + 箭头右移 6px；社交链接全部新窗口打开。

---

## Section 3 — 常见问题（FAQ 手风琴）

**布局**：纸白底，Section Header `02 — FAQ / 来信前必读`。shadcn Accordion 覆写：每条 = 顶部 1px 墨线 + Noto Serif SC 24px 问题 + 右侧大号 "+"（展开时旋转 45° 变 "×"）。
**问题**（占位）：
1. "你接什么样的项目？" — "有技术挑战或有意思的领域：开发者工具、实时系统、数据可视化。周期 2 周以上的远程协作最佳。"
2. "接全职 offer 吗？" — "长期看机会。比起 title，我更在意团队的技术品味和写作文化。"
3. "可以约线下咖啡吗？" — "上海静安/徐汇一带，工作日下午。手冲优先，连锁免谈（也是开玩笑的）。"
4. "这个网站用什么做的？" — "React + Vite + Tailwind + GSAP，源码在 GitHub 开源，欢迎参考。"

**动画**：进入视口各行 stagger 滑入；展开高度动画 0.4s ease-in-out，"+" 旋转 0.3s。
**交互**：手风琴单开模式。

---

## Section 4 — 页尾整版

**布局**：墨黑整版（衔接 Footer 前）：
- 中央超大：`期待你的来信`（Noto Serif SC 900 纸白）+ Archivo Black 空心 "TALK SOON."
- 周围散落拼贴小件：旋转便签 "P.S. 附上图更好聊"、印章 "REPLY GUARANTEED / 必回"、mono 小注 "*诚意检测通过率 99.7%"

**动画**：标题字符级落下；小件逐个盖印出现（elastic）。

---

## 移动端适配

- 主区单栏（表单上、信息栏下）；FAQ 字号 20px；页尾大字缩至 clamp 下限
