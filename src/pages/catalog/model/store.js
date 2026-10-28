import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/entities/product/api/products-api'
import { adaptAvailableFilters } from './filtersAdapter'

export const useCatalogStore = defineStore('catalogStore', () => {
  const categoryIds = ref([])

  const availableFilters = ref({
    minPrice: 0,
    maxPrice: 0,
    colors: [],
    sizes: [],
  })

  const allColors = ref([])

  // const filtersController = ref(null)

  const isLoading = ref(false)

  const loadAvailableFilters = async signal => {
    // if (filtersController.value) {
    //   filtersController.value.abort()
    // }

    // filtersController.value = new AbortController()
    // const signal = filtersController.value.signal

    isLoading.value = true

    try {
      if (!allColors.value.length) {
        const colors = await productsApi.getColors()
        allColors.value = colors
      }

      const rawFiltersData = await productsApi.getAvailableFilters(
        categoryIds.value,
        signal,
      )

      availableFilters.value = adaptAvailableFilters(
        rawFiltersData,
        allColors.value,
      )
    } catch (error) {
      console.error('Error:', error)
    } finally {
      if (!signal?.aborted) {
        isLoading.value = false
      }
      // if (filtersController.value?.signal === signal) {
      //   filtersController.value = null
      //   isLoading.value = false
      // }
    }
  }

  const setCategoryIds = ids => {
    if (!ids) {
      categoryIds.value = []
      return
    }
    categoryIds.value = ids
  }

  return {
    categoryIds,
    availableFilters,
    setCategoryIds,
    loadAvailableFilters,
  }
})
