import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import SmoothScroll from './SmoothScroll'

/** 全站布局：Navbar + 内容 + Footer；共享 SmoothScroll 与自定义光标 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-paper text-ink antialiased">
      <CustomCursor />
      <SmoothScroll />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}
