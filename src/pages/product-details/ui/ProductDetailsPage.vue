<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/entities/product/model/store'
import { ProductGallery } from '@/entities/product'
import { AppContainer } from '@/shared/ui/base/app-container'
import { ProductDescription, ProductMainInfo } from '@/widgets/product-details'

const route = useRoute()

const productStore = useProductStore()
const { currentProduct, productVariants, isLoadingDetails, isLoadingVariants } =
  storeToRefs(productStore)

watch(
  () => route.params.id,
  async id => {
    await productStore.loadProductDetails(id)
  },
  { immediate: true },
)
</script>

<template>
  <AppContainer>
    <div class="product-page">
      <div v-if="isLoadingDetails || isLoadingVariants">Loading...</div>
      <template v-else>
        <ProductGallery
          class="product-page__gallery"
          :images="currentProduct.images"
        ></ProductGallery>

        <ProductMainInfo
          :product="currentProduct"
          :variants="productVariants"
          class="product-page__details"
        ></ProductMainInfo>

        <ProductDescription
          :description="currentProduct.description"
          :features="currentProduct.features"
          class="product-page__description"
        ></ProductDescription>
      </template>
    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.product-page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'gallery'
    'details'
    'description';
  gap: 30px 0;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 50%);
    grid-template-areas:
      'gallery details'
      'description description';
    gap: 100px 0;
  }
}

.product-page__gallery {
  grid-area: gallery;
  height: 60dvh;
  width: calc(100% + 24px);
  margin: 0 -12px;
  @media (min-width: $breakpoint-tablet) {
    height: 100%;
    width: 100%;
    margin: 0;
  }
}

.product-page__details {
  grid-area: details;
  align-self: center;

  @media (min-width: $breakpoint-tablet) {
    padding: 20px 0 20px 60px;
  }
}

.product-page__description {
  grid-area: description;
}
</style>
