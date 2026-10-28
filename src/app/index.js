import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import App from './App.vue'
import './styles'

const application = createApp(App).use(router).use(createPinia())

router.isReady().then(() => {
  application.mount('#app')
})
