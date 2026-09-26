<script setup>
import { ref, computed, watch } from 'vue'
import { ColorSelector, SizeSelector } from '@/entities/product'
import { AppButton } from '@/shared/ui/base/app-button'
import { Typography } from '@/shared/ui/base/typography'
import {
  IconCart,
  IconCreditCard,
  IconLoopArrows,
  IconShirt,
  IconTruck,
} from '@/shared/ui/icons'
import { formatPrice } from '@/shared/lib/formatPrice'
import { AddToCartButton } from '@/features/add-to-cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  variants: {
    type: Array,
    required: true,
  },
})

const selectedSize = ref(null)

const buttonText = computed(() => {
  if (!props.product.isAvailable) {
    return 'Out of stock'
  }
  if (selectedSize.value === null) {
    return 'Select size'
  }
  return 'Add to cart'
})

const isButtonDisabled = computed(() => {
  return selectedSize.value === null || !props.product.isAvailable
})

const colorList = computed(() => {
  const current = {
    id: props.product.id,
    hex: props.product.color.hex,
    isAvailable: props.product.isAvailable,
  }

  const variants = props.variants.map(variant => {
    return {
      id: variant.id,
      hex: variant.color.hex,
      isAvailable: variant.isAvailable,
    }
  })

  return [current, ...variants]
})
</script>

<template>
  <div class="product-main-info">
    <Typography
      weight="bold"
      tag="h1"
      size="2xl"
      class="product-main-info__name"
      >{{ product.name }}
    </Typography>

    <ColorSelector
      :color-list="colorList"
      :current-id="product.id"
    ></ColorSelector>

    <SizeSelector :sizes="product.sizes" v-model="selectedSize"></SizeSelector>

    <div class="product-main-info__purchase">
      <AddToCartButton
        :button-text="buttonText"
        :is-disabled="isButtonDisabled"
        :has-icon="product.isAvailable"
      ></AddToCartButton>
      <div class="product-main-info__price">
        <Typography weight="bold">{{ formatPrice(product.price) }}</Typography>
      </div>
    </div>

    <div class="product-main-info__benefits">
      <div class="product-main-info__benefit">
        <div class="product-main-info__benefit-icon"><IconCreditCard /></div>
        <div class="product-main-info__benefit-text">Secure payment</div>
      </div>
      <div class="product-main-info__benefit">
        <div class="product-main-info__benefit-icon"><IconShirt /></div>
        <div class="product-main-info__benefit-text">Fit</div>
      </div>
      <div class="product-main-info__benefit">
        <div class="product-main-info__benefit-icon"><IconTruck /></div>
        <div class="product-main-info__benefit-text">Free shipping</div>
      </div>
      <div class="product-main-info__benefit">
        <div class="product-main-info__benefit-icon"><IconLoopArrows /></div>
        <div class="product-main-info__benefit-text">Free returns</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.product-main-info {
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: $breakpoint-tablet) {
    gap: 35px;
  }
}

.product-main-info__purchase {
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

.product-main-info__price {
  padding: 1rem 40px;
  border-radius: 0.5rem;
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-main-info__benefits {
  border-top: 1px solid var(--color-medium-gray);
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 20px;
  padding: 35px 0;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.product-main-info__benefit {
  display: flex;
  align-items: center;
  gap: 15px;
}
.product-main-info__benefit-icon {
  width: 44px;
  height: 44px;
  background-color: var(--color-light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
