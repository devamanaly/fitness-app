/* eslint-disable react-hooks/set-state-in-effect */
// app/(dashboard)/layout.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Dumbbell, 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  User,
  TrendingUp,
  Utensils,
  Home,
  ChevronLeft,
  ChevronRight,
  Flame,
  Trophy,
  Target
} from 'lucide-react'
import { logout } from '@/hooks/logout'
import { Loader } from '@/components/Ui/Loader'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workouts', href: '/dashboard/workouts', icon: Dumbbell },
  { name: 'Nutrition', href: '/dashboard/nutrition', icon: Utensils },
  { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'AI Coach', href: '/dashboard/coach', icon: MessageSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null,
  membership: 'Premium Member',
  streak: 15,
  notifications: [
    { id: 1, title: 'Workout reminder', message: 'Your workout starts in 30 minutes', time: '5 min ago' },
    { id: 2, title: 'Streak milestone', message: 'You reached a 15-day streak!', time: '2 hours ago' },
    { id: 3, title: 'AI Coach tip', message: 'Try increasing your water intake today', time: '5 hours ago' },
  ]
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isRouteLoading, setIsRouteLoading] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Route change loading
  useEffect(() => {
    setIsRouteLoading(true)
    const timer = setTimeout(() => {
      setIsRouteLoading(false)
    }, 500) // Simulate loading time

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    setSidebarOpen(false)
    setUserMenuOpen(false)
    setNotificationOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      alert('Failed to log out. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full
        bg-[#0d0d0e] border-r border-white/[0.06]
        transform transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between p-4 border-b border-white/[0.06] ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
            <Link href="/dashboard" className={`flex items-center space-x-3 ${sidebarCollapsed ? 'lg:space-x-0' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30 shrink-0">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div className={`${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                <span className="text-lg font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                  FitJourney
                </span>
                <p className="text-[10px] text-gray-600 uppercase tracking-wider">AI Coach</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block text-gray-400 hover:text-white"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={sidebarCollapsed ? item.name : ''}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group relative
                    ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}
                    ${isActive 
                      ? 'bg-red-600/10 text-red-500 border border-red-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-red-500' : ''}`} />
                  <span className={`font-medium ${sidebarCollapsed ? 'lg:hidden' : ''}`}>{item.name}</span>
                  {isActive && !sidebarCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full" />
                  )}
                  {isActive && sidebarCollapsed && (
                    <div className="absolute right-0 w-1 h-6 bg-red-500 rounded-l-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Streak Card */}
          {!sidebarCollapsed && (
            <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-red-600/20 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm font-bold text-white">{mockUser.streak} Day Streak</p>
                  <p className="text-[10px] text-gray-400">Keep it up!</p>
                </div>
              </div>
            </div>
          )}

          {/* User section */}
          <div className={`p-4 border-t border-white/[0.06] ${sidebarCollapsed ? 'lg:p-2' : ''}`}>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-all ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className={`flex-1 text-left ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                  <p className="text-sm font-medium text-white truncate">{mockUser.name}</p>
                  <p className="text-xs text-gray-500">{mockUser.membership}</p>
                </div>
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className={`absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ${sidebarCollapsed ? 'lg:left-1/2 lg:-translate-x-1/2 lg:w-48' : ''}`}>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-600/10"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0b]/80 backdrop-blur-lg border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center space-x-2">
                <Home className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">/</span>
                <span className="text-gray-400 capitalize">{pathname.split('/')[2] || 'Dashboard'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>

                {notificationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)} />
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">3 new</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {mockUser.notifications.map((notif) => (
                          <div key={notif.id} className="p-4 hover:bg-white/5 border-b border-white/5">
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-300 font-medium">{notif.title}</p>
                              <span className="text-[10px] text-gray-600">{notif.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full p-3 text-center text-sm text-red-500 hover:bg-red-600/10 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* User avatar */}
              <button className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border border-white/10 hover:border-white/20 transition-all flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content with loading */}
        <main className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 relative">
          {isRouteLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader size="lg" text="Loading..." />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <Loader size="lg" text="Loading..." />
              </div>
            }>
              {children}
            </Suspense>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0d0d0e] border-t border-white/[0.06] z-40">
          <div className="grid grid-cols-5">
            {navigation.slice(0, 5).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-1 ${
                    isActive ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] mt-1 truncate max-w-full">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}