import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/shared/api'
import { useProductStore } from '@/entities/product/model/store'

export const useCatalogStore = defineStore('catalogStore', () => {
  const productStrore = useProductStore()

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

  // const searchQuery = ref('')
  // const setSearchQuery = query => {
  //   if (searchQuery.value !== query) {
  //     searchQuery.value = query
  //     resetParams()
  //   }
  // }

  const setAllColors = colors => {
    allColors.value = colors
  }

  const setAvailableFiltersFromProducts = productsData => {
    const prices = productsData.map(p => p.price)
    const minPrice = prices.length ? Math.min(...prices) : 0
    const maxPrice = prices.length ? Math.max(...prices) : 0

    const colors = productsData.flatMap(p => {
      return p.product_color_variants.map(v => v.colors)
    })

    const uniqueColors = Array.from(
      new Map(colors.map(c => [c.id, c])).values(),
    )

    const allBaseColorsWithChildren = allColors.value
      .map(c => {
        return {
          ...c,
          childrenIds: allColors.value
            .filter(color => color.id === c.id || c.id === color.base_color_id)
            .map(childColor => childColor.id),
        }
      })
      .filter(c => c.base_color_id === null)

    const availableBaseColors = allBaseColorsWithChildren.filter(baseColor => {
      for (const color of uniqueColors) {
        if (baseColor.childrenIds.includes(color.id)) {
          return baseColor
        }
      }
    })

    const allSizes = productsData
      .flatMap(p => {
        return p.product_color_variants.flatMap(v =>
          v.products_stock.map(ps => ps.sizes),
        )
      })
      .filter(Boolean)

    const uniqueSizes = Array.from(
      new Map(allSizes.map(s => [s.id, s])).values(),
    ).sort((a, b) => a.id - b.id)

    availableFilters.value = {
      minPrice,
      maxPrice,
      colors: availableBaseColors,
      sizes: uniqueSizes,
    }
  }

  const loadAvailableFilters = async () => {
    try {
      if (!allColors.value.length) {
        const colors = await productsApi.getColors()
        setAllColors(colors)
      }

      const rawFiltersData = await productsApi.getFiltersByCategory(
        categoryIds.value,
      )

      setAvailableFiltersFromProducts(rawFiltersData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const loadProducts = async params => {
    productStrore.fetchProducts(params)
  }

  return {
    categoryIds,
    availableFilters,
    setCategoryIds,
    loadProducts,
    loadAvailableFilters,
  }
})
