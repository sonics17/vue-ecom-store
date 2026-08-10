<script setup>
import './typography.css'
const props = defineProps({
  tag: {
    type: String,
    default: 'p',
  },
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'primary',
  },
  weight: {
    type: String,
    default: 'regular',
  },
  hasLine: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <component
    :is="tag"
    :class="[
      'typography',
      `typography--${size}`,
      `typography--${color}`,
      `typography--${weight}`,
      { 'typography--with-line': hasLine },
    ]"
  >
    <slot></slot>
  </component>
</template>

<style></style>
