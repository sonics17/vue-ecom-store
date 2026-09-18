<script setup>
import { IconChevronRight } from '../../icons'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span @click="$emit('toggle')" class="chevron-wrapper">
    <IconChevronRight
      class="chevron"
      :class="{ 'chevron--open': isOpen }"
    ></IconChevronRight>
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
  color: var(--color-secondary);
  width: 7px;
  height: 13px;
}

.chevron--open {
  transform: rotate(-90deg);
}
</style>
