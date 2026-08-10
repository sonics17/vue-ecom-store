<script setup>
import { useCategoryStore } from '@/entities/category/model/store'
import { useProductStore } from '@/entities/product/model/store'
import { AppContainer } from '@/shared/ui/base/app-container'
import { computed, watch } from 'vue'
import { buildCatalogCategoriesSections } from '../model/buildCatalogCategoriesSections'
import { CategoriesSection } from '@/widgets/categories-section'
import { useRoute, useRouter } from 'vue-router'
import { ProductCatalog } from '@/widgets/product-catalog'
import { CatalogSidebar } from '@/widgets/catalog-sidebar'
import { PriceFilter } from '@/features/catalog-filter'
import { CategoryNavigation } from '@/entities/category'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { CatalogDrawer } from '@/widgets/catalog-drawer'
import { useCatalogStore } from '../model/store'
import { useCatalogQuery } from '../model/useCatalogQuery'

const route = useRoute()
const router = useRouter()
const {
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  normalizeQuery,
  isSameQuery,
} = useCatalogQuery()
const categoryStore = useCategoryStore()
const catalogStore = useCatalogStore()
const productStore = useProductStore()
const { isDesktop } = useDeviceBreakpoints()

const categoriesSections = computed(() => {
  return buildCatalogCategoriesSections(
    categoryStore.allCategories,
    categoryStore.rootCategories,
  )
})

watch(
  [
    () => route.params.rootCategory,
    () => route.params.subCategory,
    () => route.query,
  ],
  async ([newRoot, newSub, newQuery], [oldRoot, oldSub, oldQuery]) => {
    if (newRoot !== oldRoot || newSub !== oldSub) {
      const categoryIds = categoryStore.getCategoryIdsBySlug(newRoot, newSub)
      catalogStore.setCategoryIds(categoryIds)
      await catalogStore.loadAvailableFilters()
    }

    const normalizedQuery = normalizeQuery(
      newQuery,
      catalogStore.availableFilters,
    )

    if (!isSameQuery(newQuery, normalizedQuery)) {
      router.replace({ query: normalizedQuery })
      return
    }

    await productStore.fetchProducts({
      categoryIds: catalogStore.categoryIds,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      colors: [],
      sizes: [],
    })
  },
  { immediate: true },
)
</script>

<template>
  <AppContainer>
    <div class="catalog-container">
      <!-- <template v-if="!route.params.rootCategory">
        <CategoriesSection
          v-for="categorySection in categoriesSections"
          :key="categorySection.slug"
          :title="categorySection.title"
          :items="categorySection.items"
          :rootSlug="categorySection.rootSlug"
          class="categories-section"
        ></CategoriesSection>
      </template> -->

      <CatalogSidebar v-if="isDesktop" class="catalog-sidebar">
        <template #navigation>
          <CategoryNavigation
            :activeCategoryId="
              route.params.rootCategory
                ? categoryStore.getCurrentCategoryIdBySlug(
                    route.params.rootCategory,
                    route.params.subCategory,
                  )
                : null
            "
          />
        </template>

        <template #filters>
          <PriceFilter
            :available-min="catalogStore.availableFilters.minPrice"
            :available-max="catalogStore.availableFilters.maxPrice"
            :min-price="minPrice"
            :max-price="maxPrice"
            @update-min="price => setMinPrice(price)"
            @update-max="price => setMaxPrice(price)"
          ></PriceFilter>
        </template>
      </CatalogSidebar>

      <CatalogDrawer v-else />

      <ProductCatalog
        v-if="!catalogStore.isLoading"
        class="catalog-content"
        :class="{ 'catalog-content--desktop': isDesktop }"
      ></ProductCatalog>
    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.categories-section,
.catalog-content {
  margin-top: 50px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 20px;
  }
}

.categories-section {
  &:not(:first-child) {
    margin-top: 80px;
  }

  @media (max-width: $breakpoint-tablet) {
    &:not(:first-child) {
      margin-top: 50px;
    }
  }
}

.catalog-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0 50px;
}

.catalog-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  height: calc(100vh - 90px);
  width: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}
.catalog-content {
  width: 100%;
}
.catalog-content--desktop {
  width: calc(100% - 350px);
}
</style>
