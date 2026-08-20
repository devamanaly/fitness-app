// app/layout.js
import { Inter } from 'next/font/google'
import './../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FitJourney AI - Your Personal AI Fitness Coach',
  description: 'Transform your fitness journey with AI-powered personalized coaching, adaptive plans, and habit-building guidance.',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}