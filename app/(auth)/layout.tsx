import Link from 'next/link'
import { ArrowLeft, Dumbbell } from 'lucide-react'
import { Oswald, Inter } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

 function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${oswald.variable} ${inter.variable} min-h-screen bg-[#060606] flex flex-col relative overflow-hidden font-[family-name:var(--font-inter)]`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px]" />

      {/* Faint diagonal texture, like gym floor tape */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative p-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm">Back to home</span>
        </Link>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md [animation:fade-in-up_0.7s_ease-out]">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-800 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-[family-name:var(--font-oswald)] font-semibold tracking-wide bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                FITJOURNEY AI
              </span>
            </Link>
          </div>

          <div className="relative bg-gradient-to-b from-[#111113] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/60">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AuthLayout