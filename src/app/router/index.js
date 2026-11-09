import { useAuthStore } from '@/shared/auth'
import { createWebHistory, createRouter } from 'vue-router'
import routes from './config/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.initializeAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'signIn' }
  }
})
