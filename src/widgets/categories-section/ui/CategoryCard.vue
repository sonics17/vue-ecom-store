<script setup>
import { Typography } from '@/shared/ui/base/Typography';
import { onMounted } from 'vue';

defineProps({
  name: String,
  image_url: String,
  slug: String,
  parentSlug: String
})
</script>

<template>
  <RouterLink
    class="category-card"
    :to="{name: 'catalog', params:{rootCategory: parentSlug, subCategory: slug}}"
  >
    <div class="category-card__image">
      <img :src="image_url" :alt="`${name} photo`">
    </div>
    <Typography class="category-card__name" tag="span" weight="bold">{{ name }}</Typography>
    <Typography class="category-card__text" tag="span" color="secondary" size="xs" weight="medium">Explore Now!</Typography>
    <span class="category-card__arrow">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M15 8L19 12M19 12L15 16M19 12H5" stroke="var(--color-secondary)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </RouterLink>
</template>

<style scoped>
.category-card {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: 390px min-content min-content;
  grid-template-areas: 
    "image image"
    "name arrow"
    "explore arrow";
  gap: 4px;
  border-radius: 10px;
}
.category-card__image {
  grid-area: image;
  overflow: hidden;
  border-radius: 10px;
}
.category-card__image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: all .3s ease;
}
.category-card__name {
  grid-area: name;
  margin-top: 10px;
}
.category-card__text {
  transition: all .3s ease;
}
.category-card__arrow {
  grid-area: arrow;
  align-self: center;
}
.category-card__arrow svg {
  transition: all 0.3s ease-out;
}
.category-card:hover {
  .category-card__arrow svg {
    transform: translateX(5px);
  }
  .category-card__image img {
    transform: scale(1.1);
  }
  .category-card__text {
    color: var(--color-primary);
  }
}
</style>