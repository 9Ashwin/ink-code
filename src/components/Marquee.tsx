import type { ReactNode } from 'react'

/** 无限滚动的横向文字带；内容会被复制两份以实现无缝循环 */
export function Marquee({ children, reverse = false, className = '' }: {
  children: ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        <div className="flex shrink-0 items-center" aria-hidden="false">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
