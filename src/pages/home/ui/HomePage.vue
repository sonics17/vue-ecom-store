<script setup>
import { computed } from 'vue'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { useCategoryStore } from '@/entities/category'
import { homeCategoriesSections } from '../config/homeCategoriesSections'
import { buildHomeCategoriesSections } from '../model/buildHomeCategoriesSections'
import { AppContainer } from '@/shared/ui/base/app-container'
import BannerSlider from './BannerSlider.vue'
import PromoSection from './PromoSection.vue'
import PromoBanner from './PromoBanner.vue'
import { CategoriesSection } from '@/widgets/categories-section'
import { ReviewsSection } from '@/widgets/reviews-section'

const { isDesktop } = useDeviceBreakpoints()

const categoryStore = useCategoryStore()

const categoriesSections = computed(() => {
  return buildHomeCategoriesSections(
    homeCategoriesSections,
    categoryStore.allCategories,
  )
})
</script>
<template>
  <BannerSlider class="banner-slider" v-if="isDesktop"></BannerSlider>
  <AppContainer>
    <PromoSection class="promo-section"></PromoSection>
    <PromoBanner class="promo-banner"></PromoBanner>
    <CategoriesSection
      v-for="categorySection in categoriesSections"
      :title="categorySection.title"
      :items="categorySection.items"
      :key="categorySection.slug"
      :root-slug="categorySection.slug"
      :is-loading="categoryStore.isLoading"
      class="categories-section"
    ></CategoriesSection>
    <ReviewsSection class="reviews-section"></ReviewsSection>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.banner-slider {
  margin-bottom: 73px;
}
.promo-section {
  margin-top: 10px;
}
.promo-banner {
  margin-top: 73px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 40px;
  }
}
.categories-section {
  margin-top: 80px;
  @media (max-width: $breakpoint-tablet) {
    margin-top: 40px;
  }
}
.reviews-section {
  margin-top: 103px;
  @media (max-width: $breakpoint-tablet) {
    margin-top: 40px;
  }
}
</style>
