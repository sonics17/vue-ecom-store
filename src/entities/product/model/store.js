import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productsApi } from '@/shared/api'

export const useProductStore = defineStore('productStore', () => {
  const products = ref([])
  const isLoading = ref(false)

  const fetchProducts = async params => {
    console.log('FETCHIING THESE PARAMS:', params)
    isLoading.value = true

    try {
      products.value = await productsApi.getProducts(params)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return { products, isLoading, fetchProducts }
})
