/**
 * editorial-portfolio-builder — Tailwind 配置片段（墨色杂志编辑风 / Editorial Magazine）
 * 合并进 tailwind.config.js 的 theme.extend；borderRadius 配合 editorial.css 的 :root { --radius: 2px }。
 * 字体需在 HTML 引入 Google Fonts（见 editorial.css 头注释）。
 */
module.exports = {
  colors: {
    paper: "#F4F1EA",        // 纸白 — 全局背景
    "paper-dark": "#E8E3D8", // 米灰 — 次级区块/卡片底
    ink: "#14120E",          // 墨黑 — 主文字、深色区块底
    "ink-soft": "#3A362F",   // 次级文字
    signal: "#FF4D00",       // 信号橙 — 刊号、链接 hover、印章、下划线、游标
    blueprint: "#2B4BD8",    // 蓝图蓝 — 仅代码块/技术标签少量点缀
    // 细线统一用 rgba(20,18,14,0.16)
  },
  borderRadius: {
    // 编辑风：直角或 2px 微圆角。卡片/容器用 1px 墨线边框 + 硬阴影代替柔和阴影
    lg: "var(--radius)", md: "calc(var(--radius) - 1px)", sm: "calc(var(--radius) - 2px)",
  },
  boxShadow: {
    brutal: "4px 4px 0 0 #14120E",      // 印刷拼贴硬阴影
    "brutal-sm": "2px 2px 0 0 #14120E",
    "brutal-signal": "4px 4px 0 0 #FF4D00",
  },
  keyframes: {
    wiggle: { "0%,100%": { transform: "rotate(-2deg)" }, "50%": { transform: "rotate(2deg)" } },
    "pulse-dot": { "0%,100%": { transform: "scale(1)", opacity: "1" }, "50%": { transform: "scale(1.6)", opacity: "0.5" } },
  },
  animation: {
    wiggle: "wiggle 0.4s ease-in-out 3",
    "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
  },
};
