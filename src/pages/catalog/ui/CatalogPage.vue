<script setup>
import { useCategoryStore } from '@/entities/category/model/store';
import { useProductStore } from '@/entities/product/model/store';
import { useFilterStore } from '@/features/catalog-filter/model/store';
import { AppContainer } from '@/shared/ui/base/app-container';
import { computed, ref, watch, watchEffect, onUnmounted, onMounted } from 'vue';
import { buildCatalogCategoriesSections } from '../model/buildCatalogCategoriesSections';
import { CategoriesSection } from '@/widgets/categories-section';
import { useRoute, useRouter } from 'vue-router';
import { ProductCatalog } from '@/widgets/product-catalog';
import { CatalogSidebar } from '@/widgets/catalog-sidebar';
import { CatalogFilter } from '@/features/catalog-filter';
import { CategoryNavigation } from '@/entities/category';
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints';
import { CatalogDrawer } from '@/widgets/catalog-drawer';


const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const filterStore = useFilterStore();
const {isDesktop} = useDeviceBreakpoints();


const categoriesSections = computed(() => {
  return buildCatalogCategoriesSections(categoryStore.allCategories, categoryStore.rootCategories)
})


const currentCategoryIds = computed(() => {
  return categoryStore.getCategoryIdsBySlug(route.params.rootCategory, route.params.subCategory)
})


// const queryParams = computed(() => {
//   return {
//     minPrice: Number(route.query.minPrice) || filterStore.filtersByCategory.minPrice,
//     maxPrice: Number(route.query.maxPrice) || filterStore.filtersByCategory.maxPrice,
//     colors: Number(route.query.color) || filterStore.filtersByCategory.selectedColorIds,
//     sizes: Number(route.query.size) || filterStore.filtersByCategory.selectedSizeIds
//   }
// })

const buildRequestFilters = () => {
  return {
    minPrice: route.query.minPrice ? Number(route.query.minPrice) : filterStore.availableFilters.minPrice,
    maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : filterStore.availableFilters.maxPrice,
    colors: route.query.color ? String(route.query.color).split(',').map(Number) : filterStore.availableFilters.colors.flatMap(c => c.childrenIds),
    sizes: route.query.size ? String(route.query.size).split(',').map(Number) : filterStore.availableFilters.sizes.map(s => s.id)
  }
}

watch(currentCategoryIds, async (newIds) => {
  console.log("CATEGORY WATCH")
  if (!newIds || newIds.length === 0) return

  await filterStore.loadFiltersForCategory(newIds)
  
  const filters = buildRequestFilters()

  await productStore.fetchProducts(
    newIds,
    filters.minPrice,
    filters.maxPrice,
    filters.colors,
    filters.sizes
  )
}, {immediate: true})


// watch(
//   () => [route.params.rootCategory, route.params.subCategory],
//   async ([root, sub]) => {
//     console.log("CATEGORY WATCH")

//     const ids = categoryStore.getCategoryIdsBySlug(root, sub)

//     await filterStore.loadFiltersForCategory(ids)

//     const filters = buildRequestFilters()

//     await productStore.fetchProducts(
//       ids,
//       filters.minPrice,
//       filters.maxPrice,
//       filters.colors,
//       filters.sizes
//     )
//   },
//   { immediate: true }
// )


</script>

<template>
  <AppContainer>
    <div class="catalog-container">

      <template v-if="!route.params.rootCategory">
        <CategoriesSection
          v-for="categorySection in categoriesSections"
          :key="categorySection.slug"
          :title="categorySection.title"
          :items="categorySection.items"
          :rootSlug="categorySection.rootSlug"
          class="categories-section"
        ></CategoriesSection>
      </template>

      <template v-else>

        <CatalogSidebar v-if="isDesktop" class="catalog-sidebar">
          <template #navigation>
            <CategoryNavigation
              :activeCategoryId="categoryStore.getCurrentCategoryIdBySlug(route.params.rootCategory, route.params.subCategory)"
            />
          </template>
            
          <template #filters>
            <CatalogFilter
            />
          </template>
        </CatalogSidebar>

        <CatalogDrawer v-else />

        <ProductCatalog
          v-if="!productStore.isLoading"
          class="catalog-content"
          :class="{'catalog-content--desktop': isDesktop}"
        ></ProductCatalog>
      </template>

    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/_variables.scss" as *;

.categories-section, .catalog-content {
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
  gap: 0 50px;
}

.catalog-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left:  0;
  width: 300px;
  height: 80vh;
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