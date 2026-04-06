import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import '../styles/globals.css'
import { Nav } from '@/components/Nav'
import { Providers } from '@/components/Providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AdStudio — AI Ad Creation',
  description: 'Turn any website URL into a polished video ad in seconds. AI-powered ad creation for modern brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Nav />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
