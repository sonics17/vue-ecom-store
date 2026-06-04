<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'solid'
  },
  color: {
    type: String,
    default: 'purple'
  }
})
</script>

<template>
  <button :class="[
    'app-button', 
    `app-button--${variant}`,
    `app-button--${color}`
  ]">
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 0.2s;
  text-transform: capitalize;
  padding: 1rem 1.2rem;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.app-button--solid.app-button--purple {
  color: var(--color-white);
  background-color: var(--color-purple);
}

.app-button--solid.app-button--white {
  color: var(--color-primary);
  background-color: var(--color-white);
}

.app-button--outline {
  background-color: transparent;
  border-color: var(--color-purple);
  color: var(--color-purple);
  font-weight: var(--font-weight-medium);
}

.app-button--icon {
  width: 44px;
  height: 44px;
  padding: 0;
}

.app-button--icon.app-button--gray {
  color: var(--color-secondary);
  background-color: var(--color-light-gray);
}
</style>