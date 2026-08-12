import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, splitChars, splitWords } from '../lib/anim'
import {
  profile,
  metrics,
  experience,
  skillColumns,
  certificates,
  resumeFileName,
  type Experience,
} from '../lib/data'
import { SectionHeader, Stamp, Tag, InkButton, Tape } from '../components/primitives'

/* ===================== 占位文案 ===================== */
const INTRO_PARAS = [
  '你好，我是陈未远，一名住在上海的全栈工程师。过去六年，我在创业公司和大厂中台之间往返，写过被十万人使用的界面，也写过只有自己用的命令行工具。',
  '我相信工程是一种写作：变量命名是措辞，架构是篇章结构，而 code review 是编辑与作者的切磋。',
  '不写代码的时候，我在维护这个网站、给开源项目提 PR、或者骑着自行车去城市的另一边喝一杯手冲。',
]

interface MetricItem {
  value: number
  suffix: string
  label: string
  decimals?: number
}

const METRICS = metrics as MetricItem[]

/** 计数滚动前的零态占位文本（整数补零到两位，与计数动画一致） */
function metricZero(m: MetricItem): string {
  const d = m.decimals ?? 0
  const base = d > 0 ? (0).toFixed(d) : '0'.padStart(2, '0')
  return `${base}${m.suffix}`
}

/* ===================== S1 人物开篇 ===================== */
function ProfileIntro() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 照片落版
      gsap.from('[data-hero-photo]', { scale: 1.12, rotate: -5, duration: 1, ease: 'power3.out' })
      // 大标题字符级落下
      const title = root.current?.querySelector('[data-hero-title]')
      if (title) {
        const chars = splitChars(title as HTMLElement)
        gsap.from(chars, { y: 60, rotate: 4, opacity: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out' })
      }
      // 英文副题词级落下
      const en = root.current?.querySelector('[data-hero-en]')
      if (en) {
        const words = splitWords(en as HTMLElement)
        gsap.from(words, { y: 24, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'power3.out', delay: 0.2 })
      }
      // 眉题 + 正文 + 状态行 块级上浮
      gsap.from('[data-hero-kicker], [data-hero-para], [data-hero-status]', {
        y: 24, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.35,
      })
      // 印章盖下
      gsap.fromTo('[data-hero-stamp]',
        { scale: 1.6, rotate: -14, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.5, delay: 0.9, ease: 'elastic.out(1, 0.5)' },
      )
      // 照片滚动视差（scrub 用 fromTo）
      gsap.fromTo('[data-hero-photo]', { y: 0 }, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-20 md:pb-28 md:pt-40">
      <div ref={root} className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 md:grid-cols-12 md:px-12">
        {/* 左：肖像 */}
        <div className="md:col-span-5">
          <div data-hero-photo className="relative mx-auto max-w-[460px]" style={{ rotate: '-1.5deg' }}>
            <div className="border-2 border-ink bg-paper p-3 shadow-brutal">
              <img
                src={profile.portraitAbout}
                alt={`${profile.name} 工位工作照`}
                className="photo-editorial aspect-[4/3] w-full object-cover"
              />
            </div>
            <Tape className="-left-3 -top-2 -rotate-6" />
            <Tape className="-right-3 -bottom-2 rotate-3" />
            <div data-hero-stamp className="absolute -bottom-5 -right-3">
              <Stamp rotate={-8} className="!px-4 !py-2">{profile.years} YRS / 从业六年</Stamp>
            </div>
            <p className="mt-6 pr-20 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              fig.02 — 工位现场，2025 春
            </p>
          </div>
        </div>

        {/* 右：人物特稿 */}
        <div className="md:col-span-7">
          <p data-hero-kicker className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">
            VOL.03 — PROFILE / 人物特稿
          </p>
          <h1 data-hero-title className="mt-6 font-serifcn text-[clamp(48px,8vw,110px)] font-black leading-[1.05] text-ink">
            关于陈未远
          </h1>
          <p data-hero-en className="mt-4 font-display text-outline text-[clamp(22px,3.4vw,44px)] uppercase leading-tight">
            THE HUMAN BEHIND THE COMMITS
          </p>
          <div className="mt-8 h-px w-full max-w-xl bg-ink/20" />
          <div className="mt-8 max-w-xl space-y-6 text-[17px] leading-[1.8] text-ink-soft">
            {INTRO_PARAS.map((p, i) => (
              <p key={i} data-hero-para>{p}</p>
            ))}
          </div>
          <div data-hero-status className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink">
            <span><span className="text-signal">LOCATION</span> {profile.location}</span>
            <span><span className="text-signal">TIMEZONE</span> {profile.timezone}</span>
            <span className="flex items-center gap-2">
              <span className="text-signal">STATUS</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S2 数据速览带 ===================== */
function MetricsBand() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 墨黑整版 clip-path 自上而下展开（scrub 用 fromTo；band 即 context root，需用 ref 而非选择器）
      const band = root.current
      if (band) {
        gsap.fromTo(band, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 92%', end: 'top 40%', scrub: true },
        })
      }
      // 大数字计数滚动（尊重 decimals 字段）
      gsap.utils.toArray<HTMLElement>('[data-metric-num]').forEach((el, i) => {
        const m = METRICS[i]
        if (!m) return
        const decimals = m.decimals ?? 0
        const obj = { v: 0 }
        gsap.fromTo(obj, { v: 0 }, {
          v: m.value,
          duration: 1.5,
          ease: 'power2.out',
          delay: i * 0.2,
          onUpdate() {
            let txt: string
            if (decimals > 0) {
              txt = obj.v.toFixed(decimals)
            } else {
              txt = String(Math.round(obj.v)).padStart(2, '0')
            }
            el.textContent = `${txt}${m.suffix}`
          },
          scrollTrigger: { trigger: root.current, start: 'top 30%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-paper">
      <div ref={root} data-band-clip className="relative bg-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-24">
          <div className="grid grid-cols-2 gap-px bg-paper/20 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="group bg-ink px-4 py-8 md:px-8 md:py-10">
                <p
                  data-metric-num
                  className="font-display text-[clamp(56px,8vw,96px)] leading-none text-signal transition-transform duration-300 group-hover:scale-105"
                >
                  {metricZero(m)}
                </p>
                <p className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.14em] text-paper/70 transition-colors duration-300 group-hover:text-signal">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S3 职业经历时间轴 ===================== */
function JobCard({ e }: { e: Experience }) {
  return (
    <div className="border border-ink bg-paper-dark p-6 shadow-brutal-sm md:p-7">
      <p className="font-display text-2xl text-signal md:text-3xl">{e.period}</p>
      <h3 className="mt-1 font-serifcn text-2xl font-black leading-tight text-ink md:text-[30px]">{e.company}</h3>
      <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.14em] text-signal">{e.role}</p>
      <ul className="mt-4 space-y-2">
        {e.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {e.stack && e.stack.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {e.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      )}
    </div>
  )
}

function EduCard({ e }: { e: Experience }) {
  return (
    <div className="border border-dashed border-ink/50 bg-paper p-5 shadow-brutal-sm md:p-6">
      <p className="font-mono2 text-[11px] uppercase tracking-[0.16em] text-signal">EDU — 教育</p>
      <h3 className="mt-2 font-serifcn text-xl font-black leading-tight text-ink md:text-2xl">{e.company}</h3>
      <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.12em] text-ink-soft">{e.period} · {e.role}</p>
      <ul className="mt-3 space-y-1.5">
        {e.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-ink/40" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CareerTimeline() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 中央墨线随 scrub 绘制（fromTo scaleY 0→1）
      gsap.fromTo('[data-tl-line]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 70%', scrub: true },
      })
      // 条目从所属侧滑入
      gsap.utils.toArray<HTMLElement>('[data-tl-card]').forEach((card) => {
        const left = card.classList.contains('tl-left')
        gsap.fromTo(card, { x: left ? -60 : 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        })
      })
      // 节点圆点经过时点亮（scrub）
      gsap.utils.toArray<HTMLElement>('[data-tl-node]').forEach((node) => {
        gsap.fromTo(node, { scale: 0.4, opacity: 0.25 }, {
          scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: node, start: 'top 88%', end: 'top 45%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="career" className="bg-paper py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <SectionHeader no="02" title="职业履历" note="CAREER / 时间轴" />
        <div className="relative mt-10">
          {/* 中央竖向墨线 */}
          <div className="absolute left-6 top-0 h-full w-[2px] -translate-x-1/2 bg-ink/15 md:left-1/2">
            <div data-tl-line className="h-full w-full origin-top bg-ink" />
          </div>
          <div className="space-y-12 md:space-y-16">
            {experience.map((e, i) => {
              const left = i % 2 === 0
              return (
                <div key={e.period} className="relative md:grid md:grid-cols-12">
                  {/* 节点 */}
                  <div className="absolute left-6 top-8 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    {e.current && (
                      <span className="absolute inset-0 block rounded-full border-2 border-signal/60 animate-ping" aria-hidden="true" />
                    )}
                    <span
                      data-tl-node
                      className={`relative block ${
                        e.current
                          ? 'h-4 w-4 rounded-full border-2 border-signal bg-signal'
                          : e.education
                            ? 'h-3 w-3 rotate-45 border-2 border-ink bg-paper'
                            : 'h-4 w-4 rounded-full border-2 border-ink bg-paper'
                      }`}
                    />
                  </div>
                  {/* 卡片 */}
                  <div
                    data-tl-card
                    className={`ml-12 md:ml-0 md:col-span-5 ${
                      left ? 'tl-left md:col-start-1 md:pr-10' : 'tl-right md:col-start-7 md:pl-10'
                    }`}
                  >
                    {e.education ? <EduCard e={e} /> : <JobCard e={e} />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S4 技能矩阵 ===================== */
function SkillsMatrix() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 三列 stagger 上浮
      gsap.from('[data-skill-col]', {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      // 熟练度墨条从 0 生长到 level%（每列一组，stagger）
      gsap.utils.toArray<HTMLElement>('[data-skill-col]').forEach((col) => {
        const bars = Array.from(col.querySelectorAll<HTMLElement>('[data-skill-bar]'))
        if (!bars.length) return
        gsap.fromTo(bars, { scaleX: 0 }, {
          scaleX: (_i: number, target: HTMLElement) => Number(target.dataset.level || 0) / 100,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: col, start: 'top 82%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="relative overflow-hidden bg-ink py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <SectionHeader no="03" title="技能矩阵" note="SKILLS / ARSENAL" dark />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3">
          {skillColumns.map((col, ci) => (
            <div key={col.key} data-skill-col className={ci > 0 ? 'md:border-l md:border-paper/20' : ''}>
              <div className="py-8 md:px-8 md:py-4">
                <p className="font-mono2 text-xs uppercase tracking-[0.18em] text-signal">
                  {col.key} <span className="text-paper/50">/</span> {col.label}
                </p>
                <div className="mt-7 space-y-7">
                  {col.skills.map((s) => {
                    const note = (s as { note?: string }).note
                    return (
                      <div key={s.name} className="group">
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-display text-[clamp(22px,2.6vw,36px)] uppercase leading-none text-paper transition-colors duration-200 group-hover:text-signal">
                            {s.name}
                          </h4>
                          <span className="shrink-0 font-mono2 text-[11px] uppercase tracking-[0.12em] text-paper/50">
                            {s.years}
                          </span>
                        </div>
                        <div className="mt-3 h-1.5 w-full bg-paper/20 md:h-2">
                          <div
                            data-skill-bar
                            data-level={s.level}
                            className="h-full w-full origin-left bg-signal"
                            style={{ transform: 'scaleX(0)' }}
                          />
                        </div>
                        {note && (
                          <p className="mt-2 max-h-0 overflow-hidden font-mono2 text-[11px] uppercase tracking-[0.08em] text-signal opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
                            ※ {note}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== S5 附录：证书 · 下载 ===================== */
function Appendix() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 证书列表行 stagger 滑入
      gsap.from('[data-cert-item]', {
        x: -40, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      // 下载卡 rotate 2°→0 落版
      const card = root.current?.querySelector('[data-download-card]')
      if (card) {
        gsap.fromTo(card, { rotate: 2, opacity: 0.3 }, {
          rotate: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-paper py-24">
      <div ref={root} className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          {/* 左：证书与奖项 */}
          <div className="md:col-span-7">
            <SectionHeader no="04" title="附录" note="APPENDIX / 证书与奖项" />
            <ul className="border-t border-ink/20">
              {certificates.map((c) => (
                <li key={c.name} data-cert-item className="group flex items-baseline gap-6 border-b border-ink/20 py-5">
                  <span className="w-14 shrink-0 font-display text-2xl text-signal md:text-3xl">{c.year}</span>
                  <span className="font-serifcn text-xl font-bold text-ink md:text-2xl">{c.name}</span>
                  <span className="ml-auto font-mono2 text-lg text-signal opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 右：下载简历卡 */}
          <div className="md:col-span-5">
            <div data-download-card className="relative mt-2 border-2 border-ink bg-paper-dark p-8 shadow-brutal md:p-10">
              <Stamp className="absolute -right-3 -top-4" rotate={6}>PDF / A4</Stamp>
              <p className="font-mono2 text-xs uppercase tracking-[0.18em] text-signal">DOWNLOAD / 下载</p>
              <h3 className="mt-4 font-serifcn text-3xl font-black leading-tight text-ink md:text-4xl">拿走这份简历</h3>
              <p className="mt-4 font-mono2 text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                {resumeFileName} — 148KB — 更新于 2025.02
              </p>
              <div className="mt-8">
                <InkButton href="#">下载 PDF ↓</InkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== S6 页尾引导 ===================== */
function NextSection() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = root.current?.querySelector('[data-next-text]')
      if (text) {
        const chars = splitChars(text as HTMLElement)
        gsap.from(chars, {
          y: 30, opacity: 0, stagger: 0.03, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%' },
        })
      }
      gsap.from('[data-next-link]', {
        opacity: 0, x: 40, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
      gsap.fromTo('[data-next-underline]', { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="border-t border-ink/20 bg-paper-dark">
      <div
        ref={root}
        className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-center md:px-12"
      >
        <h2 data-next-text className="font-serifcn text-2xl font-black leading-snug text-ink md:text-[32px]">
          想看看这些经历产出了什么？
        </h2>
        <Link to="/projects" data-next-link className="group relative font-display text-[clamp(28px,5vw,56px)] uppercase leading-none text-signal">
          <span className="relative z-10">
            翻阅作品特辑 <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
          <span data-next-underline className="absolute bottom-[-4px] left-0 h-[3px] w-full origin-left bg-signal" />
        </Link>
      </div>
    </section>
  )
}

/* ===================== 经历页 ===================== */
export default function About() {
  return (
    <div className="relative bg-paper">
      <ProfileIntro />
      <MetricsBand />
      <CareerTimeline />
      <SkillsMatrix />
      <Appendix />
      <NextSection />
    </div>
  )
}
