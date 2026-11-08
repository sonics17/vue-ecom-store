import { supabase } from '@/shared/api/supabase'

export const authApi = {
  signUp: async credentials => {
    const { data, error } = await supabase.auth.signUp(credentials)

    if (error) throw error

    return data
  },
  signInWithPassword: async credentials => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)

    if (error) throw error

    return data
  },

  subscribeToAuthChange: callback => {
    return supabase.auth.onAuthStateChange(callback)
  },
}
