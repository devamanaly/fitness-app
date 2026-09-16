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
 export const SideBarNavigation = [
  { name: "Dashboard",href: "/dashboard",icon: LayoutDashboard,
  },
  { name: "Workouts", href: "/dashboard/workouts", icon: Dumbbell },
  { name: "Nutrition", href: "/dashboard/nutrition", icon: Utensils },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "AI Coach", href: "/dashboard/coach", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
