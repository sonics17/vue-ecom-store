import { supabase } from '../supabase'

export const categoriesApi = {
  getCategories: async () => {
    const { data, error } = await supabase.from('categories').select('*')

    if (error) throw error

    return data
  },
}
