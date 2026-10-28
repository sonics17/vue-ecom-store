<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/entities/category/model/store'
import { Header } from '@/widgets/header'
import Footer from '@/widgets/footer/ui/Footer.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.loadCategories()
})
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
