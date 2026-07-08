<script setup>
import cardBanner1 from '@/shared/assets/images/banners/card-banner-1.webp';
import cardBanner2 from '@/shared/assets/images/banners/card-banner-2.webp';
import PromoCard from './PromoCard.vue';

const promoCards = [
  {
    title: 'Low Price',
    subtitle: 'High Coziness',
    text: 'UPTO 50% OFF',
    image: cardBanner1,
    link: {name: 'catalog', params: {rootCategory: 'women', subCategory: 't-shirts'}}
  },
  {
    title: 'Beyoung Presents',
    subtitle: 'Breezy Summer Style',
    text: 'UPTO 50% OFF',
    image: cardBanner2,
    link: {name: 'catalog', params: {rootCategory: 'women', subCategory: 't-shirts'}}
  }
]
</script>

<template>
  <div class="promo-section">
    <PromoCard
      v-for="(card, index) in promoCards"
      v-bind="card"
      :key="index"
      class="promo-section__item"
    ></PromoCard>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/_variables.scss" as *;

.promo-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: $breakpoint-tablet) {
    gap: 20px;
    grid-template-columns: 100%;
    grid-auto-rows: minmax(6rem, 22rem);
  }
}
</style>