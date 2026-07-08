<script setup>
import { Typography } from '@/shared/ui/base/typography/index.js';
import CategoryCard from './CategoryCard.vue';
import { IconArrow} from '@/shared/ui/icons';

defineProps({
  title: String,
  items: Array,
  rootSlug: String
})
</script>

<template>
  <section class="category-section">

    <div class="category-section__header">
    
      <Typography has-line tag="h3" size="xl" weight="bold" class="category-section__title">{{ title }}</Typography>

      <RouterLink :to="{name: 'catalog', params: {rootCategory: rootSlug}}" class="category-section__link">
        <Typography tag="span" weight="bold" class="category-section__link-text">
          {{ `Shop ${rootSlug}` }}
        </Typography>
        <IconArrow class="arrow-icon" />
      </RouterLink>
    </div>

    <div class="category-section__items">
      <CategoryCard
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :slug="item.slug"
        :image-url="item.imageUrl"
        :parent-slug="item.parentSlug"
      >
      </CategoryCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/_variables.scss" as *;

.category-section__header {
  margin-bottom: 60px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-tablet) {
    margin-bottom: 30px;
  }
}
.category-section__title {
  flex: 1 0 0;
}
.category-section__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
}

.category-section__link {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  text-transform: capitalize;
}

.arrow-icon {
  transition: all 0.3s ease-out;
}

.category-section__link:hover {
  .arrow-icon {
    transform: translateX(5px);
  }
  .category-section__link-text {
    text-decoration: underline;
  }
}
</style>