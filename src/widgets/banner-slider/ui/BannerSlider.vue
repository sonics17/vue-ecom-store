<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import BannerSlide from './BannerSlide.vue'
import { slides } from '../data/slides'

const modules = [Pagination, Autoplay]
</script>

<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    :pagination="{
      clickable: true,
      bulletClass: 'swiper-bullet',
      bulletActiveClass: 'swiper-bullet-active',
      horizontalClass: 'pagination-horizontal',
    }"
    :autoplay="{ delay: 5000 }"
    class="swiper"
  >
    <swiper-slide v-for="slide in slides" class="swiper-slide" :key="slide.id">
      <BannerSlide v-bind="slide"></BannerSlide>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
:deep(.pagination-horizontal) {
  bottom: 50px !important;
  display: flex !important;
  width: 150px !important;
  gap: 1px !important;
  align-items: center !important;
  left: 50%;
  transform: translateX(-50%);
}
:deep(.swiper-bullet) {
  display: inline-block;
  height: 10px !important;
  margin: 0 !important;
  min-width: 10px !important;
  flex-grow: 1 !important;
  border-radius: 0 !important;
  background-color: var(--color-white);
  opacity: 0.5;
  transition: all 0.2s ease !important;
}

:deep(.swiper-bullet:last-child) {
  border-radius: 0 13px 13px 0 !important;
}

:deep(.swiper-bullet:first-child) {
  border-radius: 13px 0px 0px 13px !important;
}
:deep(.swiper-bullet-active) {
  opacity: 1 !important;
}

.swiper {
  height: 80vh;
  min-height: 400px;
}

.swiper-slide {
  height: 100%;
}
</style>
