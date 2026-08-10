<script setup>
import CollapsibleSection from '@/shared/ui/collapsible-section/CollapsibleSection.vue'
import { useFilterStore } from '../model/store'
import { Typography } from '@/shared/ui/base/typography'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const filterStore = useFilterStore()

const selectedSizes = computed(() => {
  if (route.query.size && route.query.size.length) {
    const ids = route.query.size.split(',').map(Number)
    return new Set(ids)
  }
  return new Set()
})

const toggleSize = id => {
  const curentSizes = route.query.size
    ? new Set(route.query.size.split(',').map(Number))
    : new Set()

  if (selectedSizes.value.has(id)) {
    selectedSizes.value.delete(id)
  } else {
    selectedSizes.value.add(id)
  }
  query.size = selectedSizes.value

  router.push({ query: query })
}
</script>

<template>
  <CollapsibleSection title="Size">
    <div class="size-filter__list">
      <div
        class="size-filter__item"
        v-for="size in filterStore.availableFilters.sizes"
        @click="toggleSize(size.id)"
      >
        <Typography size="xs" weight="semi-bold">{{ size.name }}</Typography>
      </div>
    </div>
  </CollapsibleSection>
</template>

<style lang="scss" scoped>
.size-filter__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(60px, 1fr));
  gap: 15px 20px;
}
.size-filter__item {
  min-height: 30px;
  padding: 7px 18px;
  box-sizing: border-box;
  border: 1px solid var(--color-medium-gray);
  text-align: center;
  border-radius: 8px;
  cursor: pointer;

  &--selected {
    border: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
  }
}
</style>
