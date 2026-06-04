<script setup>
import { Typography } from '@/shared/ui/base/Typography';
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
    
    <Typography has-line tag="h3" size="xl" weight="bold" class="category-section__title">{{ title }}</Typography>

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
    <RouterLink  v-if="route.name === 'home'" :to="{name: 'catalog', params: {rootCategory: rootSlug}}" class="category-section__link">
      <Typography weight="bold" size="lg" class="category-section__link-text">
        {{ `Shop ${props.rootSlug}` }}
      </Typography>
      <ArrowIcon class="arrow-icon" />
    </RouterLink>
  </section>
</template>

<style scoped>
.category-section__title {
  margin-bottom: 60px;
}
.category-section__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 50px;
}

.category-section__link {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  text-transform: capitalize;
  margin-top: 40px;
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