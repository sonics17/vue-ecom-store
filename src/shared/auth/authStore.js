import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from './authApi'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)
  const isInitialized = ref(false)

  const initializeAuth = () => {
    return new Promise(resolve => {
      authApi.subscribeToAuthChange((event, session) => {
        isAuthenticated.value = Boolean(session)
        console.log('isAuthenticated', isAuthenticated.value)

        if (event === 'INITIAL_SESSION') {
          isInitialized.value = true
          resolve()
        }

        if (event === 'SIGNED_OUT') {
        }
      })
    })
  }

  return { isAuthenticated, isInitialized, initializeAuth }
})
