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

const onChange = (id, checked) => {
  const newSizes = checked
    ? [...props.sizes, id]
    : props.sizes.filter(sizeId => sizeId !== id)

  emit('update', newSizes)
}
</script>

<template>
  <FilterCollapsible title="Size">
    <div class="size-filter__list">
      <label class="size-filter__item" v-for="size in availableSizes">
        <input
          type="checkbox"
          class="size-filter__size"
          :checked="sizes.includes(size.id)"
          @change="onChange(size.id, $event.target.checked)"
        />
        <Typography size="xs" weight="semi-bold">{{ size.name }}</Typography>
      </label>
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
  position: relative;
  min-height: 30px;
  padding: 7px 18px;
  box-sizing: border-box;
  border: 1px solid var(--color-medium-gray);
  text-align: center;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:has(input:checked) {
    border-color: transparent;
    outline: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
  }
}

.size-filter__size {
  appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
