<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Typography } from '@/shared/ui/base/typography'
import { reviews } from '../data/reviews'
import ReviewCard from './ReviewCard.vue'

const modules = [Pagination]
</script>

<template>
  <section class="reviews-section">
    <Typography
      has-line
      tag="h3"
      size="xl"
      weight="bold"
      class="reviews-section__title"
      >Feedback</Typography
    >
    <swiper
      :modules="modules"
      :slides-per-view="3"
      :slides-per-group="3"
      :space-between="24"
      :pagination="{ clickable: true }"
      class="reviews-section__items"
    >
      <swiper-slide
        v-for="review in reviews"
        :key="review.id"
        class="reviews-section__item"
      >
        <ReviewCard v-bind="review"></ReviewCard>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.reviews-section__title {
  margin-bottom: 70px;

  @media (max-width: $breakpoint-tablet) {
    margin-bottom: 30px;
  }
}
:deep(.swiper-wrapper) {
  align-items: stretch;
  padding-bottom: 40px;
}
:deep(.swiper-slide) {
  height: auto !important;
}
:deep(.swiper-pagination-bullet-active) {
  background: var(--color-primary);
}
:deep(.swiper-pagination) {
  bottom: 13px;
}
</style>
