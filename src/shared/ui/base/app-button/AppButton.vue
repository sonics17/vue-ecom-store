<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'solid',
  },
  color: {
    type: String,
    default: 'purple',
  },
  to: {
    type: [Object, String],
    default: null,
  },
})

const tag = computed(() => {
  return props.to ? 'router-link' : 'button'
})

const buttonType = computed(() => {
  return tag.value === 'button' ? 'button' : null
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="buttonType"
    :class="['app-button', `app-button--${variant}`, `app-button--${color}`]"
  >
    <slot></slot>
  </component>
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

  &.router-link-exact-active {
    cursor: default;
    pointer-events: none;
    color: var(--color-white);
    background-color: var(--color-purple);
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
