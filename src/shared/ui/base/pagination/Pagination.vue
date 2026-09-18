<script setup>
import { computed } from 'vue'
import { IconChevronRight } from '../../icons'

const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
  currentPage: Number,
})

const emit = defineEmits(['change'])

const displayedPages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const maxVisible = 5
  const delta = 2

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = []
  pages.push(1)

  if (current - delta > 2) {
    pages.push('...')
  }

  for (
    let i = Math.max(current - delta, 2);
    i <= Math.min(current + delta, total - 1);
    i++
  ) {
    pages.push(i)
  }

  if (current + delta < total - 1) {
    pages.push('...')
  }

  pages.push(total)

  return pages
})

const goToPrevPage = () => {
  emit('change', props.currentPage - 1)
}

const goToNextPage = () => {
  emit('change', props.currentPage + 1)
}

const goToPage = page => {
  emit('change', page)
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 0">
    <button
      @click="goToPrevPage"
      class="pagination__control pagination__control--prev"
      :disabled="currentPage === 1"
    >
      <IconChevronRight
        class="pagination__chevron pagination__chevron--left"
      ></IconChevronRight>
    </button>
    <button
      v-for="page in displayedPages"
      :key="page"
      :disabled="page === '...'"
      @click="goToPage(page)"
      class="pagination__control"
      :class="{ 'pagination__control--active': page === currentPage }"
    >
      {{ page }}
    </button>
    <button
      @click="goToNextPage"
      class="pagination__control pagination__control--next"
      :disabled="currentPage === totalPages"
    >
      <IconChevronRight class="pagination__chevron"></IconChevronRight>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 10px;
}
.pagination__control {
  background-color: transparent;
  border: none;
  outline: none;
  width: 44px;
  height: 44px;
  line-height: 0;
  cursor: pointer;
  position: relative;

  &--active {
    color: var(--color-purple);
    font-weight: var(--font-weight-semi-bold);
    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      height: 1px;
      width: 20px;
      background-color: var(--color-purple);
    }
  }

  &[disabled] {
    cursor: default;
  }
}
.pagination__chevron {
  transform: scale(0.8);
  &--left {
    transform: scale(0.8) rotate(180deg);
  }
}
</style>
