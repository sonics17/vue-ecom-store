<script setup>
import { reactive } from 'vue'
import { AppButton } from '@/shared/ui/base/app-button'
import { AppCheckbox } from '@/shared/ui/base/app-checkbox'
import { AppInput } from '@/shared/ui/base/app-input'
import { AppErrorMessage } from '@/shared/ui/base/app-error-message'
import {
  validateEmail,
  validatePasswordComplexity,
  validateRequired,
} from '@/shared/lib/validation'

const formData = reactive({ email: '', password: '', isAgreeToPolicy: false })
const errors = reactive({
  email: null,
  password: null,
  policy: null,
  general: null,
})

const validateEmailField = () => {
  errors.email =
    validateRequired(formData.email) ?? validateEmail(formData.email)
}

const validatePasswordField = () => {
  errors.password =
    validateRequired(formData.password) ??
    validatePasswordComplexity(formData.password)
}

const validatePolicyCheckbox = () => {
  errors.policy = !formData.isAgreeToPolicy
    ? 'Please accept the Terms of use and Privacy Policy'
    : null
}

const clearError = type => {
  errors[type] = null
}

const validateForm = () => {
  validateEmailField()
  validatePasswordField()
  validatePolicyCheckbox()

  if (errors.email || errors.password || errors.policy) {
    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validateForm()) return
  console.log(`'${formData.email}'`)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate class="sign-up-form">
    <fieldset class="sign-up-form__fieldset">
      <AppInput
        v-model.trim="formData.email"
        autocomplete="email"
        name="email"
        type="email"
        label-text="Email address"
        :error-message="errors.email"
        placeholder="your_email@gmail.com"
        class="sign-up-form__input"
        @blur="validateEmailField"
        @focus="clearError('email')"
      ></AppInput>

      <AppInput
        v-model="formData.password"
        autocomplete="new-password"
        type="password"
        name="password"
        label-text="Password"
        :error-message="errors.password"
        hint-message="Use 8 or more characters with a mix of letters & numbers"
        placeholder="••••••••"
        class="sign-up-form__input"
        @blur="validatePasswordField"
        @focus="clearError('password')"
      ></AppInput>
    </fieldset>

    <div class="sign-up-form__policy-wrapper">
      <AppCheckbox
        v-model="formData.isAgreeToPolicy"
        class="sign-up-form__checkbox"
        @change="clearError('policy')"
      >
        Agree to our
        <a href="/" target="_blank" class="sign-up-form__link typography--link"
          >Terms of use</a
        >
        and
        <a href="/" target="_blank" class="sign-up-form__link typography--link"
          >Privacy Policy</a
        >
      </AppCheckbox>

      <AppErrorMessage
        :message="errors.policy"
        class="sign-up-form__error-message"
      ></AppErrorMessage>
    </div>

    <div class="sign-up-form__button-wrapper">
      <AppErrorMessage
        :message="errors.general"
        class="sign-up-form__error-message sign-up-form__error-message--general"
      ></AppErrorMessage>

      <AppButton type="submit" class="sign-up-form__button">Sign Up</AppButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '@/shared/styles/_variables.scss' as *;

.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-height: 700px) {
    gap: 20px;
  }
}

.sign-up-form__fieldset {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sign-up-form__button-wrapper,
.sign-up-form__policy-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sign-up-form__error-message {
  min-height: 1.5rem;
  display: flex;

  &--general {
    align-items: end;
  }
}

.sign-up-form__button {
  align-self: flex-start;
  min-width: 167px;
}
</style>
