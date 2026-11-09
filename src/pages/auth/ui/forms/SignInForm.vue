<script setup>
import { reactive, ref } from 'vue'
import { AppButton } from '@/shared/ui/base/app-button'
import { AppInput } from '@/shared/ui/base/app-input'
import { validateEmail, validateRequired } from '@/shared/lib/validation'
import { AppErrorMessage } from '@/shared/ui/base/app-error-message'
import { authApi } from '@/shared/auth/authApi'

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

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await authApi.signInWithPassword(formData)
  } catch (error) {
    console.log(error)
    errors.general = 'Something went wrong, try again'
  } finally {
    isSubmitting.value = false
  }
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
