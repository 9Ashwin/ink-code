import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * 全屏弹层（案例报道 / 文章阅读视图用）。
 * 从底部 100vh 上滑进入，Esc / 点击遮罩关闭。样式为编辑杂志风。
 */
export function Dialog({ open, onClose, children }: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-0 overflow-y-auto bg-paper"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 220 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/** 关闭按钮（弹层/阅读视图共用） */
export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="关闭"
      className="group flex h-11 w-11 items-center justify-center border border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      <span className="block text-xl leading-none transition-transform duration-300 group-hover:rotate-90">✕</span>
    </button>
  )
}

/** 手风琴（FAQ 用）：单开模式 */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-ink/20">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serifcn text-xl font-bold text-ink md:text-2xl">
                <span className="mr-3 font-mono2 text-sm text-signal">0{i + 1}</span>
                {it.q}
              </span>
              <span
                className={`shrink-0 font-mono2 text-2xl text-ink transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[15px] leading-relaxed text-ink-soft">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
