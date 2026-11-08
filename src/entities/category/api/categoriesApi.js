import { supabase } from '@/shared/api/supabase'

export const categoriesApi = {
  getCategories: async () => {
    const { data, error } = await supabase.from('categories').select('*')

    if (error) throw error

    return data
  },
}
