<script setup>
import { Typography } from '@/shared/ui/base/typography'

const props = defineProps({
  currentId: {
    type: Number,
    required: true,
  },
  colorList: {
    type: Array,
    required: true,
  },
})

const getColorStyle = hex => {
  return {
    color:
      hex === 'ffffff'
        ? 'var(--color-medium-gray)'
        : hex === 'multicolor'
          ? 'var(--color-purple)'
          : `#${hex}`,
    background:
      hex === 'multicolor'
        ? 'linear-gradient(45deg in hsl longer hue,hsl(0, 45%, 65%) 0%,hsl(360, 45%, 65%) 100%)'
        : `#${hex}`,
    boxShadow:
      hex === 'ffffff' ? 'inset 0 0 0 1px var(--color-medium-gray)' : `#${hex}`,
  }
}
</script>

<template>
  <div class="color-selector">
    <Typography weight="semi-bold" class="product-page__option-label"
      >Colors available</Typography
    >
    <div class="color-selector__colors-list">
      <RouterLink
        v-for="variant in colorList"
        :key="variant.id"
        :to="{ params: { id: variant.id } }"
        :style="getColorStyle(variant.hex)"
        class="color-selector__color"
        :class="{
          'color-selector__color--selected': variant.id === currentId,
          'color-selector__color--unavailable':
            !variant.isAvailable && variant.id !== currentId,
        }"
      ></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.color-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: $breakpoint-tablet) {
    gap: 20px;
  }
}

.color-selector__colors-list {
  display: flex;
  gap: 20px;
  padding: 4px;
  flex-wrap: wrap;
}
.color-selector__color {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-sizing: border-box;

  &--selected {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid currentColor;
    }
  }

  &--unavailable {
    position: relative;
    opacity: 0.6;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to top left,
        transparent calc(50% - 1px),
        var(--color-secondary),
        transparent calc(50% + 1px)
      );
    }
  }
}
</style>
