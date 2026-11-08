import { useAuthStore } from '@/shared/auth'
import { createWebHistory, createRouter } from 'vue-router'
import routes from './config/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (!to.meta.requiresAuth) return

  console.log(authStore.isAuthenticated)
  if (
    to.meta.requiresAuth &&
    authStore.isInitialized &&
    !authStore.isAuthenticated
  ) {
    return { name: 'signIn' }
  }
})
