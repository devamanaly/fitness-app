'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react'
import '../../globals.css'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError('')

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.name }, // used by the profiles trigger
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // If email confirmation is enabled in Supabase, there's no session yet —
    // send them to verify-email instead of straight into the app.
    if (data.user && !data.session) {
      setCheckEmail(true)
      setLoading(false)
      return
    }

    router.push('/onboarding/avatar')
    router.refresh()
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (oauthError) {
      setError('Google signup failed. Please try again.')
      setLoading(false)
    }
    // On success, Supabase redirects the browser away — no further code runs here.
  }

  if (checkEmail) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-[family-name:var(--font-oswald)] font-semibold tracking-wide mb-2 text-white">
          Check your inbox
        </h1>
        <p className="text-gray-500 text-sm">
          We sent a confirmation link to <span className="text-white">{formData.email}</span>.
          Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-[family-name:var(--font-oswald)] font-semibold tracking-wide text-center mb-2 text-white">
        Create Account
      </h1>
      <p className="text-gray-500 text-center text-sm mb-8">
        Start your fitness journey today
      </p>

      {error && (
        <div className="flex items-center gap-2 bg-red-600/10 border border-red-600/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Google Sign Up */}
      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3.5 rounded-xl font-medium transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {/* Heartbeat pulse divider */}
      <div className="relative my-7 flex items-center justify-center">
        <svg className="w-full h-8" viewBox="0 0 400 32" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pulseGradientSignup" x1="0" y1="0" x2="400" y2="0">
              <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
              <stop offset="35%" stopColor="#52525b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="65%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 16 H150 L162 4 L174 28 L186 8 L196 16 H400"
            stroke="url(#pulseGradientSignup)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="260"
            className="[animation:pulse-draw_1.2s_ease-out_forwards]"
          />
          <circle
            cx="174"
            cy="28"
            r="2.5"
            fill="#ef4444"
            className="text-red-500 [animation:glow-dot_2s_ease-in-out_infinite]"
          />
        </svg>
        <span className="absolute left-1/2 -translate-x-1/2 px-4 bg-[#0d0d0e] text-gray-500 text-[11px] uppercase tracking-widest font-medium">
          or sign up with email
        </span>
      </div>

      {/* Email Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full name
          </label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <label className="flex items-start space-x-2 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            className="w-4 h-4 mt-1 rounded border-gray-700 bg-gray-800 accent-red-600 focus:ring-red-500"
          />
          <span className="text-sm text-gray-400">
            I agree to the{' '}
            <a href="#" className="text-red-500 hover:text-red-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-red-500 hover:text-red-400">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3.5 rounded-xl font-semibold tracking-wide transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-red-500 hover:text-red-400 transition-colors font-medium">
          Login
        </Link>
      </p>
    </div>
  )
}