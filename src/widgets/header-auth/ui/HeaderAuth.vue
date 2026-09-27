<script setup>
import { AppContainer } from '@/shared/ui/base/app-container'
import logoUrl from '@/shared/assets/images/logo.svg'
import { AppButton } from '@/shared/ui/base/app-button'
</script>

<template>
  <header class="header">
    <AppContainer class="header__container">
      <RouterLink to="/" class="header__logo">
        <img :src="logoUrl" alt="Logo" />
      </RouterLink>

      <div class="header__auth">
        <AppButton :to="{ name: 'signIn' }" variant="outline">Login</AppButton>
        <AppButton :to="{ name: 'signUp' }" variant="outline"
          >Sign Up</AppButton
        >
      </div>
    </AppContainer>
  </header>
</template>

<style scoped>
.header {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-medium-gray);
  position: relative;
  background-color: var(--color-white);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__auth {
  display: flex;
  gap: 30px;
}
</style>
