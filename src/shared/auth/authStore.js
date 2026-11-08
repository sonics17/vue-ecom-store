import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from './authApi'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)
  const isInitialized = ref(false)

  const initializeAuth = () => {
    if (isInitialized.value) return

    const { data } = authApi.subscribeToAuthChange((event, session) => {
      isAuthenticated.value = Boolean(session)

      if (event === 'INITIAL_SESSION') {
        isInitialized.value = true
      }
    })
  }

  return { isAuthenticated, isInitialized, initializeAuth }
})
