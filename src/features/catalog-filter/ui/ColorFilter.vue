<script setup>
import { Typography } from '@/shared/ui/base/typography';
import { ChevronToggle } from '@/shared/ui/base/chevron-toggle';
</script>

<template>
  <div class="filter">
    <div class="filter-title filter-title-layout">
      <Typography tag="h3" size="lg" weight="medium" color="secondary">Color</Typography>
      <ChevronToggle></ChevronToggle>
    </div>
    <div class="filter-section-layout">color filter</div>
  </div>
</template>

<style scoped>
.filter-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>