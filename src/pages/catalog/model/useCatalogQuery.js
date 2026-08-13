import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useCatalogQuery = () => {
  const route = useRoute()
  const router = useRouter()

  const minPrice = computed(() => {
    if (route.query.minPrice === undefined) return null
    const value = Number(route.query.minPrice)

    return Number.isNaN(value) ? null : value
  })

  const maxPrice = computed(() => {
    if (route.query.maxPrice === undefined) return null
    const value = Number(route.query.maxPrice)

    return Number.isNaN(value) ? null : value
  })

  const colors = computed(() => {
    if (route.query.colors === undefined) return []

    const value = route.query.colors.split(',').map(Number)

    return value
  })

  const sizes = computed(() => {
    if (route.query.sizes === undefined) return []

    const value = route.query.sizes.split(',').map(Number)

    return value
  })

  const setPriceRange = ({ min, max }) => {
    const query = { ...route.query }

    query.minPrice = String(min)
    query.maxPrice = String(max)

    router.push({ query })
  }

  const setColors = colors => {
    const query = { ...route.query }

    query.colors = colors.join(',')
    console.log(colors)

    router.push({ query })
  }

  const setSizes = sizes => {
    const query = { ...route.query }
    console.log(sizes)

    query.sizes = sizes.join(',')

    router.push({ query })
  }

  const normalizeQuery = (query, availableFilters) => {
    const normalizedQuery = { ...query }

    let queryMinPrice = normalizedQuery.minPrice
    let queryMaxPrice = normalizedQuery.maxPrice

    if (
      queryMinPrice === undefined ||
      queryMinPrice === '' ||
      !Number.isFinite(Number(queryMinPrice))
    ) {
      delete normalizedQuery.minPrice
      queryMinPrice = null
    } else {
      queryMinPrice = Math.floor(Number(queryMinPrice))
    }

    if (
      queryMaxPrice === undefined ||
      queryMaxPrice === '' ||
      !Number.isFinite(Number(queryMaxPrice))
    ) {
      delete normalizedQuery.maxPrice
      queryMaxPrice = null
    } else {
      queryMaxPrice = Math.ceil(Number(queryMaxPrice))
    }

    if (queryMinPrice !== null && queryMinPrice <= availableFilters.minPrice) {
      queryMinPrice = null
    }

    if (queryMaxPrice !== null && queryMaxPrice >= availableFilters.maxPrice) {
      queryMaxPrice = null
    }

    if (
      queryMinPrice !== null &&
      queryMaxPrice !== null &&
      queryMinPrice > queryMaxPrice
    ) {
      ;[queryMinPrice, queryMaxPrice] = [queryMaxPrice, queryMinPrice]
    }

    if (queryMinPrice !== null) {
      normalizedQuery.minPrice = String(queryMinPrice)
    } else {
      delete normalizedQuery.minPrice
    }

    if (queryMaxPrice !== null) {
      normalizedQuery.maxPrice = String(queryMaxPrice)
    } else {
      delete normalizedQuery.maxPrice
    }

    let querySizes = normalizedQuery.sizes

    if (querySizes === undefined || querySizes === '') {
      delete normalizedQuery.sizes
      querySizes = []
    } else {
      querySizes = normalizedQuery.sizes
        .split(',')
        .map(Number)
        .filter(Number.isFinite)
    }

    querySizes = [...new Set(querySizes)]

    const availableSizeIds = new Set(
      availableFilters.sizes.map(size => size.id),
    )

    querySizes = querySizes.filter(size => availableSizeIds.has(size))

    if (querySizes.length) {
      normalizedQuery.sizes = querySizes.join(',')
    } else {
      delete normalizedQuery.sizes
    }

    let queryColors = normalizedQuery.colors
    if (queryColors === undefined || queryColors === '') {
      delete normalizedQuery.colors
      queryColors = []
    } else {
      queryColors = queryColors.split(',').map(Number).filter(Number.isFinite)
    }

    queryColors = [...new Set(queryColors)]

    const availableColorIds = new Set(
      availableFilters.colors.map(color => color.id),
    )

    queryColors = queryColors.filter(color => availableColorIds.has(color))

    if (queryColors.length) {
      normalizedQuery.colors = queryColors.join(',')
    } else {
      delete normalizedQuery.colors
    }

    return normalizedQuery
  }

  const isSameQuery = (originalQuery, normalizedQuery) => {
    return JSON.stringify(originalQuery) === JSON.stringify(normalizedQuery)
  }

  return {
    minPrice,
    maxPrice,
    colors,
    sizes,
    setPriceRange,
    setColors,
    setSizes,
    normalizeQuery,
    isSameQuery,
  }
}
