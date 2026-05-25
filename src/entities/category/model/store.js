import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { supabase } from "@/shared/api/supabase";

export const useCategoryStore = defineStore('categoryStore', () => {
  const allCategories = ref([]);
  const isLoading = ref(false);

  const rootCategories = computed(() => allCategories.value.filter(c => c.parent_id === null));

  const fetchCategories = async () => {
    if (allCategories.value.length > 0) return;

    isLoading.value = true

    try {
      const {data, error} = await supabase.from('categories').select('*');

      if (error) {
        throw error;
      }

      allCategories.value = data;
      console.log(allCategories.value)
    } catch (err) {
      console.log('Error:', err.message)
    } finally {
      isLoading.value = false
    }
  }

  return {allCategories, rootCategories, isLoading, fetchCategories}
})