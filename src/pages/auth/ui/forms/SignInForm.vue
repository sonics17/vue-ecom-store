<script setup>
import { reactive } from 'vue'
import { AppButton } from '@/shared/ui/base/app-button'
import { AppInput } from '@/shared/ui/base/app-input'
import { validateEmail, validateRequired } from '@/shared/lib/validation'
import { AppErrorMessage } from '@/shared/ui/base/app-error-message'

const formData = reactive({ email: '', password: '' })
const errors = reactive({ email: null, password: null, general: null })

const validateEmailField = () => {
  errors.email =
    validateRequired(formData.email) ?? validateEmail(formData.email)
}

const validatePasswordField = () => {
  errors.password = validateRequired(formData.password)
}

const clearError = type => {
  errors[type] = null
}

const validateForm = () => {
  validateEmailField()
  validatePasswordField()

  if (errors.email || errors.password) {
    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validateForm()) return
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate class="sign-in-form">
    <fieldset class="sign-in-form__fieldset">
      <AppInput
        v-model.trim="formData.email"
        autocomplete="email"
        type="email"
        label-text="Email address"
        :error-message="errors.email"
        placeholder="your_email@gmail.com"
        class="sign-in-form__input"
        @blur="validateEmailField"
        @focus="clearError('email')"
      ></AppInput>

      <div class="sign-in-form__password-container">
        <AppInput
          v-model="formData.password"
          autocomplete="current-password"
          type="password"
          label-text="Password"
          :error-message="errors.password"
          placeholder="••••••••"
          class="sign-in-form__input"
          @blur="validatePasswordField"
          @focus="clearError('password')"
          #label-action
        >
          <RouterLink
            :to="{ name: 'forgotPassword' }"
            class="sign-in-form__link typography--link"
            >Forgot your password?</RouterLink
          >
        </AppInput>
      </div>
    </fieldset>

    <div class="sign-in-form__button-wrapper">
      <AppErrorMessage
        :message="errors.general"
        class="sign-in-form__error-message"
      ></AppErrorMessage>

      <AppButton type="submit" class="sign-in-form__button">Sign in</AppButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sign-in-form__fieldset {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sign-in-form__password-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sign-in-form__link {
  align-self: flex-end;
  font-size: var(--font-size-sm);
}

.sign-in-form__button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sign-in-form__error-message {
  display: flex;
  align-items: end;
}

.sign-in-form__button {
  align-self: flex-start;
  min-width: 167px;
}
</style>
