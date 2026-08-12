import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/anim'

/** Lenis 平滑滚动 + GSAP ScrollTrigger 桥接 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
