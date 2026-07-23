import { supabase } from "../supabase";

export const categoriesApi = {
  async getCategories() {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) throw error;

    return data;
  },
};