<script setup>
import { Typography } from '@/shared/ui/base/typography';
import ProductPreviewGallery from './ProductPreviewGallery.vue';
import { breakpointsAntDesign } from '@vueuse/core';

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  images: Array,
  brand: String
})

const formattedPrice = (price) => {
  return price.toFixed(2)
}
</script>

<template>
  <RouterLink class="product-card" :to="{name: 'product', params: {id: id}}">

    <div class="product-card__image">
      <ProductPreviewGallery :images="images" />
    </div>

    <Typography tag="h3" weight="bold" class="product-card__title">{{name}}</Typography>
    <Typography tag="span" size="sm" color="secondary" class="product-card__brand">{{brand}}</Typography>
    <div class="product-card__price">
      <Typography tag="span" size="sm" weight="medium">${{formattedPrice(price)}}</Typography>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: 370px min-content;
  grid-template-areas: 
    "image image"
    "title price"
    "brand price";
  gap: 5px;
  border-radius: 10px;
}
.product-card__image {
  border-radius: 10px;
  overflow: hidden;
  grid-area: image;
  margin-bottom: 18px;
}
.product-card__title {
  grid-area: title;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-card__price {
  grid-area: price;
  padding: 8px 13px;
  background-color: var(--color-light-gray);
  align-self: self-start;
  border-radius: 10px;
}

.product-card__brand {
  grid-area: brand;
}
</style>