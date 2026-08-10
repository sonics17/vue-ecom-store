<script setup>
import { Typography } from '@/shared/ui/base/typography/index.js'
import StarRating from './StarRating.vue'

defineProps({
  userName: String,
  reviewText: String,
  rating: Number,
  imageUrl: String,
})
</script>

<template>
  <div class="review-card">
    <div class="review-card__top">
      <div class="review-card__image">
        <img :src="imageUrl" alt="" />
      </div>
      <StarRating :rating="rating"></StarRating>
    </div>
    <Typography
      tag="span"
      weight="medium"
      size="md"
      class="review-card__name swiper-no-swiping"
      >{{ userName }}</Typography
    >
    <Typography
      tag="p"
      size="xs"
      color="secondary"
      class="review-card__text swiper-no-swiping"
      >{{ reviewText }}</Typography
    >
  </div>
</template>

<style scoped>
.review-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  height: 100%;
  box-sizing: border-box;
}
.review-card__top {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
}
.review-card__image {
  width: 58px;
  height: 58px;
  overflow: hidden;
}
.review-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
