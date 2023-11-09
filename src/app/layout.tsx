import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Providers from "@/components/auth/Providers"
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NavigationMenuDemo } from '@/components/NavBar'
// const inter = Inter({ subsets: ['latin'] })
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
    <html lang="en"
      // className='light'
      suppressHydrationWarning>
      <body className={cn("min-h-screen flex flex-col font-sans antialiased grainy",
        poppins.className
      )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
          storageKey='one-app-theme'
        >
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
