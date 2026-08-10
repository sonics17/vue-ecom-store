<script setup>
import Footer from '@/widgets/footer/ui/Footer.vue'
import { Header } from '@/widgets/header'
</script>
<template>
  <div class="app-layout">
    <Header></Header>
    <main class="app-layout__main">
      <slot></slot>
    </main>
    <Footer></Footer>
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
