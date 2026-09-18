<script setup>
import { ref } from 'vue'
import { ChevronToggle } from '../base/chevron-toggle'
import { Typography } from '../base/typography'

defineProps({
  title: String,
})

const isOpen = ref(true)
</script>

<template>
  <div class="filter-collapsible">
    <div class="filter-collapsible__title">
      <Typography tag="h3" size="lg" weight="medium" color="secondary">
        {{ title }}
      </Typography>
      <ChevronToggle
        :is-open="isOpen"
        @toggle="isOpen = !isOpen"
      ></ChevronToggle>
    </div>
    <Transition name="expand" appear>
      <div v-show="isOpen" class="filter-collapsible__content">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;

.filter-collapsible__title {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-collapsible__content {
  padding: 40px 40px;
}

.filter-collapsible__title,
.filter-collapsible__content {
  border-bottom: 1px solid var(--color-medium-gray);
}

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
