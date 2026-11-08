<script setup>
import { computed, ref } from 'vue'
import defaultImageUrl from '@/shared/assets/images/placeholder.svg'
import { IconChevronRight } from '@/shared/ui/icons'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination]

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const { isDesktop } = useDeviceBreakpoints()

const MAX_VISIBLE = 3
const currentImageIndex = ref(0)

const isDefaultImage = computed(() => {
  return !props.images || props.images.length === 0
})

const currentImage = computed(() => {
  return isDefaultImage.value
    ? defaultImageUrl
    : props.images[currentImageIndex.value]
})

const showPrev = () => {
  if (currentImageIndex.value === 0) {
    return
  }

  currentImageIndex.value--

  if (currentImageIndex.value < startThumbnail.value) {
    startThumbnail.value--
  }
}

const showNext = () => {
  if (currentImageIndex.value === props.images.length - 1) {
    return
  }

  currentImageIndex.value++

  if (currentImageIndex.value >= startThumbnail.value + MAX_VISIBLE) {
    startThumbnail.value++
  }
}

const startThumbnail = ref(0)

const visibleImages = computed(() => {
  return props.images.slice(
    startThumbnail.value,
    startThumbnail.value + MAX_VISIBLE,
  )
})
</script>

<template>
  <div class="gallery">
    <div class="gallery__desktop" v-if="isDesktop">
      <div class="gallery__controls" v-if="!isDefaultImage">
        <button
          class="gallery__button gallery__button--prev"
          @click="showPrev"
          :disabled="currentImageIndex === 0"
        >
          <IconChevronRight
            class="gallery__button-icon gallery__button-icon--up"
          />
        </button>

        <div class="gallery__thumbnails">
          <div
            v-for="(img, index) in visibleImages"
            :key="index"
            class="gallery__thumbnail"
            :class="{
              'gallery__thumbnail--active':
                index + startThumbnail === currentImageIndex,
            }"
            @click="currentImageIndex = index + startThumbnail"
          >
            <img :src="img" alt="" />
          </div>
        </div>

        <button
          class="gallery__button gallery__button--next"
          @click="showNext"
          :disabled="currentImageIndex === images.length - 1"
        >
          <IconChevronRight
            class="gallery__button-icon gallery__button-icon--down"
          />
        </button>
      </div>
      <div
        class="gallery__main-image"
        :class="{ 'gallery__mobile-default': isDefaultImage }"
      >
        <img :src="currentImage" />
      </div>
    </div>

    <div class="gallery__mobile" v-else>
      <Swiper
        v-if="!isDefaultImage"
        :modules="modules"
        slides-per-view="1"
        :pagination="{
          clickable: false,
          bulletActiveClass: 'swiper-bullet-active',
        }"
        class="swiper"
      >
        <SwiperSlide
          v-for="(image, index) in images"
          :key="index"
          class="swiper-slide"
        >
          <img :src="image" alt="" />
        </SwiperSlide>
      </Swiper>

      <div class="gallery__mobile-default" v-else>
        <img :src="defaultImageUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:deep(.swiper-bullet-active) {
  background-color: var(--color-white);
  opacity: 1 !important;
}
</style>
<style lang="scss" scoped>
.gallery {
  width: 100%;
  height: 100%;
  min-width: 0;
}
.gallery__desktop {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  height: min(700px, calc(100dvh - 120px));
}

.gallery__controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.gallery__thumbnails {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.gallery__thumbnail {
  cursor: pointer;
  width: 68px;
  height: 68px;
  border-radius: 9px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &--active {
    box-shadow: 0 0 0 1px var(--color-purple);
  }
}

.gallery__button {
  cursor: pointer;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: none;
  background-color: var(--color-white);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px var(--color-medium-gray);

  &-icon {
    width: 6px;
    height: auto;

    &--up {
      transform: rotate(-90deg);
    }
    &--down {
      transform: rotate(90deg);
    }
  }

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
  &:active {
    background-color: var(--color-secondary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    background-color: var(--color-white);
    color: var(--color-primary);
  }
}

.gallery__main-image {
  flex: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

@media (max-width: 1100px) {
  .gallery__desktop {
    flex-direction: column-reverse;
    &::after {
      inset: 0;
      background-color: transparent;
    }
  }
  .gallery__controls {
    display: flex;
    flex-direction: row;
  }
  .gallery__thumbnails {
    flex-direction: row;
  }
  .gallery__button-icon--up {
    transform: rotate(-180deg);
  }
  .gallery__button-icon--down {
    transform: rotate(0deg);
  }
}

.gallery__mobile {
  width: 100%;
  height: 100%;
}

.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: 100%;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.gallery__mobile-default {
  background-color: var(--color-light-gray);
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
}
</style>
