import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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

  const isDashboardPage = pathname.startsWith('/dashboard')
  const isOnboardingPage = pathname.startsWith('/onboarding')

  // Guests can't reach protected pages
  if (!user && (isDashboardPage || isOnboardingPage)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For logged-in users hitting auth pages or protected pages,
  // we need to know their onboarding status to route correctly
  if (user && (isAuthPage || isDashboardPage || isOnboardingPage)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    const onboardingDone = profile?.onboarding_completed ?? false

    // Logged in + hitting login/signup → send to the right place
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(onboardingDone ? '/dashboard' : '/onboarding/details', request.url)
      )
    }

    // Logged in but hasn't finished onboarding → block dashboard access
    if (isDashboardPage && !onboardingDone) {
      return NextResponse.redirect(new URL('/onboarding/details', request.url))
    }

    // Already finished onboarding → don't let them redo it
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