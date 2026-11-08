import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/entities/product'
import { adaptAvailableFilters } from './adaptAvailableFilters'

export const useCatalogStore = defineStore('catalogStore', () => {
  const availableFilters = ref({
    minPrice: 0,
    maxPrice: 0,
    colors: [],
    sizes: [],
  })

  const allColors = ref([])

  const isLoadingFilters = ref(false)
  const availableFiltersKey = ref(null)

  const loadAvailableFilters = async (categoryIds, filtersKey, signal) => {
    isLoadingFilters.value = true

    try {
      if (!allColors.value.length) {
        const colors = await productsApi.getColors()
        allColors.value = colors
      }

      const rawFiltersData = await productsApi.getAvailableFilters(
        categoryIds,
        signal,
      )

      availableFilters.value = adaptAvailableFilters(
        rawFiltersData,
        allColors.value,
      )

      availableFiltersKey.value = filtersKey
    } catch (error) {
      if (error.message.includes('AbortError')) {
        console.log('request was aborted')
      } else {
        console.error('Error:', error)
      }
    } finally {
      if (!signal?.aborted) {
        isLoadingFilters.value = false
      }
    }
  }

  return {
    availableFilters,
    loadAvailableFilters,
    isLoadingFilters,
    availableFiltersKey,
  }
})
