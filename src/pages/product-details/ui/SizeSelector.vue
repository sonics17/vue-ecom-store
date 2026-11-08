<script setup>
import { Typography } from '@/shared/ui/base/typography'

const props = defineProps({
  sizes: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>

<template>
  <div class="size-selector">
    <Typography weight="semi-bold" class="size-selector__title"
      >Select size</Typography
    >
    <div class="size-selector__sizes-list">
      <label
        class="size-selector__size"
        v-for="size in sizes"
        :key="size.id"
        :class="{
          'size-selector__size--unavailable': !size.isSizeAvailable,
        }"
      >
        <input
          type="radio"
          name="size"
          :value="size.id"
          v-model="model"
          :disabled="!size.isSizeAvailable"
          class="size-selector__radio"
        />
        <Typography
          tag="span"
          size="xs"
          weight="medium"
          class="size-selector__size-name"
          >{{ size.name }}</Typography
        >
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.size-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: $breakpoint-tablet) {
    gap: 20px;
  }
}

.size-selector__sizes-list {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.size-selector__size {
  cursor: pointer;
  position: relative;

  &--unavailable {
    cursor: default;
    pointer-events: none;
  }
}

.size-selector__size--unavailable .size-selector__size-name {
  opacity: 0.5;
  position: relative;
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
      var(--color-medium-gray),
      transparent calc(50% + 1px)
    );
  }
}

.size-selector__radio {
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

.size-selector__size-name {
  display: flex;
  height: 2rem;
  width: 2rem;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  border: 1px solid var(--color-medium-gray);
  border-radius: 12px;
}

.size-selector__radio:checked + .size-selector__size-name {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.size-selector__radio:focus-visible + .size-selector__size-name {
  outline: auto -webkit-focus-ring-color;
}
</style>
