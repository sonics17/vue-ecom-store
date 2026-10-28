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
    <div class="color-filter__grid">
      <label
        class="color-filter__item"
        v-for="color in props.availableColors"
        :key="color.id"
      >
        <input
          type="checkbox"
          class="color-filter__checkbox"
          :checked="colors.includes(color.id)"
          @change="onChange(color.id, $event.target.checked)"
        />
        <span
          :style="{
            background:
              color.hex === 'multicolor'
                ? 'linear-gradient(45deg in hsl longer hue, hsl(0, 45%, 65%) 0%, hsl(360, 45%, 65%) 100%)'
                : `#${color.hex}`,
            border:
              color.hex === 'ffffff' ? '2px solid #F4F1F1' : 'transparent',
          }"
          class="color-filter__custom-checkbox"
        ></span>
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
.color-filter__grid {
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

  &:has(.color-filter__checkbox:checked) {
    outline: 2px solid var(--color-purple-opacity-50);
  }

  &:has(.color-filter__checkbox:focus-visible) {
    outline: auto -webkit-focus-ring-color;
  }
}

.color-filter__checkbox {
  appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  outline: none;
}

.color-filter__custom-checkbox {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 2px solid transparent;
  box-sizing: border-box;
}
</style>
