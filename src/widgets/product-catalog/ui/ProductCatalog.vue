<script setup>
import { useProductStore } from '@/entities/product/model/store'
import { ProductCard } from '@/entities/product'

const productStore = useProductStore()
</script>
<template>
  <div v-if="!productStore.isLoadingCatalog" class="products-catalog">
    <div class="products-catalog__items">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :images="product.images"
        :brand="product.brand.name"
        class="products-catalog__item"
      ></ProductCard>
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
