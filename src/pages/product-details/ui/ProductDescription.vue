<script setup>
import { Typography } from '@/shared/ui/base/typography'

defineProps({
  description: {
    type: String,
    default: '',
  },
  features: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="product-description">
    <Typography hasLine tag="h2" size="xl" weight="bold"
      >Product Description</Typography
    >
    <Typography tag="p" color="secondary" size="sm">{{
      description
    }}</Typography>
    <div class="product-description__features">
      <div
        class="product-description__feature"
        v-for="(value, key) in features"
        :key="key"
      >
        <Typography size="sm" color="secondary">{{ key }}</Typography>
        <Typography weight="medium" size="sm">{{ value }}</Typography>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.product-description {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.product-description__features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 12px;
  overflow: hidden;
  gap: 1px;
  background-color: var(--color-medium-gray);

  @media (min-width: $breakpoint-mobile) {
    grid-template-columns: repeat(3, auto);
  }
}
.product-description__feature {
  padding: 30px;
  background-color: var(--color-light-gray);
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 12px;
}
</style>
