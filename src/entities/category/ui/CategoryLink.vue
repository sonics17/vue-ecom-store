<script setup>
import { Typography } from '@/shared/ui/base/typography';

defineProps({
  rootSlug: String,
  slug: {
    String,
    default: ""
  },
  color: String,
  weight: String,
  size: String
})
</script>

<template>
  <RouterLink :to="{name: 'catalog', params: {rootCategory: rootSlug, subCategory: slug}}">
    <Typography tag="span" :color="color" :weight="weight" :size="size">
      <slot></slot>
    </Typography>
  </RouterLink>
</template>

<style scoped>
</style>