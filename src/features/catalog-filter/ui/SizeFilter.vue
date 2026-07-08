<script setup>
import { ChevronToggle } from '@/shared/ui/base/chevron-toggle';
import { Typography } from '@/shared/ui/base/typography';
</script>

<template>
  <div class="filter-title filter-title-layout">
    <Typography tag="h3" size="lg" weight="medium" color="secondary">Size</Typography>
    <ChevronToggle></ChevronToggle>
  </div>
  <div class="filter-section-layout">size filter</div>
</template>

<style scoped>

</style>