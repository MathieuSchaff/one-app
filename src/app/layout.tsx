import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Providers from "@/components/auth/Providers"
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins(
  {
    subsets: ['latin'],
    weight: ["400", "700"],
  },
)
export const metadata: Metadata = {
  title: 'One app',
  description: 'One app to rule them all',
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      href: '/favicon.ico',
      url: '/favicon.ico',
    },
    {
      media: "(prefers-color-scheme: dark)",
      href: '/favicon.ico',
      url: '/favicon.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body className={cn("min-h-screen flex flex-col font-sans antialiased grainy",
        poppins.className
      )}>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
