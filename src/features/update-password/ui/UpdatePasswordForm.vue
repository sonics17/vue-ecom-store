<script setup>
import {
  validatePasswordComplexity,
  validateRequired,
} from '@/shared/lib/validation'
import { AppButton } from '@/shared/ui/base/app-button'
import { AppErrorMessage } from '@/shared/ui/base/app-error-message'
import { AppInput } from '@/shared/ui/base/app-input'
import { reactive, ref } from 'vue'

const formData = reactive({ newPassword: '', confirmPassword: '' })
const errors = reactive({
  newPassword: null,
  confirmPassword: null,
  general: null,
})

const clearError = type => {
  errors[type] = null
}

const validateNewPasswordField = () => {
  errors.newPassword =
    validateRequired(formData.newPassword) ??
    validatePasswordComplexity(formData.newPassword)
}

const validatePasswordEquality = (newPassword, confirmPassword) => {
  if (newPassword === confirmPassword) return null
  return 'Confirm password does not match'
}

const validateConfirmPasswordField = () => {
  errors.confirmPassword =
    validateRequired(formData.confirmPassword) ??
    validatePasswordEquality(formData.newPassword, formData.confirmPassword)
}

const validateForm = () => {
  validateNewPasswordField()
  validateConfirmPasswordField()

  if (errors.newPassword || errors.confirmPassword) return false

  return true
}

const handleSubmit = () => {
  if (!validateForm()) return
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="update-password-form">
    <fieldset class="update-password-form__fieldset">
      <AppInput
        v-model="formData.newPassword"
        autocomplete="new-password"
        type="password"
        label-text="Password"
        :error-message="errors.newPassword"
        hint-message="Use 8 or more characters with a mix of letters, numbers & symbols"
        placeholder="••••••••"
        class="update-password-form__input"
        @blur="validateNewPasswordField"
        @focus="clearError('newPassword')"
      ></AppInput>
      <AppInput
        v-model="formData.confirmPassword"
        autocomplete="new-password"
        type="password"
        label-text="Confirm Password"
        :error-message="errors.confirmPassword"
        hint-message=""
        placeholder="••••••••"
        class="update-password-form__input"
        @blur="validateConfirmPasswordField"
        @focus="clearError('confirmPassword')"
      ></AppInput>
    </fieldset>

    <div class="update-password-form__button-wrapper">
      <AppErrorMessage
        :message="errors.general"
        class="update-password-form__error-message"
      ></AppErrorMessage>
      <AppButton type="submit" class="update-password-form__button"
        >Reset password</AppButton
      >
    </div>
  </form>
</template>

<style scoped>
.update-password-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.update-password-form__fieldset {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.update-password-form__button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.update-password-form__button {
  align-self: flex-start;
  min-width: 167px;
}
</style>
