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
  signOut: async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' })

    if (error) throw error
  },
  resetPasswordWithEmail: async (email, redirectUrl) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error) throw error

    return data
  },
  updateUserPassword: async password => {
    const { data, error } = await supabase.auth.updateUser({ password })

    if (error) throw error

    return data
  },
}
