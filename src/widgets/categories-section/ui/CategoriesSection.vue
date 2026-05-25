<script setup>
import { Typography } from '@/shared/ui/base/Typography';
import CategoryCard from './CategoryCard.vue';

defineProps({
  title: String,
  items: Array
})
</script>

<template>
  <section class="category-section">
    <Typography has-line tag="h3" size="xl" weight="bold" class="category-section__title">{{ title }}</Typography>
    <div class="category-section__items">
      <CategoryCard
        v-for="(item, index) in items"
        v-bind="item"
        :key="index"
      >
      </CategoryCard>
    </div>
  </section>
</template>

<style scoped>
.category-section__title {
  margin-bottom: 70px;
}
.category-section__items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
}
</style>