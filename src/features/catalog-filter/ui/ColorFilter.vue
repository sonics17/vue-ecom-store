<script setup>
import { FilterCollapsible } from '@/shared/ui/filter-collapsible'
import { Typography } from '@/shared/ui/base/typography'

const props = defineProps({
  availableColors: {
    type: Array,
    default: () => [],
  },
  colors: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update'])

const onChange = (id, checked) => {
  const newColors = checked
    ? [...props.colors, id]
    : props.colors.filter(colorId => colorId !== id)

  emit('update', newColors)
}
</script>

<template>
  <FilterCollapsible title="Color">
    <div class="colors-filter__grid">
      <label
        class="color-filter__item"
        v-for="color in props.availableColors"
        :key="color.id"
      >
        <input
          class="color-filter__color"
          type="checkbox"
          :style="{
            background:
              color.hex === 'multicolor'
                ? 'linear-gradient(45deg in hsl longer hue, hsl(0, 45%, 65%) 0%, hsl(360, 45%, 65%) 100%)'
                : `#${color.hex}`,
            border: color.hex === 'ffffff' ? '2px solid #F4F1F1' : 'none',
          }"
          :checked="colors.includes(color.id)"
          @change="onChange(color.id, $event.target.checked)"
        />
        <Typography
          class="color-filter__name"
          color="secondary"
          weight="semi-bold"
          size="xs"
          >{{ color.name }}</Typography
        >
      </label>
    </div>
  </FilterCollapsible>
</template>

<style lang="scss" scoped>
.colors-filter__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 20px 15px;
}

.color-filter__item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 7px 5px;
  border-radius: 8px;

  &:has(input:checked) {
    outline: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
  }
}

.color-filter__color {
  appearance: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin: 0;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
