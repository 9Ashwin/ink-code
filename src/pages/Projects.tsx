import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, ScrollTrigger, splitChars } from '../lib/anim'
import { projects, profile } from '../lib/data'
import type { Project } from '../lib/data'
import { Tag, InkButton, Stamp } from '../components/primitives'
import { Dialog, CloseButton } from '../components/ui'

/* ===================== 类型 / 常量 ===================== */
type FilterCat = '全部' | Project['cat']

const FILTERS: { label: string; cat: FilterCat }[] = [
  { label: '全部', cat: '全部' },
  { label: 'WEB 应用', cat: 'WEB 应用' },
  { label: '开源工具', cat: '开源工具' },
  { label: '移动端', cat: '移动端' },
  { label: '图形与可视化', cat: '图形与可视化' },
]

const totalCount = String(projects.length).padStart(2, '0')

/* ===================== S1 页头刊头 ===================== */
function Header() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 中文大标题：字符级铅字落版
      const zh = root.current?.querySelector('[data-hero-zh]')
      if (zh) {
        const chars = splitChars(zh as HTMLElement)
        gsap.from(chars, {
          y: 50, rotate: 3, opacity: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out',
        })
      }
      // 英文空心行：从右侧 wipe 入
      gsap.fromTo('[data-hero-en]',
        { clipPath: 'inset(0 0 0 100%)' },
        { clipPath: 'inset(0 0 0 0%)', duration: 0.7, ease: 'power2.out', delay: 0.15 },
      )
      // 刊头 mono 行与竖排副注
      gsap.from('[data-hero-vol]', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' })
      gsap.from('[data-hero-note]', { opacity: 0, duration: 0.6, delay: 0.35 })
      // 底部墨线
      gsap.from('[data-hero-rule]', { scaleX: 0, duration: 0.8, ease: 'power2.out', transformOrigin: 'left center', delay: 0.2 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header ref={root} className="relative bg-paper pt-36 md:pt-44">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-12">
        <p data-hero-vol className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">
          VOL.02 — WORKS / 作品特辑
        </p>

        <h1 className="mt-6 leading-none">
          <span data-hero-zh className="block font-serifcn text-[clamp(56px,9vw,120px)] font-black text-ink">
            作品索引
          </span>
        </h1>

        <div className="relative mt-5">
          <span data-hero-en className="block font-display text-outline text-[clamp(30px,5vw,76px)] uppercase leading-[1.08] md:-mr-12">
            Selected Works 2019—2025
          </span>
        </div>

        {/* 右侧竖排 mono 副注 */}
        <p data-hero-note className="vertical-rl absolute right-0 top-6 hidden font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink-soft md:block">
          共 {totalCount} 篇报道
        </p>

        <div data-hero-rule className="mt-12 h-px w-full origin-left bg-ink/20" />
      </div>
    </header>
  )
}

/* ===================== S2 筛选带 ===================== */
function FilterBar({ active, onChange }: { active: FilterCat; onChange: (f: FilterCat) => void }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-filter-item]', {
        y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="border-b border-ink/20 bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 overflow-x-auto px-5 py-4 md:px-12">
        {FILTERS.map((f) => {
          const count = f.cat === '全部' ? projects.length : projects.filter((p) => p.cat === f.cat).length
          const isActive = active === f.cat
          return (
            <button
              key={f.cat}
              data-filter-item
              type="button"
              onClick={() => onChange(f.cat)}
              className={`shrink-0 border px-3 py-1.5 font-mono2 text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                isActive
                  ? 'border-ink bg-ink text-paper'
                  : 'border-transparent text-ink-soft hover:border-ink/40 hover:text-signal'
              }`}
            >
              {f.label} <span className={isActive ? 'text-signal' : 'text-ink-soft/70'}>{String(count).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ===================== S3 作品索引行 ===================== */
function ProjectRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 序号空心 → 实心，跟随滚动进度（scrub 用 fromTo）
      const fill = root.current?.querySelector('[data-num-fill]')
      if (fill) {
        gsap.fromTo(fill, { opacity: 0 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(project)
        }
      }}
      className="group w-full cursor-pointer border-t border-ink/20 py-6 text-left transition-colors duration-300 hover:bg-paper-dark md:py-8"
    >
      {/* 移动端：全宽缩略图置顶 */}
      <div className="mb-4 block overflow-hidden border border-ink md:hidden">
        <img src={project.cover} alt={project.name} className="photo-editorial aspect-[3/2] w-full object-cover" />
      </div>

      <div className="grid grid-cols-12 items-center gap-x-4">
        {/* 大序号（空心，hover 实心信号橙，滚动渐填充） */}
        <span className="relative col-span-3 md:col-span-2">
          <span className="block font-display text-outline text-[44px] leading-none md:text-[72px]">{project.no}</span>
          <span
            data-num-fill
            aria-hidden="true"
            className="absolute inset-0 block font-display text-ink text-[44px] leading-none opacity-0 md:text-[72px]"
          >
            {project.no}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 block font-display text-signal text-[44px] leading-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-[72px]"
          >
            {project.no}
          </span>
        </span>

        {/* 中文名 + mono 英文副题 */}
        <div className="col-span-6 md:col-span-4">
          <h3 className="font-serifcn text-2xl font-black leading-tight text-ink transition-colors duration-300 group-hover:text-signal md:text-[40px] md:leading-none">
            {project.name}
          </h3>
          <p className="mt-1.5 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft md:text-[11px]">
            {project.nameEn}
          </p>
        </div>

        {/* 移动端年份 */}
        <span className="col-span-3 text-right font-mono2 text-lg text-ink md:hidden">{project.year}</span>

        {/* 技术栈 Tags + 年份（桌面） */}
        <div className="col-span-12 mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-4 md:mt-0 md:flex-col md:items-start md:gap-y-3">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
          <span className="hidden font-mono2 text-2xl text-ink md:block">{project.year}</span>
        </div>

        {/* 右侧缩略图（黑白，默认 0.6 透明，hover 全亮） */}
        <div className="hidden md:col-span-2 md:flex md:justify-end">
          <img
            src={project.cover}
            alt=""
            className="photo-editorial h-20 w-32 border border-ink object-cover opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  )
}

/* ===================== S3 作品索引大列表 ===================== */
function ProjectIndex({ items, filter, onOpen }: {
  items: Project[]
  filter: FilterCat
  onOpen: (p: Project) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)

  // 首次进场：各行从 x -40 + opacity 渐次落下
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-proj-row]', {
        x: -40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  // 筛选重排后，刷新各行的 ScrollTrigger 位置（等 layout 动画结束）
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 550)
    return () => window.clearTimeout(id)
  }, [filter])

  return (
    <section className="bg-paper pb-20 pt-2 md:pb-28">
      <div ref={listRef} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <motion.div layout className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: 'easeOut', layout: { duration: 0.5, ease: 'easeOut' } }}
              >
                <div data-proj-row>
                  <ProjectRow project={p} onOpen={onOpen} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex items-center justify-between border-t border-ink/20 pt-5">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            {String(items.length).padStart(2, '0')} / {totalCount} 篇报道
          </p>
          <span className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">点击任意项目 → 查看详情</span>
        </div>
      </div>
    </section>
  )
}

/* ===================== S4 项目详情弹层 ===================== */
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="relative min-h-full bg-paper">
      {/* 顶部 mono 栏 */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink bg-paper px-5 py-3 md:px-12">
        <p className="truncate font-mono2 text-[11px] uppercase tracking-[0.16em] text-ink">
          <span className="text-signal">CASE FILE NO.{project.no}</span>
          <span className="mx-2 text-ink/40">—</span>
          {project.nameEn}
        </p>
        <CloseButton onClose={onClose} />
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-10 md:grid-cols-12 md:px-12 md:py-16">
        {/* 左栏 */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="relative border border-ink shadow-brutal">
              <img src={project.cover} alt={project.name} className="photo-editorial aspect-[3/2] w-full object-cover" />
              <span className="tape absolute -top-2 left-8 h-6 w-20 -rotate-3" aria-hidden="true" />
              {project.stamp && <Stamp className="absolute right-4 top-4" rotate={6}>{project.stamp}</Stamp>}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
          >
            <p className="mt-8 font-mono2 text-[11px] uppercase tracking-[0.14em] text-signal">{project.nameEn}</p>
            <h2 className="mt-2 font-serifcn text-3xl font-black text-ink md:text-[40px] md:leading-none">{project.name}</h2>
            <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink-soft md:text-base">{project.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
          >
            <div className="mt-10 border-t border-ink/20 pt-8">
              <p className="font-mono2 text-xs uppercase tracking-[0.16em] text-ink">挑战与方案 / Challenge &amp; Solution</p>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 font-serifcn text-lg font-bold text-ink">
                    <span className="font-mono2 text-sm text-signal">01</span>挑战
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{project.challenge}</p>
                </div>
                <div>
                  <p className="flex items-center gap-2 font-serifcn text-lg font-bold text-ink">
                    <span className="font-mono2 text-sm text-signal">02</span>方案
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{project.solution}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.18 }}
          >
            <div className="mt-10">
              <p className="mb-4 font-mono2 text-xs uppercase tracking-[0.16em] text-ink">成果数据 / By the Numbers</p>
              <div className="grid grid-cols-3 gap-px border border-ink bg-ink">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-paper px-3 py-6 text-center md:px-4">
                    <p className="font-display text-2xl leading-none text-signal md:text-4xl">{m.value}</p>
                    <p className="mt-3 font-mono2 text-[9px] uppercase tracking-[0.1em] text-ink-soft md:text-[10px]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 右栏 sticky 元信息 */}
        <div className="md:col-span-4 md:col-start-9">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            className="md:sticky md:top-24"
          >
            <div className="border border-ink">
              {([
                ['ROLE', project.role],
                ['YEAR', project.year],
                ['STACK', project.stack.join(' / ')],
                ['TEAM', project.team],
                ['STATUS', project.status],
              ] as const).map(([k, v], i) => (
                <div key={k} className={`flex items-start justify-between gap-4 px-4 py-3 ${i > 0 ? 'border-t border-ink/20' : ''}`}>
                  <span className="shrink-0 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">{k}</span>
                  <span className="text-right font-mono2 text-[11px] uppercase tracking-[0.08em] text-ink">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <InkButton href={profile.githubUrl} className="w-full justify-center">访问线上 ↗</InkButton>
              <InkButton href={profile.githubUrl} className="w-full justify-center">GitHub 仓库 ↗</InkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ===================== S5 页尾引导 ===================== */
function FooterCta() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = root.current?.querySelector('[data-cta-line]')
      if (title) {
        const chars = splitChars(title as HTMLElement)
        gsap.from(chars, {
          y: 40, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      }
      gsap.from('[data-cta-note]', { opacity: 0, y: 16, duration: 0.5, delay: 0.3 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-paper-dark">
      {/* 撕纸边缘过渡 */}
      <div className="torn-bottom h-6 w-full bg-paper" aria-hidden="true" />
      <div ref={root} className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-12 md:pb-32 md:pt-16">
        <p className="font-mono2 text-xs uppercase tracking-[0.18em] text-ink-soft">没找到想看的？</p>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-block font-display text-[clamp(28px,5vw,68px)] uppercase leading-[1.12] text-ink transition-colors duration-300 hover:text-signal"
        >
          <span data-cta-line>去 GitHub 看我的全部开源 →</span>
        </a>
        <p data-cta-note className="mt-5 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          {profile.github} — 每周都在提交
        </p>
      </div>
    </section>
  )
}

/* ===================== 作品页 ===================== */
export default function Projects() {
  const [filter, setFilter] = useState<FilterCat>('全部')
  const [active, setActive] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = filter === '全部' ? projects : projects.filter((p) => p.cat === filter)

  const openProject = (p: Project) => {
    setActive(p)
    setOpen(true)
  }
  const close = () => setOpen(false)

  return (
    <div className="relative bg-paper">
      <Header />
      <FilterBar active={filter} onChange={(f) => setFilter(f)} />
      <ProjectIndex items={filtered} filter={filter} onOpen={openProject} />
      <FooterCta />

      <Dialog open={open} onClose={close}>
        {active && <ProjectDetail project={active} onClose={close} />}
      </Dialog>
    </div>
  )
}
