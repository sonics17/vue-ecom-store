<script setup>
import defaultImageUrl from '@/shared/assets/images/placeholder.svg'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { computed, ref, watch } from 'vue'

const { isDesktop } = useDeviceBreakpoints()

const MAX_GALLERY_SIZE = 3

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)

const isDefaultImage = computed(() => {
  return !props.images || props.images.length === 0
})

const displayedImages = ref([])

const handleImageError = index => {
  displayedImages.value[index] = defaultImageUrl
}

watch(
  () => props.images,
  images => {
    if (isDefaultImage.value) {
      displayedImages.value = []
    } else {
      displayedImages.value = images.slice(0, MAX_GALLERY_SIZE)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="preview-gallery">
    <img
      v-if="isDefaultImage"
      :src="defaultImageUrl"
      placeholder="product default image"
      class="preview-gallery__image preview-gallery__image--default"
    />

    <template v-else>
      <img
        v-for="(image, index) in displayedImages"
        :key="image"
        :src="image"
        alt="product image"
        class="preview-gallery__image"
        :class="{
          'preview-gallery__image--active': index === currentIndex,
          'preview-gallery__image--fallback': image === defaultImageUrl,
        }"
        loading="lazy"
        @error="handleImageError(index)"
      />
    </template>

    <div
      v-if="isDesktop && displayedImages.length > 1"
      class="preview-gallery__zones"
    >
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        class="preview-gallery__zone"
        :style="{ flex: `1 1 ${100 / displayedImages.length}%` }"
        @mouseenter="currentIndex = index"
      ></div>
    </div>

    <div
      v-if="isDesktop && displayedImages.length > 1"
      class="preview-gallery__dots"
    >
      <span
        v-for="(image, index) in displayedImages"
        :key="index"
        @mouseenter="currentIndex = index"
        class="preview-gallery__dot"
        :class="{ 'preview-gallery__dot--active': currentIndex === index }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.preview-gallery {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.preview-gallery__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  z-index: 1;
}

.preview-gallery__image--active {
  opacity: 1;
  z-index: 2;
}

.preview-gallery__zones {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
}

.preview-gallery__image--fallback,
.preview-gallery__image--default {
  background-color: var(--color-light-gray);
  object-fit: contain;
  object-position: center;
  opacity: 0.6;
}

.preview-gallery__dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 5;
}

.preview-gallery__dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--color-secondary);
}

.preview-gallery__dot--active {
  width: 7px;
  height: 7px;
  background-color: var(--color-white);
}
</style>
