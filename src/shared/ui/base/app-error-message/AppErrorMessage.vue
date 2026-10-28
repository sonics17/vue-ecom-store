<script setup>
import { Typography } from '../typography'

defineProps({
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="app-error-message">
    <Typography tag="span" size="sm" class="app-error-message__text">{{
      message
    }}</Typography>
  </div>
</template>

<style scoped>
.app-error-message {
  min-height: 1.5rem;
}
.app-error-message__text {
  color: var(--color-red);
}
</style>
