<script setup>
import AuthContainer from './AuthContainer.vue'
import imageUrl from '@/shared/assets/images/banners/update-password-banner.webp'
import { Typography } from '@/shared/ui/base/typography'
import UpdatePasswordForm from './forms/UpdatePasswordForm.vue'
</script>

<template>
  <AuthContainer :image-url="imageUrl">
    <div class="update-password-page">
      <Typography
        tag="h1"
        size="2xl"
        weight="bold"
        class="update-password-page__title"
        >Create New Password
      </Typography>

      <UpdatePasswordForm
        class="update-password-page__form"
      ></UpdatePasswordForm>
    </div>
  </AuthContainer>
</template>

<style scoped>
.update-password-page__title {
  margin-bottom: 50px;
}
</style>
