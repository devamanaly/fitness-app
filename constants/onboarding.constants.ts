// constants/onboarding.constants.ts

import {
  User,
  Scale,
  Target,
  Activity,
  Calendar,
  Dumbbell,
  Heart,
  Apple,
  Flame,
  Coffee,
  Bike,
  Zap,
  Rocket,
  Home,
  Building2,
  TreePine,
  Combine,
  Leaf,
  Beef,
  Fish,
  Wheat,
  Egg,
  Moon,
  Sun,
  Clock,
  Star,
  Shield,
  Brain,
  Smile,
  TrendingUp,
  HeartHandshake,
  Stethoscope,
  Salad,
  Utensils,
  type LucideIcon,
  Trophy,
  Sunset,
  Sunrise,
} from 'lucide-react'

// Type definitions
export type Gender = "Male" | "Female" | "Other" | "Prefer not to say"
export type Goal = "Lose weight" | "Build muscle" | "Improve endurance" | "General fitness" | "Maintain weight" | "Body recomposition"
export type ActivityLevel = "Sedentary" | "Lightly active" | "Moderately active" | "Very active" | "Extremely active"
export type WorkoutTime = "Early morning" | "Morning" | "Afternoon" | "Evening" | "Late night" | "Flexible"
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"
export type DietaryPreference = "No preference" | "Vegetarian" | "Vegan" | "Keto" | "Pescatarian" | "Halal" | "Kosher" | "Gluten-free" | "Dairy-free"

// Enhanced constants with metadata
export const GENDERS: { value: Gender; icon: LucideIcon; description: string }[] = [
  { 
    value: "Male", 
    icon: User,
    description: "Male physiology"
  },
  { 
    value: "Female", 
    icon: User,
    description: "Female physiology"
  },
  { 
    value: "Other", 
    icon: User,
    description: "Other"
  },
  { 
    value: "Prefer not to say", 
    icon: Shield,
    description: "Keep private"
  },
]

export const GOALS: { value: Goal; icon: LucideIcon; description: string }[] = [
  { 
    value: "Lose weight", 
    icon: TrendingUp,
    description: "Burn fat & slim down"
  },
  { 
    value: "Build muscle", 
    icon: Dumbbell,
    description: "Gain strength & size"
  },
  { 
    value: "Improve endurance", 
    icon: Activity,
    description: "Boost stamina & cardio"
  },
  { 
    value: "General fitness", 
    icon: Heart,
    description: "Overall health & wellness"
  },
  { 
    value: "Maintain weight", 
    icon: Scale,
    description: "Stay at current weight"
  },
  { 
    value: "Body recomposition", 
    icon: Zap,
    description: "Lose fat & build muscle"
  },
]

export const ACTIVITY_LEVELS: { value: ActivityLevel; icon: LucideIcon; description: string }[] = [
  { 
    value: "Sedentary", 
    icon: Coffee,
    description: "Little to no exercise"
  },
  { 
    value: "Lightly active", 
    icon: Bike,
    description: "Light exercise 1-3 days/week"
  },
  { 
    value: "Moderately active", 
    icon: Zap,
    description: "Moderate exercise 3-5 days/week"
  },
  { 
    value: "Very active", 
    icon: Flame,
    description: "Hard exercise 6-7 days/week"
  },
  { 
    value: "Extremely active", 
    icon: Rocket,
    description: "Very hard exercise & physical job"
  },
]

export const WORKOUT_TIMES: { value: WorkoutTime; icon: LucideIcon; description: string }[] = [
  { 
    value: "Early morning", 
    icon: Sun,
    description: "5AM - 8AM"
  },
  { 
    value: "Morning", 
    icon: Sunrise,
    description: "8AM - 11AM"
  },
  { 
    value: "Afternoon", 
    icon: Sun,
    description: "12PM - 4PM"
  },
  { 
    value: "Evening", 
    icon: Sunset,
    description: "5PM - 8PM"
  },
  { 
    value: "Late night", 
    icon: Moon,
    description: "8PM - 11PM"
  },
  { 
    value: "Flexible", 
    icon: Clock,
    description: "Any time works"
  },
]

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; icon: LucideIcon; description: string }[] = [
  { 
    value: "Beginner", 
    icon: Star,
    description: "New to fitness"
  },
  { 
    value: "Intermediate", 
    icon: TrendingUp,
    description: "1-2 years experience"
  },
  { 
    value: "Advanced", 
    icon: Zap,
    description: "3+ years experience"
  },
  { 
    value: "Expert", 
    icon: Trophy,
    description: "Competitive athlete"
  },
]

export const EQUIPMENT_OPTIONS: { value: string; icon: LucideIcon; description: string }[] = [
  { 
    value: "None / bodyweight", 
    icon: Home,
    description: "No equipment needed"
  },
  { 
    value: "Dumbbells", 
    icon: Dumbbell,
    description: "Free weights"
  },
  { 
    value: "Resistance bands", 
    icon: Combine,
    description: "Portable resistance"
  },
  { 
    value: "Full gym", 
    icon: Building2,
    description: "Complete facility access"
  },
  { 
    value: "Home gym setup", 
    icon: Home,
    description: "Basic home equipment"
  },
]

export const DIET_PREFERENCES: { value: DietaryPreference; icon: LucideIcon; description: string }[] = [
  { 
    value: "No preference", 
    icon: Utensils,
    description: "Flexible eating"
  },
  { 
    value: "Vegetarian", 
    icon: Leaf,
    description: "Plant-based + dairy/eggs"
  },
  { 
    value: "Vegan", 
    icon: Leaf,
    description: "100% plant-based"
  },
  { 
    value: "Keto", 
    icon: Egg,
    description: "High fat, low carb"
  },
  { 
    value: "Pescatarian", 
    icon: Fish,
    description: "Vegetarian + fish"
  },
  { 
    value: "Halal", 
    icon: Star,
    description: "Halal certified foods"
  },
  { 
    value: "Kosher", 
    icon: Star,
    description: "Kosher certified foods"
  },
  { 
    value: "Gluten-free", 
    icon: Wheat,
    description: "No gluten products"
  },
  { 
    value: "Dairy-free", 
    icon: Shield,
    description: "No dairy products"
  },
]

export const MOTIVATIONS: { value: string; icon: LucideIcon; description: string }[] = [
  { 
    value: "Health & longevity", 
    icon: Heart,
    description: "Live longer, feel better"
  },
  { 
    value: "Look better", 
    icon: Smile,
    description: "Improve appearance"
  },
  { 
    value: "Feel more confident", 
    icon: Star,
    description: "Build self-esteem"
  },
  { 
    value: "Athletic performance", 
    icon: Trophy,
    description: "Compete & perform"
  },
  { 
    value: "Mental health", 
    icon: Brain,
    description: "Reduce stress & anxiety"
  },
  { 
    value: "Doctor recommended", 
    icon: Stethoscope,
    description: "Medical necessity"
  },
  { 
    value: "Special event", 
    icon: Calendar,
    description: "Wedding, vacation, etc."
  },
  { 
    value: "Family & relationships", 
    icon: HeartHandshake,
    description: "Be present for loved ones"
  },
]

// Enhanced STEP_VISUALS with more context
export const STEP_VISUALS: Record<string, {
  tagline: string
  caption: string
  progressText: string
  icon: LucideIcon
  accentColor: string
}> = {
  basics: {
    tagline: 'Every plan starts with you',
    caption: 'Age and gender shape your baseline metabolic and training needs.',
    progressText: 'Building your personal profile',
    icon: User,
    accentColor: 'from-red-600 to-red-800',
  },
  body: {
    tagline: 'Know your starting line',
    caption: 'Your stats set the math behind every calorie and rep we calculate.',
    progressText: 'Calculating your metrics',
    icon: Scale,
    accentColor: 'from-red-500 to-red-700',
  },
  goal: {
    tagline: 'Name the target',
    caption: 'One clear goal beats five vague ones — this drives your whole plan.',
    progressText: 'Setting your objectives',
    icon: Target,
    accentColor: 'from-orange-600 to-red-600',
  },
  activity: {
    tagline: 'How you move, daily',
    caption: 'Your baseline activity changes how hard your workouts should push.',
    progressText: 'Analyzing your routine',
    icon: Activity,
    accentColor: 'from-red-600 to-pink-600',
  },
  schedule: {
    tagline: 'Fit fitness into life',
    caption: "We'll build around your real schedule, not an ideal one.",
    progressText: 'Optimizing your calendar',
    icon: Calendar,
    accentColor: 'from-red-700 to-red-500',
  },
  experience: {
    tagline: 'Meet you where you are',
    caption: 'No ego, no guesswork — just the right starting intensity.',
    progressText: 'Calibrating difficulty',
    icon: Dumbbell,
    accentColor: 'from-red-600 to-orange-500',
  },
  health: {
    tagline: 'Train smart, not sorry',
    caption: "We'll route around anything that needs care.",
    progressText: 'Ensuring safety first',
    icon: Heart,
    accentColor: 'from-rose-600 to-red-600',
  },
  diet: {
    tagline: 'Fuel and recovery',
    caption: 'What you eat and how you sleep both drive results.',
    progressText: 'Planning your nutrition',
    icon: Apple,
    accentColor: 'from-red-500 to-rose-600',
  },
  motivation: {
    tagline: 'The "why" behind the work',
    caption: "On hard days, this is what we'll remind you of.",
    progressText: 'Finding your drive',
    icon: Flame,
    accentColor: 'from-red-600 to-amber-600',
  },
}

// Export types for TypeScript
export type OnboardingStepKey = keyof typeof STEP_VISUALS

// Helper function to get step visual
export function getStepVisual(stepKey: OnboardingStepKey) {
  return STEP_VISUALS[stepKey]
}

// Export for backward compatibility
export const GENDERS_ARRAY = GENDERS.map(g => g.value)
export const GOALS_ARRAY = GOALS.map(g => g.value)
export const ACTIVITY_LEVELS_ARRAY = ACTIVITY_LEVELS.map(a => a.value)
export const WORKOUT_TIMES_ARRAY = WORKOUT_TIMES.map(w => w.value)
export const EXPERIENCE_LEVELS_ARRAY = EXPERIENCE_LEVELS.map(e => e.value)
export const EQUIPMENT_OPTIONS_ARRAY = EQUIPMENT_OPTIONS.map(e => e.value)
export const DIET_PREFERENCES_ARRAY = DIET_PREFERENCES.map(d => d.value)
export const MOTIVATIONS_ARRAY = MOTIVATIONS.map(m => m.value)