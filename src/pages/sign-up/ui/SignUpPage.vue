<script setup>
import { SignUpForm } from '@/features/sign-up-by-email'
import promoImage from '@/shared/assets/images/banners/promo-banner-2.webp'
import { useDeviceBreakpoints } from '@/shared/lib/composables/useDeviceBreakpoints'
import { Typography } from '@/shared/ui/base/typography'

const { isMobile } = useDeviceBreakpoints()
</script>

<template>
  <div class="sign-up-page">
    <div v-if="!isMobile" class="sign-up-page__image">
      <img :src="promoImage" alt="" />
    </div>
    <div class="sign-up-page__content">
      <Typography tag="h1" size="2xl" weight="bold" class="sign-up-page__title"
        >Sign Up</Typography
      >
      <Typography color="secondary" size="sm" class="sign-up-page__subtitle"
        >Sign up for free to start shopping
      </Typography>
      <SignUpForm class="sign-up-page__form"></SignUpForm>
      <Typography size="sm"
        >Already have an account?
        <RouterLink :to="{ name: 'signUp' }">Log in</RouterLink>
      </Typography>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.sign-up-page {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}
.sign-up-page__image {
  flex: 0 0 50%;
}
.sign-up-page__image {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-up-page__image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.sign-up-page__content {
  align-self: center;
  padding: 0px 12px 0px 12px;
  box-sizing: border-box;

  @media (min-width: $breakpoint-tablet) {
    padding: 12px 40px 12px 40px;
    flex: 0 0 50%;
  }
}
.sign-up-page__title {
  margin-bottom: 10px;
}
.sign-up-page__subtitle {
  margin-bottom: 50px;
}
.sign-up-page__form {
  margin-bottom: 10px;
  max-width: 500px;
}
</style>
