<script setup>
import promoBanner1 from '@/shared/assets/images/banners/promo-banner-1.webp';
import promoBanner2 from '@/shared/assets/images/banners/promo-banner-2.webp';
import { Typography } from '../base/Typography';
import { AppButton } from '../base/AppButton';
</script>

<template>
  <section class="promo-banner">
    <div class="promo-banner__left">
      <div class="promo-banner__image promo-banner__image-filter">
        <img :src="promoBanner1" alt="promo banner 1">
      </div>
    </div>

    <div class="promo-banner__content">
      <Typography tag="h3" size="2xl" color="white" weight="extra-bold" class="promo-banner__title">
        WE MADE YOUR EVERYDAY FASHION BETTER!
      </Typography>
      <Typography color="white" class="promo-banner__text">
        In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7
      </Typography>
      <AppButton color="white">Shop now</AppButton>
    </div>

    <div class="promo-banner__right">
      <div class="promo-banner__image">
        <img :src="promoBanner2" alt="promo banner 1">
      </div>
    </div>
    
  </section>

</template>

<style scoped>
.promo-banner {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 300px;
  max-height: 600px;
  border-radius: 12px;
  overflow: hidden;
}
.promo-banner__left, .promo-banner__content {
  grid-area: 1 / 1;
}
.promo-banner__left, .promo-banner__right {
  height: 100%;
  overflow: hidden;
}
.promo-banner__image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.promo-banner__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.promo-banner__image-filter img {
  filter: brightness(0.5);
}
.promo-banner__content {
  position: relative;
  z-index: 30;
  padding: 20px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: start;
}
.promo-banner__title {
  text-transform: uppercase;
  line-height: 1.5;
}
.promo-banner__text {
  line-height: 1.4;
}
</style>