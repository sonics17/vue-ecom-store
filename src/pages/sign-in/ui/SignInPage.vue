<script setup>
import { SignInForm } from '@/features/sign-in-by-email'
import imageUrl from '@/shared/assets/images/banners/sign-in-banner.webp'
import { AuthContainer } from '@/shared/ui/auth-container'
import { Typography } from '@/shared/ui/base/typography'
</script>

<template>
  <AuthContainer :image-url="imageUrl">
    <div class="sign-in-page">
      <Typography tag="h1" size="2xl" weight="bold" class="sign-in-page__title"
        >Sign In</Typography
      >
      <Typography color="secondary" size="sm" class="sign-in-page__subtitle"
        >Sign in to start shopping
      </Typography>

      <SignInForm class="sign-in-page__form"></SignInForm>

      <Typography size="sm">
        Don’t have an account?
        <RouterLink
          :to="{ name: 'signUp' }"
          class="sign-in-page__link typography--link"
        >
          Sign up</RouterLink
        >
      </Typography>
    </div>
  </AuthContainer>
</template>

<style lang="scss" scoped>
.sign-in-page__title {
  margin-bottom: 10px;
}
.sign-in-page__subtitle {
  margin-bottom: 50px;
}
.sign-in-page__form {
  margin-bottom: 10px;
}
</style>
