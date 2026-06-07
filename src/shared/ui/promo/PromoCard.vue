<script setup>
import { Typography } from '../base/typography';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  image: String,
  link: Object
})
</script>

<template>
  <div class="promo-card">
    <img :src="image" alt="promo" class="promo-card__image">
    <div class="promo-card__content">
      <Typography tag="h3" size="md" color="white" weight="extra-bold">{{ title }}</Typography>
      <div class="promo-card__subtitle-wrapper">
        <Typography tag="p" size="2xl" color="white" weight="extra-bold">{{ subtitle }}</Typography>
        <Typography tag="p" size="sm" color="white" weight="medium">{{ text }}</Typography>
      </div>
      <RouterLink :to="link" class="promo-card__link">Explore Items</RouterLink>
    </div>
  </div>

</template>

<style scoped>
.promo-card {
  display: grid;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 7px 1px rgba(136, 136, 136, 0.5);
}
.promo-card__image {
  grid-area: 1/1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.promo-card__content {
  grid-area: 1/1;
  padding: 50px 30px;
  max-width: 270px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.promo-card__subtitle-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.promo-card__link {
  color: var(--color-white);
  text-decoration: underline;
  font-weight: var(--font-weight-bold);
}
</style>