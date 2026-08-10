<script setup>
import ChevronRight from '@/shared/assets/images/chevron-right.svg'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span @click="$emit('toggle')" class="chevron-wrapper">
    <img
      :src="ChevronRight"
      alt="arrow"
      class="chevron"
      :class="{ 'chevron--open': isOpen }"
    />
  </span>
</template>

<style scoped>
.chevron-wrapper {
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron {
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

.chevron--open {
  transform: rotate(-90deg);
}
</style>
