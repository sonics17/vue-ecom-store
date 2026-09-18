import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/shared/api'
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

  const setCategoryIds = ids => {
    if (!ids) {
      categoryIds.value = []
      return
    }
    categoryIds.value = ids
  }

  const loadAvailableFilters = async () => {
    try {
      if (!allColors.value.length) {
        const colors = await productsApi.getColors()
        allColors.value = colors
      }

      const rawFiltersData = await productsApi.getAvailableFilters(
        categoryIds.value,
      )

      availableFilters.value = adaptAvailableFilters(
        rawFiltersData,
        allColors.value,
      )
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return {
    categoryIds,
    availableFilters,
    setCategoryIds,
    loadAvailableFilters,
  }
})
