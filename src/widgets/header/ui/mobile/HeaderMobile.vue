<script setup>
import { ref } from 'vue'
import { AppButton } from '@/shared/ui/base/app-button'
import { IconHeart, IconUser, IconCart, IconSearch } from '@/shared/ui/icons'
import { AppContainer } from '@/shared/ui/base/app-container'
import logoUrl from '@/shared/assets/images/logo.svg'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import MobileMenuDrawer from './MobileMenuDrawer.vue'

const { isMobile } = useDeviceBreakpoints()

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/" class="header__logo">
        <img :src="logoUrl" alt="Logo" />
      </RouterLink>

      <AppButton variant="icon" color="gray"><IconSearch /></AppButton>

      <div class="header__actions">
        <AppButton v-if="!isMobile" variant="icon" color="gray"
          ><IconHeart
        /></AppButton>
        <AppButton v-if="!isMobile" variant="icon" color="gray"
          ><IconUser
        /></AppButton>
        <AppButton variant="icon" color="gray"><IconCart /></AppButton>
      </div>

      <button
        @click="toggleMenu"
        :class="{ 'header__burger-button--open': isOpen }"
        class="header__burger-button"
      >
        <span></span>
      </button>
    </AppContainer>

    <MobileMenuDrawer v-model:is-open="isOpen"></MobileMenuDrawer>
  </header>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.header {
  padding: 10px 0;
}
.header__container {
  display: flex;
  align-items: center;

  @media (min-width: $breakpoint-mobile) {
    gap: 20px;
  }
}
.header__logo {
  margin-right: auto;
  display: block;
}
.header__actions {
  display: flex;
  align-items: center;
}

.header__burger-button {
  width: 44px;
  height: 44px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  position: relative;
  z-index: 999;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: 5px;
    transition: opacity 0.2s ease-in-out;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--color-secondary);
    border-radius: 5px;
    left: 10px;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    top: 14px;
  }
  &::after {
    top: 28px;
  }

  &--open {
    span {
      opacity: 0;
    }

    &::before {
      top: 21px;
      transform: rotate(45deg);
    }

    &::after {
      top: 21px;
      transform: rotate(-45deg);
    }
  }
}
</style>
