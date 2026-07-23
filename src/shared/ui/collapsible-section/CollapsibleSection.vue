<script setup>
import { ref } from 'vue';
import { ChevronToggle } from '../base/chevron-toggle';
import { Typography } from '../base/typography';

defineProps({
  title: String
})

const isOpen = ref(true)
</script>

<template>
  <div class="filter-title-layout">
    <Typography tag="h3" size="lg" weight="medium" color="secondary">{{title}}</Typography>
    <ChevronToggle :is-open="isOpen" @toggle="isOpen = !isOpen"></ChevronToggle>
  </div>
  <Transition name="expand" appear>
    <div 
      v-show="isOpen"
      class="filter-section-layout">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 800px;
  opacity: 1;
}
</style>