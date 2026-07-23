<script setup>
import { useProductStore } from '@/entities/product/model/store';
import { ProductCard } from '@/entities/product';
import { onMounted } from 'vue';

const productStore = useProductStore();
</script>

<template>
  <div v-if="!productStore.isLoading" class="products-catalog">
    <div class="products-catalog__items">
      <template
        v-for="product in productStore.products"
        :key="product.id"
      >
        <ProductCard
          v-for="productVariant in product.product_color_variants"
          :key="productVariant.id"
          :id="productVariant.id"
          :name="product.name"
          :price="product.price"
          :images="productVariant.image_url"
          :brand="product.brands.name"
          class="products-catalog__item"
        ></ProductCard>
      </template>
    </div>
  </div>
</template>

<style scoped>
.products-catalog__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 50px 25px;
}
</style>