<script setup>
import { CollapsibleSection } from '@/shared/ui/collapsible-section'
import { Typography } from '@/shared/ui/base/typography'
import { ref, watch } from 'vue'

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

// const selectedColors = ref([])

const toggleColor = id => {
  // const index = selectedColors.value.indexOf(id)

  // if (index === -1) {
  //   selectedColors.value.push(id)
  // } else {
  //   selectedColors.value.splice(index, 1)
  // }

  const newColors = props.colors.includes(id)
    ? props.colors.filter(colorId => colorId !== id)
    : [...props.colors, id]

  emit('update', newColors)
}

// watch(
//   () => props.colors,
//   colors => {
//     selectedColors.value = [...colors]
//   },
//   { immediate: true },
// )
</script>

<template>
  <CollapsibleSection title="Color">
    <div class="colors-filter__grid">
      <div
        class="color-filter__item"
        v-for="color in props.availableColors"
        :key="color.id"
        @click="toggleColor(color.id)"
        :class="{
          'color-filter__item--selected': colors.includes(color.id),
        }"
      >
        <div
          class="color-filter__color"
          :style="{
            background:
              color.hex === 'multicolor'
                ? 'linear-gradient(45deg in hsl longer hue, hsl(0, 45%, 65%) 0%, hsl(360, 45%, 65%) 100%)'
                : `#${color.hex}`,
            border: color.hex === 'ffffff' ? '2px solid #F4F1F1' : 'none',
          }"
        ></div>
        <Typography
          class="color-filter__text"
          color="secondary"
          weight="semi-bold"
          size="xs"
          >{{ color.name }}</Typography
        >
      </div>
    </div>
  </CollapsibleSection>
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
  border: 2px solid transparent;

  &--selected {
    outline: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
    border-radius: 8px;
  }
}
.color-filter__color {
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  border-radius: 12px;
}
.color-filter__text {
  text-align: center;
  line-height: 1;
}
</style>
