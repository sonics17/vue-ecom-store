<script setup>
import { authApi } from '@/shared/auth/authApi'
import { AppButton } from '@/shared/ui/base/app-button'

const handleLogout = async () => {
  try {
    await authApi.signOut()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <p>some personal data</p>
  <AppButton
    @click="handleLogout"
    color="white"
    style="padding: 0; text-decoration: underline; font: inherit"
    >Log out</AppButton
  >
</template>

<style lang="scss" scoped></style>
