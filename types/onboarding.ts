export type OnboardingFormData = {
    age: string
    gender: string
    currentWeight: string
    targetWeight: string
    height: string
    primaryGoal: string
    activityLevel: string
    preferredWorkoutTime: string
    workoutDays: string[]
    experienceLevel: string
    equipment: string[]
    medicalConditions: string
    dietaryPreference: string
    sleepHours: string
    primaryMotivation: string
  }
  
  export const ONBOARDING_INITIAL_DATA: OnboardingFormData = {
    age: '', gender: '', currentWeight: '', targetWeight: '', height: '',
    primaryGoal: '', activityLevel: '', preferredWorkoutTime: '', workoutDays: [],
    experienceLevel: '', equipment: [], medicalConditions: '', dietaryPreference: '',
    sleepHours: '', primaryMotivation: '',
  }
  
  export type OnboardingStepKey =
    | 'basics' | 'body' | 'goal' | 'activity' | 'schedule'
    | 'experience' | 'health' | 'diet' | 'motivation'
  
  export type OnboardingStepDef = {
    shortTitle: string
    key: OnboardingStepKey
    title: string
  }
  
  export const ONBOARDING_STEPS: OnboardingStepDef[] = [
    {
      key: 'basics', title: 'The basics',
      shortTitle: ""
    },
    {
      key: 'body', title: 'Body stats',
      shortTitle: ""
    },
    {
      key: 'goal', title: 'Primary goal',
      shortTitle: ""
    },
    {
      key: 'activity', title: 'Activity level',
      shortTitle: ""
    },
    {
      key: 'schedule', title: 'Workout schedule',
      shortTitle: ""
    },
    {
      key: 'experience', title: 'Experience & equipment',
      shortTitle: ""
    },
    {
      key: 'health', title: 'Health notes',
      shortTitle: ""
    },
    {
      key: 'diet', title: 'Diet & sleep',
      shortTitle: ""
    },
    {
      key: 'motivation', title: 'Motivation',
      shortTitle: ""
    },
  ]