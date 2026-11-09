import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './styles'
import { useAuthStore } from '@/shared/auth'

const application = createApp(App)

const pinia = createPinia()

application.use(pinia)

application.use(router)

router.isReady().then(() => {
  application.mount('#app')
})
