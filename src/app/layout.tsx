'use client'
import { useEffect } from 'react'
import { Space_Grotesk } from 'next/font/google'
import Lenis from 'lenis'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk' 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <html lang="pt-br">
      <body className={`${spaceGrotesk.variable} antialiased bg-gray-100 text-brand-dark`}>
        {children}
      </body>
    </html>
  )
}