import { NavLink } from 'react-router-dom'
import { ArrowUp, RssIcon } from 'lucide-react'
import { Marquee } from './Marquee'
import { navLinks, profile } from '../lib/data'
import { GitHubIcon, XIcon } from './primitives'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* 顶部 marquee */}
      <div className="border-b border-paper/15 py-3">
        <Marquee>
          <span className="mx-6 font-mono2 text-xs uppercase tracking-[0.2em] text-paper/70">
            Keep Shipping — 持续交付
          </span>
          <span className="mx-6 font-mono2 text-xs uppercase tracking-[0.2em] text-signal">
            Stay Curious — 保持好奇
          </span>
          <span className="mx-6 font-mono2 text-xs uppercase tracking-[0.2em] text-paper/70">
            In Code We Trust — 相信代码
          </span>
          <span className="mx-6 font-mono2 text-xs uppercase tracking-[0.2em] text-signal">
            Ship It — 先交付再说
          </span>
        </Marquee>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-3 md:px-12">
        {/* 站点地图 */}
        <div>
          <p className="mb-5 font-mono2 text-[11px] uppercase tracking-[0.18em] text-paper/50">Sitemap / 站点地图</p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="font-serifcn text-lg font-bold text-paper/90 transition-colors hover:text-signal">
                  {l.label}
                  <span className="ml-2 font-mono2 text-[10px] uppercase tracking-[0.16em] text-paper/40">{l.en}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* 社交链接 */}
        <div>
          <p className="mb-5 font-mono2 text-[11px] uppercase tracking-[0.18em] text-paper/50">Elsewhere / 其它角落</p>
          <ul className="space-y-3 font-mono2 text-sm">
            <li><a href={profile.githubUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-signal"><GitHubIcon className="h-4 w-4" /> GitHub <span className="text-paper/40 transition-transform group-hover:translate-x-1">↗</span></a></li>
            <li><a href={profile.juejinUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-signal">掘金 <span className="text-paper/40 transition-transform group-hover:translate-x-1">↗</span></a></li>
            <li><a href={profile.xUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-signal"><XIcon className="h-4 w-4" /> X / Twitter <span className="text-paper/40 transition-transform group-hover:translate-x-1">↗</span></a></li>
            <li><a href={`/${profile.rss}`} className="group inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-signal"><RssIcon className="h-4 w-4" /> RSS <span className="text-paper/40 transition-transform group-hover:translate-x-1">↗</span></a></li>
          </ul>
        </div>

        {/* 版权与状态 */}
        <div>
          <p className="mb-5 font-mono2 text-[11px] uppercase tracking-[0.18em] text-paper/50">Colophon / 版权</p>
          <p className="mb-1 text-sm text-paper/70">© 2025 {profile.name} ({profile.nameEn})</p>
          <p className="mb-4 text-xs leading-relaxed text-paper/50">
            Designed &amp; Built by {profile.nameEn}, 2025
            <br />本刊为虚构占位内容，图片素材已做版权水印清理。
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="回到顶部"
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-paper/40 text-paper transition-all duration-300 hover:rotate-[360deg] hover:border-signal hover:text-signal"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 底部巨型出血刊名 */}
      <div className="relative select-none overflow-hidden px-4 pb-4" aria-hidden="true">
        <p className="whitespace-nowrap text-center font-display text-[11vw] uppercase leading-none tracking-tight text-paper/[0.08]">
          Weiyuan.Chen
        </p>
      </div>
    </footer>
  )
}
