import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, splitChars, splitWords } from '../lib/anim'
import { profile, featuredProjects, stackRows, experience, posts } from '../lib/data'
import { SectionHeader, Stamp, Tag, InkButton } from '../components/primitives'
import { Marquee } from '../components/Marquee'

const today = new Date()
const DATE_LINE = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][today.getDay()]}`

/* ===================== 开刊动画 ===================== */
function OpeningOverlay() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 750)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink"
          exit={{ clipPath: 'inset(0 50% 0 50%)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <span className="font-mono2 text-xs uppercase tracking-[0.3em] text-paper/70">INK &amp; CODE — VOL.01</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ===================== S0 顶刊头条 ===================== */
function TickerStrip() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { yPercent: -100, duration: 0.4, ease: 'ease-out', delay: 0.8 })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className="relative border-b border-ink/20 bg-paper">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-5 font-mono2 text-[10px] uppercase tracking-[0.16em] md:px-12">
        <span className="text-ink-soft/80">Vol.01 / 2025 春 · 总第 001 期</span>
        <span className="hidden text-ink-soft md:inline">{DATE_LINE}</span>
        <span className="flex items-center gap-2 text-ink">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Open to Work
        </span>
      </div>
    </div>
  )
}

/* ===================== S1 Hero 封面 ===================== */
function Hero() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 刊名三行字符级落下
      gsap.utils.toArray<HTMLElement>('[data-hero-line]').forEach((el, i) => {
        const chars = splitChars(el)
        gsap.from(chars, {
          y: 60, rotate: 4, opacity: 0, stagger: 0.035, delay: 0.2 + i * 0.15,
          duration: 0.9, ease: 'power3.out',
        })
      })
      // 定位语
      gsap.from('[data-hero-tag]', { y: 20, opacity: 0, duration: 0.6, delay: 1.0 })
      // 照片落版
      gsap.from('[data-hero-photo]', { scale: 1.15, rotate: -6, duration: 1, delay: 0.5, ease: 'power3.out' })
      // 印章盖下（fromTo）
      gsap.fromTo('[data-hero-stamp]',
        { scale: 1.6, rotate: -14, opacity: 0 },
        { scale: 1, rotate: -8, opacity: 1, duration: 0.5, delay: 1.3, ease: 'elastic.out(1, 0.5)' },
      )
      // 便签 / 标签浮现
      gsap.from('[data-hero-note]', { y: 16, opacity: 0, duration: 0.5, delay: 1.4, stagger: 0.1 })

      // 滚动视差（scrub 用 fromTo）
      gsap.fromTo('[data-hero-name]', { y: 0 }, {
        y: -90, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.fromTo('[data-hero-photo]', { y: 0 }, {
        y: -50, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-paper">
      {/* 背景超大空心字 */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none" aria-hidden="true">
        <span className="font-display text-[22vw] uppercase leading-none text-ink/[0.05]">Engineer</span>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-12">
        {/* 左：刊名 */}
        <div className="md:col-span-7">
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal" data-hero-tag>
            Issue 001 — Portfolio
          </p>
          <h1 className="mt-6 leading-[0.95]" data-hero-name>
            <div className="font-serifcn text-[clamp(72px,10vw,150px)] font-black text-ink" data-hero-line>陈未远</div>
            <div className="font-display text-outline text-[clamp(72px,10vw,150px)] uppercase leading-[1.05]" data-hero-line>Chen</div>
            <div className="font-display text-[clamp(72px,10vw,150px)] uppercase leading-[1.05] text-ink" data-hero-line>
              Wei<span className="text-signal">yuan</span>
            </div>
          </h1>
          <p className="mt-6 font-mono2 text-sm uppercase tracking-[0.12em] text-ink-soft" data-hero-tag>
            {profile.role} — {profile.roleZh} / {profile.tagline}
          </p>
        </div>

        {/* 右：照片 */}
        <div className="relative md:col-span-5">
          <div className="relative mx-auto max-w-[420px]" data-hero-photo style={{ rotate: '-2deg' }}>
            <div className="border-2 border-ink bg-paper p-3 shadow-brutal">
              <img src={profile.portraitHero} alt={`${profile.name} 肖像`} className="photo-editorial aspect-[3/4] w-full object-cover" />
              <p className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">fig.01 — 本刊主角，摄于工位</p>
            </div>
            <span className="tape absolute -left-3 -top-2 h-6 w-20 -rotate-6" aria-hidden="true" />
            <span data-hero-stamp className="absolute -bottom-4 -right-3">
              <Stamp className="!px-4 !py-2" rotate={-8}>EST. 2019 / 从业六年</Stamp>
            </span>
          </div>
          {/* 便签 */}
          <div data-hero-note className="absolute -left-6 top-10 hidden rotate-3 bg-paper-dark p-3 shadow-brutal-sm md:block">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.1em] text-ink">TODO: ship something great →</p>
          </div>
          <p data-hero-note className="absolute -right-2 bottom-16 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            based in Shanghai / UTC+8
          </p>
        </div>
      </div>

      {/* 底部 marquee */}
      <div className="relative border-t border-ink/20">
        <Marquee>
          {['TYPESCRIPT', 'REACT', 'NODE.JS', 'RUST', '开源贡献者', 'OPEN SOURCE'].map((t, i) => (
            <span key={t} className={`mx-6 flex items-center gap-6 font-display text-[clamp(28px,5vw,48px)] uppercase ${i % 2 ? 'text-outline' : 'text-ink/20'}`}>
              {t}<span className="text-signal">●</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

/* ===================== S2 目录条 ===================== */
function ContentsStrip() {
  const root = useRef<HTMLDivElement>(null)
  const items = [
    { no: '01', zh: '精选作品', en: 'WORKS', to: '#featured' },
    { no: '02', zh: '技术栈', en: 'STACK', to: '#stack' },
    { no: '03', zh: '职业经历', en: 'CAREER', to: '#career' },
    { no: '04', zh: '写作', en: 'WRITING', to: '#writing' },
    { no: '05', zh: '联系', en: 'CONTACT', to: '/contact' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-contents-item]', {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-ink">
      <div ref={root} className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-5 py-14 md:grid-cols-5 md:px-12">
        {items.map((it) => (
          <a
            key={it.no}
            data-contents-item
            href={it.to}
            className="group flex flex-col gap-1 py-4 pr-4 transition-colors hover:bg-paper md:border-r md:border-paper/20 md:px-6 md:py-0"
          >
            <span className="font-mono2 text-sm text-signal">{it.no}</span>
            <span className="font-serifcn text-2xl font-black text-paper transition-colors group-hover:text-ink">{it.zh}</span>
            <span className="font-mono2 text-[10px] uppercase tracking-[0.16em] text-paper/50 transition-all group-hover:translate-x-1 group-hover:text-ink">
              {it.en} →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ===================== S3 精选作品（横向卷动 pin） ===================== */
function FeaturedWorks() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!track.current) return
      const distance = () => track.current!.scrollWidth - window.innerWidth
      gsap.fromTo(track.current, { x: 0 }, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
      // 刊号数字 scale 联动（scrub fromTo）
      gsap.utils.toArray<HTMLElement>('[data-feat-no]').forEach((el) => {
        gsap.fromTo(el, { scale: 2 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'left 80%', end: 'left 30%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="featured" className="overflow-hidden bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-12">
        <SectionHeader no="02" title="精选作品" note="SCROLL → 横向翻阅" />
      </div>
      <div ref={root} className="relative">
        <div ref={track} className="flex w-max items-start gap-10 px-5 pb-24 md:px-12">
          {featuredProjects.map((p, i) => (
            <Link
              to="/projects"
              key={p.id}
              className={`group relative block w-[82vw] shrink-0 md:w-[60vw] ${i % 2 ? 'md:translate-y-14' : ''}`}
            >
              <div className="relative">
                <span data-feat-no className="absolute -left-2 -top-8 z-10 font-display text-[120px] leading-none text-signal">
                  {p.no}
                </span>
                <div className="overflow-hidden border border-ink bg-paper shadow-brutal">
                  <img
                    src={p.cover}
                    alt={p.name}
                    className="photo-editorial aspect-[3/2] w-full object-cover transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
                  />
                </div>
                <span className="tape absolute -top-2 left-8 h-6 w-20 -rotate-3" aria-hidden="true" />
              </div>
              <div className="mt-4 border-t border-ink pt-3">
                <h3 className="font-serifcn text-3xl font-black text-ink md:text-[40px]">{p.name}</h3>
                <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">{p.nameEn}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-mono2 text-[11px] text-ink-soft">{p.desc}</p>
                  <span className="vertical-rl hidden font-mono2 text-[10px] uppercase tracking-[0.14em] text-signal md:block">ROLE: {p.role}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== S4 技术栈整版（黑版 pin） ===================== */
function StackShowcase() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-stack-row]')
      rows.forEach((row) => {
        gsap.fromTo(row, { opacity: 0.15 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: row, start: 'top 75%', end: 'top 40%', scrub: true,
          },
        })
        gsap.fromTo(row.querySelectorAll('[data-stack-word]'), { letterSpacing: '0.2em' }, {
          letterSpacing: '0em', ease: 'none',
          scrollTrigger: {
            trigger: row, start: 'top 75%', end: 'top 40%', scrub: true,
          },
        })
      })
      // 底部进度线
      gsap.fromTo('[data-stack-progress]', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="stack" className="relative bg-ink py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="flex items-end justify-between">
          <SectionHeader no="03" title="每天都在用的工具" note="ARSENAL" dark />
          <span className="hidden font-display text-outline-paper text-[10vw] uppercase leading-none md:block" aria-hidden="true">Arsenal</span>
        </div>
        <div className="mt-8 flex flex-col gap-10">
          {stackRows.map((row) => (
            <div key={row.cat} data-stack-row className="border-t border-paper/15 pt-6">
              <p className="mb-3 font-mono2 text-xs uppercase tracking-[0.18em] text-signal">{row.cat}</p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                {row.items.map((w) => (
                  <span key={w} data-stack-word className="font-display text-[clamp(28px,5vw,64px)] uppercase leading-none text-paper transition-colors duration-200 hover:text-signal">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 h-[3px] w-full bg-paper/20">
          <div data-stack-progress className="h-full w-full origin-left bg-signal" />
        </div>
      </div>
    </section>
  )
}

/* ===================== S5 职业经历摘要 ===================== */
function CareerSummary() {
  const root = useRef<HTMLDivElement>(null)
  const rows = experience.filter((e) => !e.education)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-career-row]', {
        x: -60, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="career" className="bg-paper py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="flex items-end justify-between">
          <SectionHeader no="04" title="履历节选" />
          <Link to="/about" className="mb-12 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink hover:text-signal">
            完整简历 →
          </Link>
        </div>
        <div className="border-y border-ink/20">
          {rows.map((r) => (
            <Link
              to="/about"
              key={r.period}
              data-career-row
              className="group grid items-center gap-2 border-b border-ink/20 py-6 transition-colors last:border-b-0 hover:bg-paper-dark md:grid-cols-12"
            >
              <span className="font-display text-2xl text-signal md:col-span-3">{r.period}</span>
              <span className="font-serifcn text-2xl font-bold text-ink md:col-span-4">
                {r.company} <span className="font-mono2 text-xs uppercase tracking-[0.1em] text-ink-soft">· {r.role}</span>
              </span>
              <span className="text-sm text-ink-soft md:col-span-4">{r.points[0]}</span>
              <span className="hidden justify-end font-mono2 text-xl text-ink-soft transition-all group-hover:translate-x-2 group-hover:text-signal md:col-span-1 md:flex">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== S6 卷首语 ===================== */
function EditorsNote() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-note-img]', { y: 30 }, {
        y: -30, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      const quote = root.current?.querySelector('[data-note-quote]')
      if (quote) {
        const words = splitWords(quote as HTMLElement)
        gsap.from(words, {
          y: 20, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-paper">
      <div ref={root} className="mx-auto grid max-w-[1440px] md:grid-cols-12">
        <div className="relative overflow-hidden md:col-span-7">
          <img src={profile.collage} alt="工作台俯拍" data-note-img className="photo-editorial h-full min-h-[320px] w-full object-cover" />
          <span className="tape absolute left-6 top-6 h-6 w-20 rotate-3" aria-hidden="true" />
        </div>
        <div className="flex flex-col justify-center bg-paper-dark p-8 md:col-span-5 md:p-16">
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">Editor's Note / 卷首语</p>
          <p className="relative mt-6 font-serifcn text-2xl font-bold leading-snug text-ink md:text-[28px]" data-note-quote>
            <span className="absolute -left-5 top-0 font-serifcn text-6xl text-signal/60" aria-hidden="true">「</span>
            好的工程和好的杂志一样——结构清晰、细节讲究、读起来有节奏。
          </p>
          <p className="mt-6 font-mono2 text-xs uppercase tracking-[0.12em] text-ink-soft">— {profile.name} / 本刊唯一撰稿人</p>
          <div className="mt-8">
            <Link to="/about">
              <InkButton>认识这位工程师 →</InkButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S7 最新写作 ===================== */
function LatestWriting() {
  const root = useRef<HTMLDivElement>(null)
  const feature = posts.find((p) => p.feature)!
  const rest = posts.filter((p) => !p.feature).slice(0, 2)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const head = root.current?.querySelector('[data-post-head-img]')
      if (head) {
        gsap.from(head, {
          clipPath: 'inset(0 100% 0 0)', duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      }
      const title = root.current?.querySelector('[data-post-head-title]')
      if (title) {
        const chars = splitChars(title as HTMLElement)
        gsap.from(chars, {
          y: 30, opacity: 0, stagger: 0.03, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        })
      }
      gsap.from('[data-post-mini]', {
        x: 40, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="writing" className="bg-paper py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="flex items-end justify-between">
          <SectionHeader no="05" title="最新刊文" />
          <Link to="/blog" className="mb-12 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink hover:text-signal">
            全部文章 →
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-12">
          {/* 头条 */}
          <Link to="/blog" className="group relative md:col-span-7">
            <div className="relative overflow-hidden border border-ink">
              <img src={feature.cover} alt={feature.title} data-post-head-img className="photo-editorial aspect-[3/2] w-full object-cover transition-[filter] duration-500 group-hover:grayscale-0" />
              <span className="tape absolute -top-2 left-10 h-6 w-20 -rotate-2" aria-hidden="true" />
            </div>
            <Stamp className="absolute right-4 top-4" rotate={6}>Editor's Pick</Stamp>
            <h3 data-post-head-title className="mt-5 font-serifcn text-3xl font-black text-ink transition-colors group-hover:text-signal md:text-4xl">
              《{feature.title}》
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{feature.excerpt}</p>
            <p className="mt-3 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {feature.date} · {feature.read} · #{feature.cat}
            </p>
          </Link>
          {/* 右侧两篇 */}
          <div className="flex flex-col gap-8 md:col-span-5">
            {rest.map((p) => (
              <Link to="/blog" key={p.id} data-post-mini className="group flex gap-4 border-b border-ink/20 pb-6">
                <img src={p.cover} alt={p.title} className="photo-editorial h-20 w-28 shrink-0 border border-ink object-cover transition-[filter] duration-500 group-hover:grayscale-0" />
                <div>
                  <h4 className="font-serifcn text-lg font-bold leading-snug text-ink transition-colors group-hover:text-signal">
                    《{p.title}》
                  </h4>
                  <p className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">{p.date} · {p.read}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S8 联系 CTA ===================== */
function CtaSection() {
  const root = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = root.current?.querySelector('[data-cta-line]')
      if (line) {
        const chars = splitChars(line as HTMLElement)
        gsap.from(chars, {
          y: 40, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      }
      gsap.from('[data-cta-memo]', {
        scale: 0.6, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }

  return (
    <section className="relative overflow-hidden bg-ink">
      <div ref={root} className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-28 text-center md:px-12">
        <h2 className="font-serifcn text-[clamp(48px,8vw,110px)] font-black leading-none text-paper" data-cta-line>
          有项目想聊聊？
        </h2>
        <Link to="/contact" className="group mt-4 font-display text-[clamp(40px,8vw,100px)] uppercase leading-none text-signal">
          Let's Talk <span className="inline-block transition-transform group-hover:-translate-y-2">→</span>
        </Link>
        <button
          type="button"
          onClick={copy}
          className="mt-8 font-mono2 text-xs uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-signal"
        >
          {profile.email} — 通常在 24 小时内回信 · 接受远程协作
          {copied && <Stamp className="ml-3" rotate={-6}>Copied</Stamp>}
        </button>
        <div className="mt-14 grid gap-6 font-mono2 text-[10px] uppercase tracking-[0.16em] text-paper/50 md:grid-cols-3">
          <span data-cta-memo className="rotate-[-3deg] border border-paper/30 px-3 py-2">No Boring Projects / 有趣优先</span>
          <span data-cta-memo className="rotate-[2deg] border border-paper/30 px-3 py-2">回复率 98%</span>
          <span data-cta-memo className="rotate-[-1deg] border border-paper/30 px-3 py-2">GMT+8 在线</span>
        </div>
      </div>
    </section>
  )
}

/* ===================== 首页 ===================== */
export default function Home() {
  return (
    <div className="relative bg-paper">
      <OpeningOverlay />
      <TickerStrip />
      <Hero />
      <ContentsStrip />
      <FeaturedWorks />
      <StackShowcase />
      <CareerSummary />
      <EditorsNote />
      <LatestWriting />
      <CtaSection />
    </div>
  )
}
