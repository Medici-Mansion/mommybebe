import QueryProvier from '@/components/query-provier'
import './globals.css'
import type { Metadata } from 'next'
import { Concert_One } from 'next/font/google'

const inter = Concert_One({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sullivan',
  description: 'AI Word Card Game for Kids with Open AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvier>{children}</QueryProvier>
      </body>
    </html>
  )
}
