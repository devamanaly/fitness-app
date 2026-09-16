import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ONBOARDING_COOKIE = 'onboarding_done'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/reset-password')

  const isMarketingPage =
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/features') ||
    pathname.startsWith('/contact')

  const isDashboardPage = pathname.startsWith('/dashboard')
  const isOnboardingPage = pathname.startsWith('/onboarding')

  // Guests can't reach protected pages
  if (!user && (isDashboardPage || isOnboardingPage)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && (isAuthPage || isMarketingPage || isDashboardPage || isOnboardingPage)) {
    // Fast path: trust the cookie if we already confirmed onboarding is done.
    // Skips the Supabase query on every dashboard navigation.
    let onboardingDone = request.cookies.get(ONBOARDING_COOKIE)?.value === 'true'

    // Only hit the DB when we don't already know the answer, or when we're
    // on a page that specifically needs a fresh check (auth/onboarding pages).
    if (!onboardingDone || isAuthPage || isOnboardingPage) {
      const { data: onboarding } = await supabase
        .from('onboarding_data')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

      onboardingDone = !!onboarding

      response.cookies.set(ONBOARDING_COOKIE, String(onboardingDone), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day; re-verify periodically
      })
    }

    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(onboardingDone ? '/dashboard' : '/onboarding/details', request.url)
      )
    }

    if (isDashboardPage && !onboardingDone) {
      return NextResponse.redirect(new URL('/onboarding/details', request.url))
    }

    if (isMarketingPage && onboardingDone) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (isOnboardingPage && onboardingDone) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}