<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import { useAuthStore } from '@/shared/auth'
import { router } from './router'

const route = useRoute()
const layouts = {
  MainLayout,
  AuthLayout,
}
const currentLayout = computed(() => layouts[route.meta.layout] || MainLayout)

const authStore = useAuthStore()

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated, wasAuthenticated) => {
    if (!isAuthenticated && wasAuthenticated && route.meta.requiresAuth) {
      router.replace({ name: 'signIn' })
    }
  },
)
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped></style>
