<script setup>
import { HeaderAuth } from '@/widgets/header-auth'
</script>

<template>
  <div class="auth-layout">
    <HeaderAuth></HeaderAuth>
    <main class="auth-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.auth-layout__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
