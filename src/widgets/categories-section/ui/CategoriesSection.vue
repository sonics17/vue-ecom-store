<script setup>
import { Typography } from '@/shared/ui/base/typography/index.js';
import CategoryCard from './CategoryCard.vue';
import ArrowIcon from '@/shared/ui/icons/ArrowIcon.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: String,
  items: Array,
  rootSlug: String
})

const route = useRoute();
</script>

<template>
  <section class="category-section">

    <div class="category-section__header">
    
      <Typography has-line tag="h3" size="xl" weight="bold" class="category-section__title">{{ title }}</Typography>

      <RouterLink :to="{name: 'catalog', params: {rootCategory: rootSlug}}" class="category-section__link">
        <Typography weight="bold" size="lg" class="category-section__link-text">
          {{ `Shop ${props.rootSlug}` }}
        </Typography>
        <ArrowIcon class="arrow-icon" />
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

<style scoped>
.category-section__header {
  margin-bottom: 60px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}
.category-section__title {
  flex: 1;
}
.category-section__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
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