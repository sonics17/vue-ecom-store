<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  labelText: {
    type: String,
  },
  errorMessage: {
    type: String,
  },
})

const model = defineModel()
</script>

<template>
  <label v-if="labelText">{{ labelText }}</label>
  <input :type="type" v-model="model" />
  <span v-if="errorMessage">{{ errorMessage }}</span>
</template>

<style scoped></style>
