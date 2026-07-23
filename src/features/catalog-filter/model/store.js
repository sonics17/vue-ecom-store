import { productsApi } from "@/shared/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore('filter', () => {

  const allColors = ref([])

  const availableFilters = ref({
    minPrice: 0,
    maxPrice: 0,
    colors: [],
    sizes: []
})

  const loadFiltersForCategory = async (categoryId) => {
    try {
      allColors.value = await productsApi.getColors();

      const rawFiltersData = await productsApi.getFilersByCategory(categoryId)

      availableFilters.value = parseFilters(rawFiltersData, allColors.value)
    } catch (err) {
      console.error('Error:', err)
    }
  }


  const parseFilters = (products, allColors) => {
    const prices = products.map(p => p.price)
    const minPrice = prices.length ? Math.min(...prices) : 0
    const maxPrice = prices.length ? Math.max(...prices) : 0

    const colors = products.flatMap(p => {
      return p.product_color_variants.map(v => {
        return v.colors
      })
    })

    const uniqueColors = Array.from(new Map(colors.map(c => [c.id, c])).values())

    const allBaseColorsWithChildren = allColors.map(c => {
      return {
          ...c,
          childrenIds: allColors.filter(color => color.id === c.id || c.id === color.base_color_id)
                                .map(childColor => childColor.id)
      }
    }).filter(c => c.base_color_id === null)

    const availableBaseColors = allBaseColorsWithChildren.filter(baseColor => {
      for (const color of uniqueColors) {
        if (baseColor.childrenIds.includes(color.id)) {
          return baseColor
        }
      }
    })

    const allSizes = products.flatMap(p => {
      return p.product_color_variants.flatMap(v => v.products_stock.map(ps => ps.sizes))
    }).filter(Boolean)

    const uniqueSizes = Array.from(new Map(allSizes.map(s => [s.id, s])).values()).sort((a, b) => a.id - b.id)

    return {
      minPrice, 
      maxPrice, 
      colors: availableBaseColors, 
      sizes: uniqueSizes
    }
  }


  return {loadFiltersForCategory, availableFilters}
})