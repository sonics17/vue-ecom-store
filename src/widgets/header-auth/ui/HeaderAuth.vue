<script setup>
import { AppContainer } from '@/shared/ui/base/app-container'
import logoUrl from '@/shared/assets/images/logo.svg'
import { AppButton } from '@/shared/ui/base/app-button'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { useRoute } from 'vue-router'

const { isMobile } = useDeviceBreakpoints()
const route = useRoute()
</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/" class="header__logo">
        <img :src="logoUrl" alt="Logo" />
      </RouterLink>

      <div class="header__auth">
        <AppButton
          v-if="!isMobile || (isMobile && route.name !== 'signIn')"
          :to="{ name: 'signIn' }"
          variant="outline"
          class="header__button"
          >Login</AppButton
        >
        <AppButton
          v-if="!isMobile || (isMobile && route.name !== 'signUp')"
          :to="{ name: 'signUp' }"
          variant="outline"
          class="header__button"
          >Sign Up</AppButton
        >
      </div>
    </AppContainer>
  </header>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.header {
  padding: 10px 0;
  border-bottom: none;
  position: relative;
  background-color: var(--color-white);

  @media (min-width: $breakpoint-mobile) {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-medium-gray);
  }
}

.header__container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.header__auth {
  display: flex;
  gap: 10px;
  @media (min-width: $breakpoint-tablet) {
    gap: 30px;
  }
}
.header__button {
  padding: 0.8rem 1rem;
}
</style>
