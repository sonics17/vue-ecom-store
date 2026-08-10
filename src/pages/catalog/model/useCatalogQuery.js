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

  const setMinPrice = minPrice => {
    const query = { ...route.query }

    query.minPrice = String(minPrice)

    router.push({ query })
  }

  const setMaxPrice = maxPrice => {
    const query = { ...route.query }

    query.maxPrice = String(maxPrice)

    router.push({ query })
  }

  const normalizeQuery = (query, availableFilters) => {
    const normalizedQuery = { ...query }

    const queryMinPrice = Number(normalizedQuery.minPrice)

    if (normalizedQuery.minPrice !== undefined) {
      if (Number.isNaN(queryMinPrice)) {
        delete normalizedQuery.minPrice
      } else if (queryMinPrice < availableFilters.minPrice) {
        normalizedQuery.minPrice = String(availableFilters.minPrice)
      } else if (queryMinPrice > availableFilters.maxPrice) {
        normalizedQuery.minPrice = String(availableFilters.maxPrice)
      }
    }

    console.log(normalizedQuery)

    return normalizedQuery
  }

  const isSameQuery = (originalQuery, normalizedQuery) => {
    console.log('original:', originalQuery)
    console.log('normal', normalizedQuery)
    return JSON.stringify(originalQuery) === JSON.stringify(normalizedQuery)
  }

  return {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    normalizeQuery,
    isSameQuery,
  }
}
