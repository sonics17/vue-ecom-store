<script setup>
import { AppButton } from '@/shared/ui/base/app-button'
import { AppInput } from '@/shared/ui/base/app-input'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')
</script>

<template>
  <div class="sign-up-form">
    <AppInput
      v-model="name"
      type="text"
      label-text="Your name"
      :error-message="''"
    ></AppInput>
    <AppInput
      v-model="email"
      type="email"
      label-text="Email address"
      :error-message="''"
    ></AppInput>
    <AppInput
      v-model="password"
      type="password"
      label-text="Password"
      :error-message="'error'"
    ></AppInput>

    <AppButton>Sign Up</AppButton>
  </div>
</template>

<style scoped></style>
