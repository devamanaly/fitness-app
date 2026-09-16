// import { createClient } from '@supabase/supabase-js'
"use client"
import { createClient } from "@/lib/supabase/client"
// ---cut---
// defaults to the global scope
// export const logout =async()=>{

//     await supabase.auth.signOut()

// }

export const logout = async () => {
  const supabase = await createClient()

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error('Error logging out:', error.message)
      // Optional: Throw error to handle it inside the UI component
      throw error 
    }
  }
  