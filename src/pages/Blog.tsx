import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, splitChars, splitWords } from '../lib/anim'
import { posts, profile, type Post } from '../lib/data'
import { SectionHeader, Stamp, Tape } from '../components/primitives'
import { Dialog, CloseButton } from '../components/ui'

const CATS = ['全部', '工程实践', '语言与工具', '随想', '翻译'] as const
type Cat = (typeof CATS)[number]

/* ===================== S1 页头 ===================== */
function Header({ cat, onCat }: { cat: Cat; onCat: (c: Cat) => void }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = root.current?.querySelector('[data-h-title]')
      if (title) {
        const chars = splitChars(title as HTMLElement)
        gsap.from(chars, { y: 60, rotate: 4, opacity: 0, stagger: 0.03, duration: 0.9, ease: 'power3.out', delay: 0.1 })
      }
      const eng = root.current?.querySelector('[data-h-eng]')
      if (eng) gsap.from(eng, { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power2.out', delay: 0.2 })
      const quote = root.current?.querySelector('[data-h-quote]')
      if (quote) {
        const words = splitWords(quote as HTMLElement)
        gsap.from(words, { y: 20, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out', delay: 0.3 })
      }
      gsap.from('[data-filter-item]', { y: 20, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.4 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-paper px-5 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">VOL.04 — WRITING / 工程随笔</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
            <h1 data-h-title className="font-serifcn text-[clamp(72px,11vw,150px)] font-black leading-[0.9] text-ink">
              写作
            </h1>
            <span data-h-eng className="pb-3 font-display text-[clamp(28px,4.5vw,64px)] uppercase leading-none text-outline">
              Essays &amp; Notes
            </span>
          </div>
          <p className="font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft md:pb-3">12 篇长文 · 约 8 万字</p>
        </div>
        <p data-h-quote className="mt-10 max-w-2xl font-serifcn text-2xl leading-relaxed text-ink-soft">
          写作是把脑子里纠缠的线团，理成别人能走的路。
        </p>
        <div className="mt-12 flex flex-wrap gap-3 border-y border-ink/20 py-4">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              data-filter-item
              onClick={() => onCat(c)}
              className={`border px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                cat === c ? 'border-ink bg-ink text-paper' : 'border-ink/30 text-ink-soft hover:border-ink hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== S2 头条文章 ===================== */
function FeatureEssay({ post, onOpen }: { post: Post; onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = root.current?.querySelector('[data-feat-img]')
      if (img) {
        gsap.from(img, {
          clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 72%' },
        })
      }
      const title = root.current?.querySelector('[data-feat-title]')
      if (title) {
        const chars = splitChars(title as HTMLElement)
        gsap.from(chars, {
          y: 30, opacity: 0, stagger: 0.03, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 68%' },
        })
      }
      gsap.from('[data-feat-block]', {
        y: 24, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="px-5 pt-16 md:px-12">
      <div ref={root} className="mx-auto grid max-w-[1440px] md:grid-cols-12">
        <button type="button" onClick={onOpen} className="group relative block w-full text-left md:col-span-7">
          <div className="relative overflow-hidden border-2 border-ink bg-paper shadow-brutal" style={{ rotate: '-1deg' }}>
            <img
              src={post.cover}
              alt={post.title}
              data-feat-img
              className="photo-editorial aspect-[7/5] w-full object-cover transition-[filter] duration-500 group-hover:grayscale-0"
            />
            <Tape className="-left-3 -top-2 -rotate-6" />
            <Stamp className="absolute right-4 top-4" rotate={6}>LATEST / 最新</Stamp>
          </div>
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="group flex flex-col justify-center bg-paper-dark p-8 text-left md:col-span-5 md:p-12"
        >
          <span data-feat-block className="font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {post.date} · {post.read} · #{post.cat}
          </span>
          <h2 data-feat-title className="mt-6 font-serifcn text-3xl font-black leading-tight text-ink md:text-[44px]">
            《{post.title}》
          </h2>
          <p data-feat-block className="mt-6 text-[15px] leading-relaxed text-ink-soft">{post.excerpt}</p>
          <span
            data-feat-block
            className="mt-8 inline-flex w-fit items-center gap-2 font-mono2 text-xs uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-signal"
          >
            阅读全文 <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
        </button>
      </div>
    </section>
  )
}

/* ===================== S3 文章网格（筛选联动） ===================== */
function ArticleGrid({ cat, onOpen }: { cat: Cat; onOpen: (id: string) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const visible = cat === '全部' ? posts : posts.filter((p) => p.cat === cat)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-grid-card]', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
      gsap.utils.toArray<HTMLElement>('[data-grid-img]').forEach((img) => {
        const card = img.closest('[data-grid-card]') as HTMLElement | null
        if (!card) return
        gsap.fromTo(img, { yPercent: -4, scale: 1.15 }, {
          yPercent: 4, scale: 1.15, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [cat])

  return (
    <section className="px-5 pt-24 md:px-12">
      <div ref={root} key={cat} className="mx-auto max-w-[1440px]">
        <SectionHeader no="03" title="全部刊文" note={`${visible.length} ESSAYS — 索引`} />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <button
              key={p.id}
              type="button"
              data-grid-card
              onClick={() => onOpen(p.id)}
              className="group border border-ink bg-paper text-left shadow-brutal-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal"
            >
              <div className="relative overflow-hidden border-b border-ink">
                <img
                  src={p.cover}
                  alt={p.title}
                  data-grid-img
                  className="photo-editorial aspect-[3/2] w-full object-cover transition-[filter] duration-500 group-hover:grayscale-0"
                />
                <Tape className="-top-2 left-8 -rotate-3" />
              </div>
              <div className="p-5">
                <p className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">{p.date} · #{p.cat}</p>
                <h3 className="mt-3 font-serifcn text-[26px] font-black leading-snug text-ink transition-colors group-hover:text-signal">
                  《{p.title}》
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                <p className="mt-4 font-mono2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">{p.read}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== S4 文章阅读视图（弹层） ===================== */
function ReaderOverlay({ post, prev, next, onClose, onPrev, onNext }: {
  post: Post
  prev?: Post
  next?: Post
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const root = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [subscribed, setSubscribed] = useState(false)

  const words = post.body.reduce((n, s) => n + s.paragraphs.reduce((m, p) => m + p.length, 0), 0)

  // 进度条 + 滚动容器接管（Dialog 容器为 overflow-y-auto，需要放行 Lenis 并监听滚动）
  useEffect(() => {
    const scroller = root.current?.parentElement as HTMLElement | null
    if (!scroller) return
    scroller.setAttribute('data-lenis-prevent', '')
    const update = () => {
      const max = scroller.scrollHeight - scroller.clientHeight
      const p = max > 0 ? scroller.scrollTop / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
    }
    scroller.scrollTop = 0
    update()
    scroller.addEventListener('scroll', update, { passive: true })
    return () => scroller.removeEventListener('scroll', update)
  }, [post.id])

  return (
    <div ref={root} className="relative min-h-full">
      {/* 顶部固定进度条 */}
      <div className="sticky top-0 z-40 h-[3px] w-full bg-ink/10">
        <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-signal" />
      </div>
      <div className="fixed right-5 top-5 z-40 md:right-8">
        <CloseButton onClose={onClose} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* 文章头 */}
          <div className="mx-auto max-w-4xl px-5 pt-24 md:px-8">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.16em] text-signal">{post.cat} — {post.date}</p>
            <h1 className="mt-6 font-serifcn text-[clamp(40px,7vw,64px)] font-black leading-[1.1] text-ink">
              {post.title.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 40, opacity: 0, rotate: 3 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.08 + i * 0.03, duration: 0.6, ease: 'easeOut' }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
            <p className="mt-5 font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              WORDS {words.toLocaleString('en-US')} / {post.read} / {profile.name} 著
            </p>
          </div>

          {/* 头图 */}
          <div className="mx-auto mt-8 max-w-4xl px-5 md:px-8">
            <div className="h-px w-full bg-ink" />
            <img src={post.cover} alt={post.title} className="photo-editorial mt-8 aspect-[3/2] w-full object-cover" />
          </div>

          {/* 正文 */}
          <div className="article-body mx-auto mt-12 max-w-[720px] px-5 md:px-0">
            {post.body.map((section, si) => (
              <div key={section.title}>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {section.title}
                </motion.h2>
                {section.paragraphs.map((para, pi) => (
                  <motion.p
                    key={pi}
                    className={si === 0 && pi === 0 ? 'dropcap' : undefined}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            ))}
          </div>

          {/* 作者卡 */}
          <div className="mx-auto mt-16 max-w-[720px] px-5 md:px-0">
            <div className="flex flex-col gap-5 border-t border-ink pt-8 sm:flex-row sm:items-center">
              <img
                src={profile.portraitAbout}
                alt={profile.name}
                className="photo-editorial h-16 w-16 shrink-0 rounded-full border border-ink object-cover"
              />
              <div>
                <p className="font-serifcn text-lg font-black text-ink">{profile.name} — {profile.roleZh}，本刊唯一撰稿人</p>
                <p className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  WRITES CODE · WRITES WORDS · {profile.site}
                </p>
              </div>
            </div>
          </div>

          {/* 上一篇 / 下一篇 */}
          <div className="mx-auto mt-14 grid max-w-[720px] grid-cols-2 gap-px border-y border-ink bg-ink">
            <button
              type="button"
              onClick={onPrev}
              disabled={!prev}
              className="bg-paper p-6 text-left transition-colors hover:bg-paper-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">← 上一篇</span>
              <span className="mt-2 block font-serifcn text-lg font-bold leading-snug text-ink line-clamp-2">
                {prev ? `《${prev.title}》` : '已是第一篇'}
              </span>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!next}
              className="bg-paper p-6 text-right transition-colors hover:bg-paper-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="font-mono2 text-[10px] uppercase tracking-[0.14em] text-ink-soft">下一篇 →</span>
              <span className="mt-2 block font-serifcn text-lg font-bold leading-snug text-ink line-clamp-2">
                {next ? `《${next.title}》` : '已是最后一篇'}
              </span>
            </button>
          </div>

          {/* 订阅更新 */}
          <div className="mx-auto mt-14 max-w-[720px] px-5 pb-24 md:px-0">
            <div className="border border-ink p-6">
              {subscribed ? (
                <Stamp rotate={-6}>SUBSCRIBED ✓</Stamp>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubscribed(true) }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <p className="font-mono2 text-[11px] uppercase tracking-[0.14em] text-ink-soft sm:w-28">订阅更新</p>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 border border-ink bg-transparent px-4 py-2.5 font-mono2 text-xs text-ink placeholder:text-ink/40 focus:border-signal focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group relative shrink-0 overflow-hidden border border-ink px-5 py-2.5 font-mono2 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-paper"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-300 ease-out group-hover:translate-x-0" aria-hidden="true" />
                    <span className="relative z-10">订阅</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ===================== S5 订阅带（索引页底部） ===================== */
function SubscribeBand() {
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = root.current?.querySelector('[data-sub-line]')
      if (line) {
        const chars = splitChars(line as HTMLElement)
        gsap.from(chars, {
          y: 40, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        })
      }
      gsap.from('[data-sub-form]', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="mt-28 bg-ink">
      <div ref={root} className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-12">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.2em] text-signal">SUBSCRIBE / 订阅本刊</p>
          <h2 data-sub-line className="mt-4 font-serifcn text-[clamp(28px,4vw,40px)] font-black text-paper">
            每月一封，只有干货。
          </h2>
        </div>
        {done ? (
          <Stamp rotate={-6}>已订阅 ✓</Stamp>
        ) : (
          <form
            data-sub-form
            onSubmit={(e) => { e.preventDefault(); setDone(true) }}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 border border-paper/40 bg-transparent px-4 py-3 font-mono2 text-xs text-paper placeholder:text-paper/40 focus:border-signal focus:outline-none"
            />
            <button
              type="submit"
              className="group relative shrink-0 overflow-hidden border border-paper px-6 py-3 font-mono2 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:text-ink"
            >
              <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-300 ease-out group-hover:translate-x-0" aria-hidden="true" />
              <span className="relative z-10">订阅</span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ===================== 写作页 ===================== */
export default function Blog() {
  const [cat, setCat] = useState<Cat>('全部')
  const [openId, setOpenId] = useState<string | null>(null)
  const feature = posts.find((p) => p.feature)!
  const openPost = openId ? posts.find((p) => p.id === openId) ?? null : null
  const openIndex = openPost ? posts.findIndex((p) => p.id === openPost.id) : -1
  const prev = openIndex > 0 ? posts[openIndex - 1] : undefined
  const next = openIndex >= 0 && openIndex < posts.length - 1 ? posts[openIndex + 1] : undefined

  return (
    <div className="bg-paper">
      <Header cat={cat} onCat={setCat} />
      <FeatureEssay post={feature} onOpen={() => setOpenId(feature.id)} />
      <ArticleGrid cat={cat} onOpen={setOpenId} />
      <SubscribeBand />

      <Dialog open={!!openPost} onClose={() => setOpenId(null)}>
        {openPost && (
          <ReaderOverlay
            post={openPost}
            prev={prev}
            next={next}
            onClose={() => setOpenId(null)}
            onPrev={() => prev && setOpenId(prev.id)}
            onNext={() => next && setOpenId(next.id)}
          />
        )}
      </Dialog>
    </div>
  )
}
