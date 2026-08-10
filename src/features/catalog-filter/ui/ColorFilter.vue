<script setup>
import { CollapsibleSection } from '@/shared/ui/collapsible-section'
import { useFilterStore } from '../model/store'
import { Typography } from '@/shared/ui/base/typography'

const filterStore = useFilterStore()

// const selectedColors = computed(() => {
//   if (route.query.color && route.query.color.length) {
//     const ids = route.query.color.split(',').map(Number)
//     return new Set(ids)
//   }
//   return new Set()
// })

const toggleColors = ids => {
  const currentIds = new Set(filterStore.selectedFilters.colors)

  for (const id of ids) {
    if (currentIds.has(id)) {
      currentIds.delete(id)
    } else {
      currentIds.add(id)
    }
  }

  if (currentIds.size > 0) {
    query.color = [...currentIds].join(',')
  } else {
    delete query.color
  }
}
</script>

<template>
  <CollapsibleSection title="Color">
    <div class="colors-filter__grid">
      <!-- <div
        class="color-filter__item"
        v-for="color in filterStore.allFilters.colors"
        :key="color.id"
        @click="toggleColors(color.childrenIds)"
        :class="{
          'color-filter__item--selected': selectedColors.has(color.id),
        }"
      > -->
      <div
        class="color-filter__item"
        v-for="color in filterStore.allFilters.colors"
        :key="color.id"
        @click="toggleColors(color.childrenIds)"
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
  transition: all 0.2s ease-out;

  &--selected {
    border: 2px solid color-mix(in srgb, var(--color-purple) 50%, transparent);
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
