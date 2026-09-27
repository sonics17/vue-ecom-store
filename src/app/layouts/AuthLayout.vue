<script setup>
import { HeaderAuth } from '@/widgets/header-auth'
</script>

<template>
  <div class="app-layout">
    <HeaderAuth></HeaderAuth>
    <main class="app-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.app-layout__main {
  flex-grow: 1;
}
</style>
