<script setup>
import { Typography } from '@/shared/ui/base/typography'
import { IconArrow, IconShirt } from '@/shared/ui/icons'
import { ref } from 'vue'

defineProps({
  name: String,
  imageUrl: String,
  slug: String,
  parentSlug: String,
})

const isDefaultImage = ref(false)

const handleImageError = () => {
  isDefaultImage.value = true
}
</script>

<template>
  <RouterLink
    class="category-card"
    :to="{
      name: 'catalog',
      params: { rootCategory: parentSlug, subCategory: slug },
    }"
  >
    <div class="category-card__image">
      <img
        v-if="imageUrl && !isDefaultImage"
        :src="imageUrl"
        :alt="`${name} photo`"
        @error="handleImageError"
      />
      <IconShirt v-else class="category-card__image--default"></IconShirt>
    </div>
    <Typography class="category-card__title" tag="span" weight="bold">{{
      name
    }}</Typography>
    <Typography
      class="category-card__text"
      tag="span"
      color="secondary"
      size="xs"
      weight="medium"
      >Explore Now!</Typography
    >
    <span class="category-card__arrow">
      <IconArrow />
    </span>
  </RouterLink>
</template>

<style scoped>
.category-card {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: 390px min-content min-content;
  grid-template-areas:
    'image image'
    'title arrow'
    'explore arrow';
  gap: 4px;
  border-radius: 10px;
}
.category-card__image {
  grid-area: image;
  overflow: hidden;
  border-radius: 15px;
  background-color: var(--color-light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
}
.category-card__image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: all 0.3s ease;
}
.category-card__image--default {
  width: 200px;
  height: 200px;
  color: var(--color-white);
}
.category-card__title {
  grid-area: title;
  margin-top: 10px;
}
.category-card__text {
  transition: all 0.3s ease;
}
.category-card__arrow {
  grid-area: arrow;
  align-self: center;
  justify-self: end;
  display: flex;
  align-items: center;
  padding-right: 5px;
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
  .category-card__image--default {
    transform: scale(1.1);
  }
}
</style>
