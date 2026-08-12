import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * 字符级拆分（替代 GSAP SplitText）。
 * 把元素文本拆成 inline-block 的字符 span（空格保留为普通空白节点）。
 * 返回拆分出的 span 数组，供字符级"铅字落版"动画使用。
 */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  const chars: HTMLElement[] = []
  for (const ch of text) {
    if (ch === ' ') {
      el.appendChild(document.createTextNode(' '))
      continue
    }
    const span = document.createElement('span')
    span.textContent = ch
    span.style.display = 'inline-block'
    span.style.willChange = 'transform'
    el.appendChild(span)
    chars.push(span)
  }
  return chars
}

/** 词级拆分（副标题、引言）。单词用 margin-right 分隔。 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  const words: HTMLElement[] = []
  text.split(/\s+/).filter(Boolean).forEach((w) => {
    const span = document.createElement('span')
    span.textContent = w
    span.style.display = 'inline-block'
    span.style.marginRight = '0.3em'
    span.style.willChange = 'transform'
    el.appendChild(span)
    words.push(span)
  })
  return words
}

/**
 * 铅字落版进场：字符 y/rotate/opacity 落下。
 * 仅用于进场（非 scrub），可安全用 from()。
 */
export function letterpress(target: HTMLElement, opts: {
  y?: number; rotate?: number; stagger?: number; delay?: number; duration?: number
} = {}) {
  const { y = 60, rotate = 4, stagger = 0.03, delay = 0, duration = 0.9 } = opts
  const chars = splitChars(target)
  if (!chars.length) return
  gsap.from(chars, { y, rotate, opacity: 0, stagger, delay, duration, ease: 'power3.out' })
}

/**
 * 计数滚动动画（数字从 0 到终值）。
 * 用法：gsap.to 由调用方在 ScrollTrigger 内触发；此处直接提供从 0 计数的 timeline。
 */
export function countTo(target: HTMLElement, end: number, opts: { duration?: number; prefix?: string; suffix?: string } = {}) {
  const { duration = 1.5, prefix = '', suffix = '' } = opts
  const obj = { v: 0 }
  return gsap.fromTo(obj, { v: 0 }, {
    v: end, duration, ease: 'power2.out',
    onUpdate() {
      target.textContent = `${prefix}${Math.round(obj.v)}${suffix}`
    },
  })
}
