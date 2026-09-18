<script setup>
import { CategoryNavigation } from '@/entities/category'
import { PriceFilter, SizeFilter, ColorFilter } from '@/features/catalog-filter'
import { useCategoryStore } from '@/entities/category/model/store'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '../model/store'
import { useCatalogQuery } from '../model/useCatalogQuery'

const route = useRoute()
const categoryStore = useCategoryStore()
const catalogStore = useCatalogStore()

const {
  minPrice,
  maxPrice,
  colors,
  sizes,
  setPriceRange,
  setColors,
  setSizes,
} = useCatalogQuery()
</script>

<template>
  <div class="catalog-filters-form">
    <CategoryNavigation
      :activeCategoryId="
        route.params.rootCategory
          ? categoryStore.getCurrentCategoryIdBySlug(
              route.params.rootCategory,
              route.params.subCategory,
            )
          : null
      "
      class="catalog-filters-form__navigation catalog-filters-form__item"
    />

    <PriceFilter
      v-if="
        catalogStore.availableFilters.minPrice !==
        catalogStore.availableFilters.maxPrice
      "
      :available-min="catalogStore.availableFilters.minPrice"
      :available-max="catalogStore.availableFilters.maxPrice"
      :min-price="minPrice"
      :max-price="maxPrice"
      @update="priceRange => setPriceRange(priceRange)"
      class="catalog-filters-form__item"
    ></PriceFilter>

    <SizeFilter
      v-if="catalogStore.availableFilters.sizes.length"
      :available-sizes="catalogStore.availableFilters.sizes"
      :sizes="sizes"
      @update="sizes => setSizes(sizes)"
      class="catalog-filters-form__item"
    ></SizeFilter>

    <ColorFilter
      v-if="catalogStore.availableFilters.colors.length"
      :available-colors="catalogStore.availableFilters.colors"
      :colors="colors"
      @update="colors => setColors(colors)"
      class="catalog-filters-form__item"
    >
    </ColorFilter>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
.catalog-filters-form {
  @media (min-width: $breakpoint-tablet) {
    border-right: 1px solid var(--color-medium-gray);
    border-left: 1px solid var(--color-medium-gray);
  }
}
.catalog-filters-form__navigation {
  padding: 0 40px 40px 30px;
  border-bottom: 1px solid var(--color-medium-gray);

  @media (min-width: $breakpoint-tablet) {
    padding: 40px 30px;
  }
}

.catalog-filters-form__item:last-child > *:last-child {
  @media (max-width: calc($breakpoint-tablet - 1px)) {
    border-bottom: none;
  }
}
</style>
