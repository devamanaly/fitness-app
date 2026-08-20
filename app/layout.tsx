

// import Providers from "./providers";

// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FitJourney AI - Your Personal AI Fitness Coach',
  description: 'Transform your fitness journey with AI-powered personalized coaching',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
      {children}
      </body>
    </html>
  )
}