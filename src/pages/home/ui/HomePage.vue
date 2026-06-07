<script setup>
import { useCategoryStore } from '@/entities/category/model/store';
import { AppContainer } from '@/shared/ui/base/app-container';
import { PromoBanner, PromoSection } from '@/shared/ui/promo';
import { BannerSlider } from '@/widgets/banner-slider';
import { CategoriesSection } from '@/widgets/categories-section';
import { homePageCategoriesSections } from '../model/homePageCategoriesSections';
import { buildHomeCategoriesSections } from '../model/buildHomeCategoriesSections';
import { computed } from 'vue';
import { ReviewsSection } from '@/widgets/reviews-section';

const categoryStore = useCategoryStore();

const categoriesSections = computed(() => {
  return buildHomeCategoriesSections(homePageCategoriesSections, categoryStore.allCategories)
})

</script>
<template>
  <BannerSlider></BannerSlider>
  <AppContainer>
    <PromoSection class="promo-section"></PromoSection>
    <PromoBanner class="promo-banner"></PromoBanner>
    <CategoriesSection
      v-for="categorySection in categoriesSections"
      :title="categorySection.title"
      :items="categorySection.items"
      :key="categorySection.slug"
      :root-slug="categorySection.slug"
      class="categories-section"
    ></CategoriesSection>
    <ReviewsSection class="reviews-section"></ReviewsSection>
  </AppContainer>
</template>
<style scoped>
.promo-section {
  margin-top: 130px;
}
.promo-banner {
  margin-top: 73px;
}
.categories-section {
  margin-top: 80px;
}
.reviews-section {
  margin-top: 103px;
}
</style>