import { ref } from "vue";
import { defineStore } from "pinia";
import { productsApi } from "@/shared/api";

export const useProductStore = defineStore('productStore', () => {
  const products = ref([])
  const isLoading = ref(false)

  const fetchProducts = async(activeCategoryId, priceFrom, priceTo, colors, sizes) => {
    console.log("FETCH")
    isLoading.value = true

    try {
      const filters = {
        categoryId: activeCategoryId,
        priceFrom: priceFrom,
        priceTo: priceTo,
        colors: colors,
        sizes: sizes
      }

      products.value = await productsApi.getProducts(filters)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      isLoading.value = false
    }
  }


  return {products, isLoading, fetchProducts}
})