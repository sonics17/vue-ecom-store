<script setup>
import { useCategoryStore } from '@/entities/category/model/store'
import { useProductStore } from '@/entities/product/model/store'
import { AppContainer } from '@/shared/ui/base/app-container'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProductCatalog } from '@/widgets/product-catalog'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { useCatalogStore } from '../model/store'
import { useCatalogQuery } from '../model/useCatalogQuery'
import CatalogFiltersForm from './CatalogFiltersForm.vue'
import CatalogFiltersDrawer from './CatalogFiltersDrawer.vue'
import { CatalogSort } from '@/features/catalog-sort'
import { IconFilter } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/base/typography'
import { Pagination } from '@/shared/ui/base/pagination'
import { LIMIT } from '@/shared/api'
import { AppButton } from '@/shared/ui/base/app-button'

const route = useRoute()
const router = useRouter()
const {
  minPrice,
  maxPrice,
  colors,
  sizes,
  sort,
  page,
  setSort,
  setPage,
  normalizeQuery,
  isSameQuery,
} = useCatalogQuery()
const categoryStore = useCategoryStore()
const catalogStore = useCatalogStore()
const productStore = useProductStore()
const { isDesktop } = useDeviceBreakpoints()

const totalPages = computed(() => {
  return Math.ceil(productStore.totalCount / LIMIT)
})

const onPageUpdate = page => {
  setPage(page)
  window.scrollTo({ top: 0 })
}

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

    const colorIds = catalogStore.availableFilters.colors
      .filter(color => colors.value.includes(color.id))
      .flatMap(color => color.colorIds)

    await productStore.loadProducts({
      categoryIds: catalogStore.categoryIds,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      colors: colorIds,
      sizes: sizes.value,
      sort: sort.value,
      page: page.value,
    })
  },
  { immediate: true },
)
</script>

<template>
  <AppContainer>
    <div class="catalog-page">
      <aside class="catalog-page__sidebar" v-if="isDesktop">
        <div class="catalog-page__sidebar-header">
          <Typography color="secondary" size="lg" weight="semi-bold"
            >Filters</Typography
          >
          <IconFilter class="catalog-page__sidebar-icon"></IconFilter>
        </div>
        <CatalogFiltersForm class="catalog-page__filters-form" />
      </aside>

      <div class="catalog-page__main">
        <div class="catalog-page__controls">
          <CatalogFiltersDrawer
            v-if="!isDesktop"
            class="catalog-page__control"
          />
          <CatalogSort
            :sort-option="sort"
            @change="option => setSort(option)"
            class="catalog-page__control"
          ></CatalogSort>
        </div>

        <div v-if="productStore.isLoadingCatalog" class="">
          Loading products...
        </div>

        <ProductCatalog
          v-else-if="productStore.products.length > 0"
          class="catalog-page__products"
        ></ProductCatalog>

        <div
          class="catalog-page__message"
          v-else-if="productStore.isOutOfRange"
        >
          <p>
            This page does not exist... You can return to the first page of the
            catalog
          </p>
          <AppButton @click="setPage(1)">Go to the first page</AppButton>
        </div>

        <div class="catalog-page__message" v-else>
          <p>There are no such products</p>
        </div>

        <Pagination
          v-if="!productStore.isLoadingCatalog"
          :current-page="page"
          :total-pages="totalPages"
          class="catalog-page__pagination"
          @change="onPageUpdate"
        ></Pagination>
      </div>
    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.catalog-page {
  display: flex;
  justify-content: space-between;
  gap: 0 50px;
}

.catalog-page__sidebar {
  width: 320px;
  box-sizing: border-box;
}

.catalog-page__main {
  flex: 1;
  padding: 0 0 13px 0;
  @media (min-width: $breakpoint-tablet) {
    padding: 13px 0 0 0;
  }
  display: flex;
  flex-direction: column;
}

.catalog-page__products {
  flex: 1;
  margin-top: 13px;
}

.catalog-page__message {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
}

.catalog-page__controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.catalog-page__control {
  flex: 1 0 0;
}

.catalog-page__sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 30px;
  border: 1px solid var(--color-medium-gray);
  border-top: none;
}

.catalog-page__sidebar-icon {
  width: 17px;
  height: 19px;
  color: var(--color-secondary);
}

.catalog-page__pagination {
  align-self: center;
  margin-top: 13px;

  @media (min-width: $breakpoint-tablet) {
    margin-top: 30px;
  }
}
</style>
