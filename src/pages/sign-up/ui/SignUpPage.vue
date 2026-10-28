<script setup>
import { AuthContainer } from '@/shared/ui/auth-container'
import { SignUpForm } from '@/features/sign-up-by-email'
import promoImage from '@/shared/assets/images/banners/promo-banner-2.webp'
import { Typography } from '@/shared/ui/base/typography'
</script>

<template>
  <AuthContainer :image-url="promoImage">
    <div class="sign-up-page">
      <Typography tag="h1" size="2xl" weight="bold" class="sign-up-page__title"
        >Sign Up</Typography
      >

      <Typography color="secondary" size="sm" class="sign-up-page__subtitle"
        >Sign up for free to start shopping
      </Typography>

      <SignUpForm class="sign-up-page__form"></SignUpForm>

      <Typography size="sm"
        >Already have an account?
        <RouterLink
          :to="{ name: 'signIn' }"
          class="sign-up-page__link typography--link"
          >Log in</RouterLink
        >
      </Typography>
    </div>
  </AuthContainer>
</template>

<style lang="scss" scoped>
.sign-up-page__title {
  margin-bottom: 10px;
}

.sign-up-page__subtitle {
  margin-bottom: 50px;
}

.sign-up-page__form {
  margin-bottom: 10px;
}
</style>
