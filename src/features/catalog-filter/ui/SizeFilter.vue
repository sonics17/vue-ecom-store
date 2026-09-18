<script setup>
import { Typography } from '@/shared/ui/base/typography'
import { FilterCollapsible } from '@/shared/ui/filter-collapsible'

const props = defineProps({
  availableSizes: {
    type: Array,
    default: () => [],
  },
  sizes: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update'])

const toggleSize = id => {
  const newSizes = props.sizes.includes(id)
    ? props.sizes.filter(sizeId => sizeId !== id)
    : [...props.sizes, id]

  emit('update', newSizes)
}
</script>

<template>
  <FilterCollapsible title="Size">
    <div class="size-filter__list">
      <div
        class="size-filter__item"
        v-for="size in availableSizes"
        @click="toggleSize(size.id)"
        :class="{
          'size-filter__item--selected': sizes.includes(size.id),
        }"
      >
        <Typography size="xs" weight="semi-bold">{{ size.name }}</Typography>
      </div>
    </div>
  </FilterCollapsible>
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
    border-color: transparent;
    outline: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
  }
}
</style>
