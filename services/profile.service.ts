import { createClient } from '@/lib/supabase/server'

export async function getOnboardingStatus(userId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userId)
    .single()
  return data?.onboarding_completed ?? false
}