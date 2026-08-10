import { productsApi } from '@/shared/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filterStore', () => {
  // const allColors = ref([])
  // const isLoading = ref(false)

  // const allFilters = ref({
  //   minPrice: 0,
  //   maxPrice: 0,
  //   colors: [],
  //   sizes: [],
  // })

  // const selectedFilters = ref({
  //   minPrice: 0,
  //   maxPrice: 0,
  //   colors: [],
  //   sizes: [],
  // })

  // const loadFiltersForCategory = async categoryId => {
  //   isLoading.value = true
  //   try {
  //     allColors.value = await productsApi.getColors()

  //     const rawFiltersData = await productsApi.getFilersByCategory(categoryId)

  //     allFilters.value = parseFilters(rawFiltersData, allColors.value)
  //   } catch (err) {
  //     console.error('Error:', err)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  // const parseFilters = (products, allColors) => {
  //   const prices = products.map(p => p.price)
  //   const minPrice = prices.length ? Math.min(...prices) : 0
  //   const maxPrice = prices.length ? Math.max(...prices) : 0

  //   const colors = products.flatMap(p => {
  //     return p.product_color_variants.map(v => {
  //       return v.colors
  //     })
  //   })

  //   const uniqueColors = Array.from(
  //     new Map(colors.map(c => [c.id, c])).values(),
  //   )

  //   const allBaseColorsWithChildren = allColors
  //     .map(c => {
  //       return {
  //         ...c,
  //         childrenIds: allColors
  //           .filter(color => color.id === c.id || c.id === color.base_color_id)
  //           .map(childColor => childColor.id),
  //       }
  //     })
  //     .filter(c => c.base_color_id === null)

  //   const availableBaseColors = allBaseColorsWithChildren.filter(baseColor => {
  //     for (const color of uniqueColors) {
  //       if (baseColor.childrenIds.includes(color.id)) {
  //         return baseColor
  //       }
  //     }
  //   })

  //   const allSizes = products
  //     .flatMap(p => {
  //       return p.product_color_variants.flatMap(v =>
  //         v.products_stock.map(ps => ps.sizes),
  //       )
  //     })
  //     .filter(Boolean)

  //   const uniqueSizes = Array.from(
  //     new Map(allSizes.map(s => [s.id, s])).values(),
  //   ).sort((a, b) => a.id - b.id)

  //   return {
  //     minPrice,
  //     maxPrice,
  //     colors: availableBaseColors,
  //     sizes: uniqueSizes,
  //   }
  // }

  // const initializeSelectedFilters = query => {
  //   selectedFilters.value = {
  //     minPrice:
  //       query.minPrice !== undefined
  //         ? Number(query.minPrice)
  //         : allFilters.value.minPrice,
  //     maxPrice:
  //       query.maxPrice !== undefined
  //         ? Number(query.maxPrice)
  //         : allFilters.value.maxPrice,

  //     colors: query.color
  //       ? [...new Set(query.color.split(',').map(Number))]
  //       : [],

  //     sizes: query.size ? [...new Set(query.size.split(',').map(Number))] : [],
  //   }
  // }

  // const toggleColor = ids => {
  //   for (let id of ids) {
  //     if (selectedFilters.value.colors.includes(id)) {
  //     }
  //   }
  // }

  return {
    // loadFiltersForCategory,
    // allFilters,
    // selectedFilters,
    // initializePriceFilter,
  }
})
