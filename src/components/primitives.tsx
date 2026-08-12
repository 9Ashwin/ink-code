import type { ReactNode } from 'react'

/** Section Header：mono 编号 + 信号橙短横线 + 大标题 + 可选右侧副注 */
export function SectionHeader({ no, title, note, dark = false }: {
  no: string
  title: string
  note?: string
  dark?: boolean
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono2 text-xs tracking-[0.14em] uppercase">
        <span className={dark ? 'text-signal' : 'text-signal'}>{no} —</span>
        <span className={`inline-block h-px w-10 ${dark ? 'bg-paper/40' : 'bg-ink/40'}`} />
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 className={`font-serifcn text-3xl font-black leading-tight md:text-5xl ${dark ? 'text-paper' : 'text-ink'}`}>
          {title}
        </h2>
        {note && (
          <p className={`font-mono2 text-[11px] tracking-[0.12em] uppercase ${dark ? 'text-paper/60' : 'text-ink-soft/70'}`}>
            {note}
          </p>
        )}
      </div>
    </div>
  )
}

/** Stamp 印章：信号橙描边 + 旋转，用于 FEATURED / NEW / OPEN SOURCE 等 */
export function Stamp({ children, rotate = -8, className = '' }: {
  children: ReactNode
  rotate?: number
  className?: string
}) {
  return (
    <span
      className={`inline-block select-none border-2 border-signal px-3 py-1 font-mono2 text-[10px] font-bold uppercase tracking-[0.18em] text-signal ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  )
}

/** Tag 技术标签：mono 小字 + 1px 墨线描边胶囊 */
export function Tag({ children, dark = false, className = '' }: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 font-mono2 text-[10px] uppercase tracking-[0.1em] ${
        dark ? 'border-paper/40 text-paper/80' : 'border-ink/40 text-ink-soft'
      } ${className}`}
    >
      {children}
    </span>
  )
}

/** Tape 胶带：半透明米色贴条，用于贴住图片角 */
export function Tape({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className={`tape absolute z-10 h-6 w-20 ${className}`}
      style={style}
    />
  )
}

/** Halftone 半调网点区块 */
export function Halftone({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`halftone ${className}`} />
}

/** GitHub 品牌图标（lucide 已移除品牌图标，内联官方 path） */
export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.07.8 2.16v3.2c0 .31.21.68.8.56A11.01 11.01 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

/** X（Twitter）品牌图标 */
export function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/** 墨线描边按钮：hover 墨块从左 wipe 填充反白 */
export function InkButton({ children, href, onClick, className = '' }: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}) {
  const cls = `group relative inline-flex items-center gap-2 overflow-hidden border border-ink bg-transparent px-6 py-3 font-mono2 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-paper ${className}`
  const wipe = (
    <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-300 ease-out group-hover:translate-x-0" aria-hidden="true" />
  )
  const content = <span className="relative z-10">{children}</span>
  if (href) {
    return (
      <a href={href} className={cls}>
        {wipe}
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {wipe}
      {content}
    </button>
  )
}
