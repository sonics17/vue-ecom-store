<script setup>
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'

const { isMobile } = useDeviceBreakpoints()
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="auth-container">
    <div v-if="!isMobile" class="auth-container__image">
      <img :src="imageUrl" alt="auth banner" />
    </div>
    <div class="auth-container__content">
      <div class="auth-container__inner-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.auth-container {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

.auth-container__image {
  flex: 0 0 50%;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.auth-container__content {
  align-self: center;
  padding: 12px;
  box-sizing: border-box;
  flex: 1;

  @media (min-width: $breakpoint-tablet) {
    padding: 12px 40px 12px 40px;
    flex: 0 0 50%;
  }

  @media (max-height: 700px) {
    padding: 0 12px 12px;
  }
}

.auth-container__inner-container {
  @media (min-width: $breakpoint-tablet) {
    max-width: 500px;
  }
}
</style>
