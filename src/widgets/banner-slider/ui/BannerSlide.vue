<script setup>
import { AppButton } from '@/shared/ui/base/AppButton';
import { Typography } from '@/shared/ui/base/Typography';

defineProps({
  title: String,
  category: String,
  text: String,
  image: String,
  link: Object,
  contentPosition: {
    type: String,
    default: 'left'
  },
})
</script>

<template>
  <div class="slide">
    <div class="slide__image">
      <img :src="image" alt="banner">
    </div>

    <div :class="['slide__content', `slide__content--${contentPosition}`]">
      <Typography tag="span" size="2xl" color="white" weight="medium" class="slide__category">{{ category }}</Typography>
      <Typography tag="h1" size="3xl" color="white" weight="extra-bold" class="slide__title">{{ title }}</Typography>
      <Typography tag="p" size="2xl" color="white" weight="medium" class="slide__text">{{ text }}</Typography>

      <RouterLink :to="link" >
        <AppButton color="white">Shop now</AppButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.slide {
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide__image {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.slide__content {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.slide__content--right {
  justify-self: end;
  padding-right: 70px;
  text-align: right;
  align-items: end;
}
.slide__content--left {
  justify-self: start;
  padding-left: 70px;
  text-align: left;
  align-items: start;
}
</style>