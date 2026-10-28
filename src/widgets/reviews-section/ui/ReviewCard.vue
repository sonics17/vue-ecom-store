<script setup>
import { Typography } from '@/shared/ui/base/typography/index.js'
import StarRating from './StarRating.vue'
import { IconUser } from '@/shared/ui/icons'
import { ref } from 'vue'

defineProps({
  userName: String,
  reviewText: String,
  rating: Number,
  imageUrl: String,
})

const isDefaultImage = ref(false)

const handleImageError = () => {
  isDefaultImage.value = true
}
</script>

<template>
  <div class="review-card">
    <div class="review-card__top">
      <div class="review-card__image">
        <img
          v-if="imageUrl && !isDefaultImage"
          :src="imageUrl"
          alt="user avatar"
          @error="handleImageError"
        />
        <IconUser v-else class="review-card__image--default"></IconUser>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.review-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.review-card__image--default {
  height: 80%;
  width: auto;
  color: var(--color-secondary);
}
</style>
