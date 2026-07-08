import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/shared/api/supabase";

export const useProductStore = defineStore('productStore', () => {
  const products = ref([])
  const isLoading = ref(false)

  const fetchProducts = async(categoryId) => {
    isLoading.value = true

    try {
      const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_color_variants (
          id,
          image_url,
          colors (id, name, hex),
          products_stock (
            stock,
            sizes (name)
          )
        ),
        brands (id, name)
      `)
      .in('category_id', categoryId)

      if (error) throw error;

      products.value = data
      console.log(products)
    } catch (err) {
      console.error('Error:', err.message)
    } finally {
      isLoading.value = false
    }
  }

  return {products, isLoading, fetchProducts}
})