<script setup>
import { useCategoryStore } from '@/entities/category/model/store';
import { AppContainer } from '@/shared/ui/base/app-container';
import { computed } from 'vue';
import { buildCatalogCategoriesSections } from '../model/buildCatalogCategoriesSections';
import { CategoriesSection } from '@/widgets/categories-section';
import { useRoute } from 'vue-router';
import { ProductCatalog } from '@/widgets/product-catalog';
import { CatalogSidebar } from '@/widgets/catalog-sidebar';
import { CatalogFilter } from '@/features/catalog-filter';
import { CategoryNavigation } from '@/entities/category';
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints';
import { CatalogDrawer } from '@/widgets/catalog-drawer';

const route = useRoute();
const categoryStore = useCategoryStore();
const {isDesktop} = useDeviceBreakpoints();

const categoriesSections = computed(() => {
  return buildCatalogCategoriesSections(categoryStore.allCategories, categoryStore.rootCategories)
})
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
            <CatalogFilter />
          </template>
        </CatalogSidebar>

        <CatalogDrawer v-else />

        <ProductCatalog
          class="catalog-content"
          :class="{'catalog-content--desktop': isDesktop}"
          :rootCategorySlug="route.params.rootCategory"
          :subCategorySlug="route.params.subCategory"
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
  height: 100vh;
  overflow: scroll;
  scrollbar-width: none;
}
.catalog-content {
  width: 100%;
}
.catalog-content--desktop {
  width: calc(100% - 350px);
}
</style>