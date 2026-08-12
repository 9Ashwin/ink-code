import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { gsap, splitChars } from '../lib/anim'
import { profile, faq } from '../lib/data'
import { SectionHeader, Stamp, InkButton } from '../components/primitives'
import { Accordion } from '../components/ui'

const EN_TEXT = 'SAY HELLO.'
const SUBJECTS = ['项目合作', '全职机会', '技术交流', '只是想打个招呼']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ===================== Section 1 — 页头 ===================== */
function ContactHeader() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cn = root.current?.querySelector('[data-header-cn]')
      if (cn) {
        const chars = splitChars(cn as HTMLElement)
        gsap.from(chars, { y: 60, rotate: 4, opacity: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out' })
      }
      gsap.from('[data-header-note]', { y: 20, opacity: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-40 md:px-12 md:pb-16">
        <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">VOL.05 — CONTACT / 读者来信</p>
        <h1 className="mt-8">
          <span data-header-cn className="block font-serifcn text-[clamp(56px,9vw,120px)] font-black leading-[0.95] text-ink">
            来杯咖啡？
          </span>
          <motion.span
            className="mt-2 block font-display text-[clamp(40px,7vw,92px)] uppercase leading-[1.05] text-signal"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.4 } } }}
            aria-label={EN_TEXT}
          >
            {EN_TEXT.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, y: 34, rotate: 6 },
                  show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 320, damping: 22 } },
                }}
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', stiffness: 420, damping: 15 }}
                className="inline-block cursor-default"
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </motion.span>
        </h1>
        <p data-header-note className="mt-7 font-mono2 text-[11px] uppercase tracking-[0.16em] text-ink-soft md:text-xs">
          通常 24 小时内回信 · 远程协作优先 · 谢绝 KPI 面议
        </p>
      </div>
    </section>
  )
}

/* ===================== 表单字段（抖动 + 错误提示） ===================== */
function Field({ label, required, error, nonce, children }: {
  label: string
  required?: boolean
  error?: string
  nonce: number
  children: ReactNode
}) {
  const controls = useAnimationControls()
  useEffect(() => {
    if (nonce > 0 && error) {
      controls.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4, ease: 'easeInOut' } })
    }
  }, [nonce, error, controls])

  return (
    <motion.div animate={controls} className="group relative">
      <span className="flex items-baseline gap-1.5 font-mono2 text-[10px] uppercase tracking-[0.16em] text-ink-soft">
        {label}
        {required && <span className="text-signal">*</span>}
      </span>
      {children}
      <span className="relative mt-1 block h-px w-full bg-ink/30">
        <span
          className={`absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-300 group-focus-within:scale-x-100 ${
            error ? 'scale-x-100' : ''
          }`}
        />
      </span>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.12em] text-signal"
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ===================== Section 2 — 左：来信表单卡 ===================== */
function LetterForm() {
  const root = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [nonce, setNonce] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (root.current) {
        gsap.from(root.current, {
          rotate: 1.5, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      }
      gsap.from('[data-field]', {
        y: 16, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const clearError = (key: 'name' | 'email' | 'message') =>
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p))

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = '请填写你的名字'
    if (!email.trim()) e.email = '请填写邮箱'
    else if (!EMAIL_RE.test(email.trim())) e.email = '邮箱格式好像不太对'
    if (!message.trim()) e.message = '正文不能留空'
    setErrors(e)
    setNonce((n) => n + 1)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    try {
      localStorage.setItem('letter', JSON.stringify({ name: name.trim(), email: email.trim(), subject, message: message.trim(), ts: Date.now() }))
    } catch { /* 忽略写入失败 */ }
    setSubmitted(true)
  }

  return (
    <div ref={root} className="relative border border-ink bg-paper p-6 shadow-brutal md:p-10">
      <span className="tape absolute -top-3 left-8 z-10 h-6 w-24 -rotate-3" aria-hidden="true" />
      <p className="font-mono2 text-xs uppercase tracking-[0.18em] text-signal">LETTERS TO THE EDITOR — 编辑部收</p>

      <form
        className="mt-8 flex flex-col gap-7"
        noValidate
        inert={submitted}
        onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
      >
        <div data-field>
          <Field label="你的名字 / NAME" required error={errors.name} nonce={nonce}>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError('name') }}
              placeholder="怎么称呼你？"
              className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink-soft/40"
            />
          </Field>
        </div>
        <div data-field>
          <Field label="邮箱 / EMAIL" required error={errors.email} nonce={nonce}>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email') }}
              placeholder="name@example.com"
              className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink-soft/40"
            />
          </Field>
        </div>
        <div data-field>
          <Field label="来意 / SUBJECT" nonce={nonce}>
            <div className="flex flex-wrap gap-2 pt-3">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s === subject ? '' : s)}
                  aria-pressed={subject === s}
                  className={`border px-3 py-1.5 font-mono2 text-xs uppercase tracking-[0.06em] transition-colors duration-200 ${
                    subject === s ? 'border-ink bg-ink text-paper' : 'border-ink/40 text-ink hover:border-signal hover:text-signal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div data-field>
          <Field label="正文 / MESSAGE" required error={errors.message} nonce={nonce}>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => { setMessage(e.target.value); clearError('message') }}
              placeholder="随便写，这里没有字数限制，只有诚意检测（开玩笑的）。"
              className="w-full resize-none bg-transparent py-3 text-base leading-relaxed text-ink outline-none placeholder:text-ink-soft/40"
            />
          </Field>
        </div>

        <div className="mt-2">
          <InkButton onClick={handleSubmit} className="!px-8 !py-4 text-sm">
            寄出这封信 →
          </InkButton>
        </div>
      </form>

      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-paper/90 px-6 text-center"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="rotate-[-12deg] border-4 border-signal px-8 py-4"
          >
            <p className="font-display text-3xl uppercase tracking-[0.06em] text-signal md:text-5xl">Received</p>
            <p className="mt-1 font-serifcn text-xl font-black text-signal">已收到</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-serifcn text-xl font-bold text-ink"
          >
            信已收到，我会尽快回信。— 陈
          </motion.p>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">（演示态，未真实发送）</p>
        </motion.div>
      )}
    </div>
  )
}

/* ===================== Section 2 — 右：编辑部信息栏 ===================== */
function EditorialInfo() {
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (root.current) {
        gsap.from(root.current, {
          x: 60, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      }
      gsap.from('[data-info-row]', {
        x: 20, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => {
      ctx.revert()
      if (copyTimer.current) window.clearTimeout(copyTimer.current)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      if (copyTimer.current) window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch { /* 剪贴板不可用 */ }
  }

  const links = [
    { label: 'GITHUB', value: profile.github, href: profile.githubUrl },
    { label: 'BLOG / 掘金', value: profile.juejin, href: profile.juejinUrl },
    { label: 'X / TWITTER', value: profile.x, href: profile.xUrl },
    { label: 'RSS', value: profile.rss, href: `/${profile.rss}` },
  ]

  return (
    <aside ref={root} className="bg-paper-dark p-6 md:p-8">
      <p className="font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink-soft/70">Editorial Desk / 编辑部</p>

      <div className="mt-5">
        {/* EMAIL（点击复制） */}
        <div data-info-row className="relative flex items-baseline justify-between gap-4 border-b border-ink/15 py-3">
          <span className="font-mono2 text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">EMAIL</span>
          <button type="button" onClick={copyEmail} className="group relative font-mono2 text-xs text-ink transition-colors hover:text-signal">
            {profile.email}
            {copied && (
              <motion.span
                initial={{ scale: 1.5, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                className="absolute -right-3 -top-4"
              >
                <Stamp rotate={0}>COPIED</Stamp>
              </motion.span>
            )}
          </button>
        </div>

        {links.map((l) => (
          <a
            key={l.label}
            data-info-row
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-baseline justify-between gap-4 border-b border-ink/15 py-3"
          >
            <span className="font-mono2 text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">{l.label}</span>
            <span className="flex items-center gap-1.5 font-mono2 text-xs text-ink transition-colors duration-300 group-hover:text-signal">
              {l.value}
              <span className="text-ink-soft/60 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-signal">↗</span>
            </span>
          </a>
        ))}

        {/* 坐标装饰 */}
        <div data-info-row className="border-b border-ink/15 py-5">
          <p className="font-mono2 text-xs uppercase tracking-[0.14em] text-ink">上海 · 静安 / {profile.coords}</p>
          <div className="mt-3 grid w-fit grid-cols-5 gap-1" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 7 ? 'bg-signal' : 'bg-ink/20'}`} />
            ))}
          </div>
        </div>

        {/* 状态块 */}
        <div data-info-row className="pt-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="font-serifcn text-[15px] font-bold text-ink">当前状态：可接远程协作与顾问项目</p>
          </div>
          <p className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">更新时间 2025.03</p>
        </div>
      </div>
    </aside>
  )
}

/* ===================== Section 2 — 主区（12 栏 + 底部墨线） ===================== */
function ContactMain() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-12 md:grid-cols-12 md:gap-8 md:px-12 md:pt-16">
        <div className="md:col-span-7">
          <LetterForm />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <EditorialInfo />
        </div>
      </div>
      <div className="h-px w-full bg-ink/20" aria-hidden="true" />
    </section>
  )
}

/* ===================== Section 3 — FAQ ===================== */
function FaqSection() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqEl = root.current?.querySelector('[data-faq]')
      if (faqEl) {
        const items = Array.from(faqEl.children)
        gsap.from(items, {
          y: 24, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: faqEl, start: 'top 78%' },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-12">
        <SectionHeader no="02" title="FAQ / 来信前必读" note="FREQUENTLY ASKED" />
        <div data-faq className="border-t border-ink/20">
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  )
}

/* ===================== Section 4 — 页尾整版 ===================== */
function ClosingBlack() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cn = root.current?.querySelector('[data-closing-cn]')
      if (cn) {
        const chars = splitChars(cn as HTMLElement)
        gsap.from(chars, {
          y: 40, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      }
      const en = root.current?.querySelector('[data-closing-en]')
      if (en) {
        const chars = splitChars(en as HTMLElement)
        gsap.from(chars, {
          y: 30, opacity: 0, stagger: 0.03, delay: 0.3, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        })
      }
      gsap.from('[data-closing-bit]', {
        scale: 0.5, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-ink">
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 py-32 text-center md:px-12">
        <h2 data-closing-cn className="font-serifcn text-[clamp(56px,9vw,120px)] font-black leading-none text-paper">
          期待你的来信
        </h2>
        <p data-closing-en className="mt-5 font-display text-[clamp(40px,7vw,96px)] uppercase leading-none text-outline-paper">
          TALK SOON.
        </p>

        <div data-closing-bit className="absolute left-6 top-16 -rotate-6 bg-paper px-3 py-2 shadow-brutal-sm md:left-20 md:top-20">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.1em] text-ink">P.S. 附上图更好聊</p>
        </div>
        <div data-closing-bit className="absolute right-8 top-24 hidden md:block">
          <Stamp rotate={10}>REPLY GUARANTEED / 必回</Stamp>
        </div>
        <p data-closing-bit className="absolute bottom-16 left-8 font-mono2 text-[10px] uppercase tracking-[0.16em] text-paper/50 md:left-24">
          *诚意检测通过率 99.7%
        </p>
      </div>
    </section>
  )
}

/* ===================== 联系页 ===================== */
export default function Contact() {
  return (
    <div className="relative bg-paper">
      <ContactHeader />
      <ContactMain />
      <FaqSection />
      <ClosingBlack />
    </div>
  )
}
