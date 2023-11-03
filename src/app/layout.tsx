import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Providers from "@/components/auth/Providers"
import Header from '@/components/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body className={cn("min-h-screen flex flex-col font-sans antialiased grainy",
        inter.className
      )}>
        <Header />
        {/* <Providers> */}
        {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}
