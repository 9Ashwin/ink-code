import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * 自定义杂志光标：16px 信号橙圆点 + 36px 描边圆环跟随。
 * hover 可点击元素时圆环放大至 64px 并显示 mono 小字（VIEW / READ / OPEN）。
 * 移动端（无细指针）自动禁用。
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hoverLabel, setHoverLabel] = useState('')
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 })
  const ringY = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, [data-cursor]')
      if (t) {
        const label = (t as HTMLElement).dataset.cursor
        setHoverLabel(label ?? (t.matches('a') ? 'OPEN' : 'GO'))
      } else {
        setHoverLabel('')
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mx, my])

  if (!enabled) return null

  return (
    <>
      {/* 隐藏系统光标由 CSS 控制；这里渲染两个跟随层 */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
        style={{ x: mx, y: my }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full border border-signal/70"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoverLabel ? 64 : 36,
          height: hoverLabel ? 64 : 36,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {hoverLabel && (
          <span className="font-mono2 text-[9px] font-bold tracking-[0.14em] text-signal">
            {hoverLabel}
          </span>
        )}
      </motion.div>
    </>
  )
}
