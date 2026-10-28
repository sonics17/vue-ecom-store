<script setup>
import { reactive, ref } from 'vue'
import { AppButton } from '@/shared/ui/base/app-button'
import { AppInput } from '@/shared/ui/base/app-input'
import { AppErrorMessage } from '@/shared/ui/base/app-error-message'
import { validateEmail, validateRequired } from '@/shared/lib/validation'

const email = ref('')
const errors = reactive({ email: null, general: null })

const validateEmailField = () => {
  errors.email = validateRequired(email.value) ?? validateEmail(email.value)
}

const clearError = type => {
  errors[type] = null
}

const validateForm = () => {
  validateEmailField()

  if (errors.email) return false

  return true
}

const handleSubmit = () => {
  if (!validateForm()) return
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate class="forgot-password-form">
    <AppInput
      v-model.trim="email"
      type="email"
      name="email"
      autocomplete="email"
      label-text="Email"
      :error-message="errors.email"
      placeholder="your_email@gmail.com"
      class="forgot-password-form__input"
      @blur="validateEmailField"
      @focus="clearError('email')"
    ></AppInput>

    <div class="forgot-password-form__button-wrapper">
      <AppErrorMessage
        :message="errors.general"
        class="forgot-password-form__error-message"
      ></AppErrorMessage>
      <AppButton type="submit" class="forgot-password-form__button"
        >Send</AppButton
      >
    </div>
  </form>
</template>

<style lang="scss" scoped>
.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.forgot-password-form__button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.forgot-password-form__button {
  align-self: start;
  min-width: 167px;
}
</style>
