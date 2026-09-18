import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { categoriesApi } from '@/shared/api'

export const useCategoryStore = defineStore('categoryStore', () => {
  const allCategories = ref([])
  const isLoading = ref(true)

  const rootCategories = computed(() => {
    return allCategories.value
      .filter(category => category.parent_id === null)
      .map(rootCategory => {
        return {
          ...rootCategory,
          subCategories: allCategories.value.filter(
            category => category.parent_id === rootCategory.id,
          ),
        }
      })
  })

  const getCategoryIdsBySlug = (rootCategorySlug, subCategorySlug = null) => {
    const rootCategory = allCategories.value.find(
      category =>
        category.parent_id === null && category.slug === rootCategorySlug,
    )

    if (!rootCategory) return []

    if (!subCategorySlug) {
      return allCategories.value
        .filter(category => category.parent_id === rootCategory.id)
        .map(category => category.id)
    }

    const subCategory = allCategories.value.find(
      category =>
        category.parent_id === rootCategory.id &&
        category.slug === subCategorySlug,
    )

    return subCategory ? [subCategory.id] : []
  }

  const getCurrentCategoryIdBySlug = (
    rootCategorySlug,
    subCategorySlug = null,
  ) => {
    const rootCategory = allCategories.value.find(
      category =>
        category.parent_id === null && category.slug === rootCategorySlug,
    )

    if (!rootCategory) return null

    if (!subCategorySlug) return rootCategory.id

    const subCategory = allCategories.value.find(
      category =>
        category.parent_id === rootCategory.id &&
        category.slug === subCategorySlug,
    )

    return subCategory ? subCategory.id : null
  }

  const loadCategories = async () => {
    console.log('loadCategories beforre retuen')
    if (allCategories.value.length > 0) return
    console.log('loadCategories')

    isLoading.value = true

    try {
      allCategories.value = await categoriesApi.getCategories()
    } catch (err) {
      console.error('Error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    allCategories,
    rootCategories,
    isLoading,
    loadCategories,
    getCategoryIdsBySlug,
    getCurrentCategoryIdBySlug,
  }
})
