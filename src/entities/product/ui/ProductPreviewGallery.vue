<script setup>
import defaultImageUrl from '@/shared/assets/images/placeholder.svg';
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints';
import { computed, ref } from 'vue';

const { isDesktop } = useDeviceBreakpoints();

const MAX_GALLERY_SIZE = 3;

const props = defineProps({
  images: {
    type: Array,
    default: []
  }
})

const currentIndex = ref(0)

const isDefaultImage = computed(() => {
  return !props.images || props.images.length === 0 
})

const displayedImages = computed(() => {
  if (isDefaultImage.value) return []
  return props.images.slice(0, MAX_GALLERY_SIZE)
})

const currentImage = computed(() => {
  return isDefaultImage.value ? defaultImageUrl : displayedImages.value[currentIndex.value]
})

</script>

<template>
  <div class="preview-gallery">
    <img 
      :src="currentImage" 
      alt="product image"
      class="preview-gallery__image"
      :class="{'default-image': isDefaultImage}"
    >

    <div v-if="isDesktop && displayedImages.length > 1" class="preview-gallery__zones">
      <div
        v-for="(image, index) in displayedImages"
        :key="index"
        class="preview-gallery__zone"
        :style="{flex: `1 1 ${100/displayedImages.length}%`}"
        @mouseenter="currentIndex = index"
      >
      </div>
    </div>

    <div v-if="isDesktop && displayedImages.length > 1" class="preview-gallery__dots">
      <span 
        v-for="(image, index) in displayedImages"
        :key="index"
        @mouseenter="currentIndex = index"
        class="preview-gallery__dot"
        :class="{'preview-gallery__dot--active': currentIndex === index}"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.preview-gallery {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

.default-image {
  width: 100%;
  object-fit: contain;
  object-position: center;
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