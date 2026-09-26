<script setup>
import { AppButton } from '@/shared/ui/base/app-button'
import { IconCart } from '@/shared/ui/icons'
import { watch } from 'vue'

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: true,
  },
  buttonText: {
    type: String,
    default: 'Add to cart',
  },
  hasIcon: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <AppButton :disabled="isDisabled">
    <IconCart v-if="hasIcon" />
    {{ buttonText }}
  </AppButton>
</template>

<style scoped></style>
