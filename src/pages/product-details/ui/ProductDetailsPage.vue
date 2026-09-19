<script setup>
import { useProductStore } from '@/entities/product/model/store'
import { AppContainer } from '@/shared/ui/base/app-container'
import { Typography } from '@/shared/ui/base/typography'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductGallery from './ProductGallery.vue'
import { AppButton } from '@/shared/ui/base/app-button'
import {
  IconCart,
  IconCreditCard,
  IconLoopArrows,
  IconShirt,
  IconTruck,
} from '@/shared/ui/icons'
import { formatPrice } from '@/shared/lib/formatPrice'

const route = useRoute()

const productStore = useProductStore()
const { currentProduct, productVariants, isLoadingDetails, isLoadingVariants } =
  storeToRefs(productStore)

const getColorStyle = hex => {
  return {
    color:
      hex === 'ffffff'
        ? 'var(--color-medium-gray)'
        : hex === 'multicolor'
          ? 'var(--color-purple)'
          : `#${hex}`,
    background:
      hex === 'multicolor'
        ? 'linear-gradient(45deg in hsl longer hue,hsl(0, 45%, 65%) 0%,hsl(360, 45%, 65%) 100%)'
        : `#${hex}`,
    boxShadow:
      hex === 'ffffff' ? 'inset 0 0 0 1px var(--color-medium-gray)' : `#${hex}`,
  }
}

const selectedSize = ref(null)

watch(
  () => route.params.id,
  async id => {
    selectedSize.value = null
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

        <div class="product-page__details">
          <Typography
            weight="bold"
            tag="h1"
            size="2xl"
            class="product-page__name"
            >{{ currentProduct.name }}</Typography
          >

          <div class="product-page__option product-page__colors">
            <Typography weight="semi-bold" class="product-page__option-label"
              >Colors available</Typography
            >
            <div class="product-page__colors-list">
              <RouterLink
                :to="{ params: { id: currentProduct.id } }"
                class="product-page__color product-page__color--selected"
                :style="getColorStyle(currentProduct.color.hex)"
              ></RouterLink>
              <RouterLink
                v-for="variant in productVariants"
                :key="variant.id"
                :to="{ params: { id: variant.id } }"
                :style="getColorStyle(variant.color.hex)"
                class="product-page__color"
              ></RouterLink>
            </div>
          </div>

          <div class="product-page__option product-page__sizes">
            <Typography weight="semi-bold" class="product-page__option-label"
              >Select size</Typography
            >
            <div class="product-page__sizes-list">
              <label
                class="product-page__size"
                v-for="size in currentProduct.sizes"
                :key="size.id"
              >
                <input
                  type="radio"
                  name="size"
                  :value="size.id"
                  v-model="selectedSize"
                />
                <Typography
                  tag="span"
                  size="xs"
                  weight="medium"
                  class="product-page__size-name"
                  >{{ size.name }}</Typography
                >
              </label>
            </div>
          </div>

          <div class="product-page__purchase">
            <AppButton>
              <IconCart></IconCart>
              Add to cart
            </AppButton>
            <div class="product-page__price">
              <Typography weight="bold">{{
                formatPrice(currentProduct.price)
              }}</Typography>
            </div>
          </div>

          <div class="product-page__benefits">
            <div class="product-page__benefit">
              <div class="product-page__benefit-icon"><IconCreditCard /></div>
              <div class="product-page__benefit-text">Secure payment</div>
            </div>
            <div class="product-page__benefit">
              <div class="product-page__benefit-icon"><IconShirt /></div>
              <div class="product-page__benefit-text">Fit</div>
            </div>
            <div class="product-page__benefit">
              <div class="product-page__benefit-icon"><IconTruck /></div>
              <div class="product-page__benefit-text">Free shipping</div>
            </div>
            <div class="product-page__benefit">
              <div class="product-page__benefit-icon"><IconLoopArrows /></div>
              <div class="product-page__benefit-text">Free returns</div>
            </div>
          </div>
        </div>
        <div class="product-page__info">
          <Typography hasLine tag="h2" size="xl" weight="bold"
            >Product Description</Typography
          >
          <Typography tag="p" color="secondary" size="sm">{{
            currentProduct.description
          }}</Typography>
          <div class="product-page__features">
            <div
              class="product-page__feature"
              v-for="(value, key) in currentProduct.features"
              :key="key"
            >
              <Typography size="sm" color="secondary">{{ key }}</Typography>
              <Typography weight="medium" size="sm">{{ value }}</Typography>
            </div>
          </div>
        </div>
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
    'info';
  gap: 30px 0;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 50%);
    grid-template-areas:
      'gallery details'
      'info info';
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
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: $breakpoint-tablet) {
    padding: 20px 0 20px 60px;
    gap: 35px;
  }
}
.product-page__option {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: $breakpoint-tablet) {
    gap: 20px;
  }
}
.product-page__sizes-list {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
.product-page__size {
  cursor: pointer;
  position: relative;
  input {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    appearance: none;
  }
  .product-page__size-name {
    display: flex;
    height: 2rem;
    width: 2rem;
    justify-content: center;
    align-items: center;
    background-color: var(--color-white);
    border: 1px solid var(--color-medium-gray);
    border-radius: 12px;
  }
  input:checked + .product-page__size-name {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }
}

.product-page__colors-list {
  display: flex;
  gap: 20px;
  padding: 4px;
  flex-wrap: wrap;
}
.product-page__color {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-sizing: border-box;

  &--selected {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid currentColor;
    }
  }
}

.product-page__purchase {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  @media (max-width: $breakpoint-mobile) {
    gap: 15px;
  }

  & > * {
    @media (max-width: $breakpoint-mobile) {
      flex-grow: 1;
    }
  }
}

.product-page__price {
  padding: 1rem 40px;
  border-radius: 0.5rem;
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-page__benefits {
  border-top: 1px solid var(--color-medium-gray);
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 20px;
  padding: 35px 0;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.product-page__benefit {
  display: flex;
  align-items: center;
  gap: 15px;
}
.product-page__benefit-icon {
  width: 44px;
  height: 44px;
  background-color: var(--color-light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-page__info {
  grid-area: info;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.product-page__features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 12px;
  overflow: hidden;
  gap: 1px;
  background-color: var(--color-medium-gray);

  @media (min-width: $breakpoint-mobile) {
    grid-template-columns: repeat(3, auto);
  }
}
.product-page__feature {
  padding: 30px;
  background-color: var(--color-light-gray);
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 12px;
}
</style>
