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
  <section class="promo-section">
    <PromoCard
      v-for="(card, index) in promoCards"
      v-bind="card"
      :key="index"
    ></PromoCard>
  </section>
</template>

<style scoped>
.promo-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
</style>