<script setup>
import { AuthContainer } from '@/shared/ui/auth-container'
import imageUrl from '@/shared/assets/images/banners/forgot-password-banner.webp'
import { Typography } from '@/shared/ui/base/typography'
import { ForgotPasswordForm } from '@/features/forgot-password'
</script>

<template>
  <AuthContainer :image-url="imageUrl">
    <div class="forgot-password-page">
      <Typography
        tag="h1"
        size="2xl"
        weight="bold"
        class="forgot-password-page__title"
        >Reset Your Password</Typography
      >

      <Typography
        color="secondary"
        size="sm"
        class="forgot-password-page__subtitle"
        >Enter your email and we'll send you a link to reset your password.
      </Typography>

      <ForgotPasswordForm
        class="forgot-password-page__form"
      ></ForgotPasswordForm>

      <Typography size="sm"
        >Back to
        <RouterLink
          :to="{ name: 'signIn' }"
          class="forgot-password-page__link typography--link"
          >Login</RouterLink
        >
      </Typography>
    </div>
  </AuthContainer>
</template>

<style scoped>
.forgot-password-page__title {
  margin-bottom: 10px;
}
.forgot-password-page__subtitle {
  margin-bottom: 50px;
}
.forgot-password-page__form {
  margin-bottom: 10px;
}
</style>
