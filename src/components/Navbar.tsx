import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Mail } from 'lucide-react'
import { navLinks, profile } from '../lib/data'
import { GitHubIcon } from './primitives'

const linkHover = 'relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-ink/20 bg-paper transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-20'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-12">
          {/* 刊头 logo */}
          <NavLink to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-display text-lg tracking-tight text-ink md:text-xl">
              C.W.Y <span className="text-signal">—</span> INK &amp; CODE<sup className="font-mono2 text-[9px]">®</sup>
            </span>
            <span className="hidden font-mono2 text-[10px] uppercase tracking-[0.16em] text-ink-soft/70 md:inline">
              VOL.01 — 2025
            </span>
          </NavLink>

          {/* 桌面导航 */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="主导航">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `font-mono2 text-[11px] uppercase tracking-[0.14em] transition-colors ${linkHover} ${
                    isActive ? 'text-signal' : 'text-ink hover:text-ink'
                  }`
                }
              >
                {l.en}
              </NavLink>
            ))}
          </nav>

          {/* 右侧操作区 */}
          <div className="hidden items-center gap-4 md:flex">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className={linkHover}>
              <GitHubIcon className="h-[18px] w-[18px] text-ink" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="邮箱" className={linkHover}>
              <Mail className="h-[18px] w-[18px] text-ink" />
            </a>
            <span className="flex items-center gap-2 border border-ink/20 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                Open to Work
              </span>
            </span>
          </div>

          {/* 移动端汉堡 */}
          <button
            type="button"
            className="flex flex-col items-end gap-1.5 p-1 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="打开菜单"
          >
            <span className="block h-[2px] w-6 bg-ink" />
            <span className="block h-[2px] w-4 bg-ink" />
          </button>
        </div>
      </header>

      {/* 移动端全屏墨黑抽屉 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col justify-center bg-ink px-8 md:hidden"
            initial={{ opacity: 0, y: '-8%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-8%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <button
              type="button"
              className="absolute right-6 top-6 font-mono2 text-2xl text-paper"
              onClick={() => setOpen(false)}
              aria-label="关闭菜单"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-2" aria-label="移动导航">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.4 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-3"
                  >
                    <span className="font-mono2 text-xs text-signal">0{i + 1}</span>
                    <span className="font-serifcn text-3xl font-black text-paper">{l.label}</span>
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.16em] text-paper/40">{l.en}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
