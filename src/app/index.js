import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/app/styles/index.css'
import { router } from './router'

export const application = createApp(App).use(router).use(createPinia())