import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/shared/api'

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

  const getColorIds = baseColorId => {
    return allColors.value
      .filter(
        color =>
          color.id === baseColorId || color.base_color_id === baseColorId,
      )
      .map(color => color.id)
  }

  const buildAvailableFilters = productsData => {
    const prices = productsData.map(product => product.price)
    const minPrice = prices.length ? Math.min(...prices) : 0
    const maxPrice = prices.length ? Math.max(...prices) : 0

    const availableColorsIds = new Set(
      productsData.flatMap(product => {
        return product.product_color_variants.map(variant => variant.colors.id)
      }),
    )

    const availableBaseColors = allColors.value
      .filter(color => color.base_color_id === null)
      .map(baseColor => {
        const colorIds = getColorIds(baseColor.id)
        const isAvailable = colorIds.some(id => availableColorsIds.has(id))

        if (!isAvailable) return null

        return {
          ...baseColor,
          colorIds,
        }
      })
      .filter(Boolean)

    const allSizes = productsData
      .flatMap(product => {
        return product.product_color_variants.flatMap(variant =>
          variant.products_stock.map(ps => ps.sizes),
        )
      })
      .filter(Boolean)

    const uniqueSizes = Array.from(
      new Map(allSizes.map(size => [size.id, size])).values(),
    ).sort((a, b) => a.id - b.id)

    availableFilters.value = {
      minPrice: Math.floor(minPrice),
      maxPrice: Math.round(maxPrice),
      colors: availableBaseColors,
      sizes: uniqueSizes,
    }
  }

  const fetchAvailableFilters = async () => {
    try {
      if (!allColors.value.length) {
        const colors = await productsApi.getColors()
        allColors.value = colors
      }

      const rawFiltersData = await productsApi.getAvailableFilters(
        categoryIds.value,
      )

      buildAvailableFilters(rawFiltersData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return {
    categoryIds,
    availableFilters,
    setCategoryIds,
    fetchAvailableFilters,
  }
})
