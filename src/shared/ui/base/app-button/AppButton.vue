<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'solid',
  },
  color: {
    type: String,
    default: 'purple',
  },
})
</script>

<template>
  <button
    :class="['app-button', `app-button--${variant}`, `app-button--${color}`]"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;

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
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semi-bold);
  color: var(--color-white);

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;
  }
}

.app-button--solid.app-button--purple {
  color: var(--color-white);
  background-color: var(--color-purple);

  &:disabled {
    color: var(--color-primary);
    background-color: var(--color-medium-gray);
  }
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

  @media (max-width: $breakpoint-tablet) {
    box-sizing: border-box;
    padding: 7px;
  }
}

.app-button--icon.app-button--gray {
  color: var(--color-secondary);
  background-color: var(--color-light-gray);

  @media (max-width: $breakpoint-tablet) {
    background-color: transparent;
  }
}
</style>
