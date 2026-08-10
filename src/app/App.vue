<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import { useCategoryStore } from '@/entities/category/model/store'

const route = useRoute()

const layouts = {
  MainLayout,
  AuthLayout,
}

const currentLayout = computed(() => layouts[route.meta.layout] || MainLayout)

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<template>
  <div v-if="categoryStore.isLoading" class="">Loading</div>

  <component v-else :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped></style>
