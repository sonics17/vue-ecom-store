<script setup>
import { useCategoryStore } from '@/entities/category/model/store';
import { AppContainer } from '@/shared/ui/base/AppContainer';
import { computed, onMounted } from 'vue';
import { buildCatalogCategoriesSections } from '../model/buildCatalogCategoriesSections';
import { CategoriesSection } from '@/widgets/categories-section';
import { useRoute } from 'vue-router';

const categoryStore = useCategoryStore();

const categoriesSections = computed(() => {
  return buildCatalogCategoriesSections(categoryStore.allCategories, categoryStore.rootCategories)
})

const route = useRoute();


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
    </div>
  </AppContainer>
</template>

<style scoped>
.catalog-container {
  margin-top: 30px;
}
.categories-section:not(:first-child) {
  margin-top: 103px;
}
</style>