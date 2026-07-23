<script setup>
import { Typography } from '@/shared/ui/base/typography';
import IconFilter from '@/shared/assets/images/filter.svg';


</script>

<template>
  <aside class="catalog-sidebar">
    <div class="catalog-sidebar__title filter-title-layout">
      <Typography tag="h2" size="lg" weight="medium" color="secondary">Filter</Typography>
      <img :src="IconFilter" alt="">
    </div>

    <div class="catalog-sidebar__section filter-section-layout">
      <slot name="navigation"></slot>
    </div>

    <div class="catalog-sidebar__section">
      <slot name="filters"></slot>
    </div>
  </aside>
  
</template>

<style scoped>
.catalog-sidebar {
  border: 1px solid var(--color-medium-gray);
  border-top: none;
}
.catalog-sidebar__title {
  border-top: none;
  border-bottom: 1px solid var(--color-medium-gray);
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
</style>