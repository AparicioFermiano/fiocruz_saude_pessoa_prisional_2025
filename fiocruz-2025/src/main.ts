import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/style.css'
import 'typeface-lato'
import 'typeface-merriweather'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
const pinia = createPinia()

const app = createApp(App)

app.use(FloatingVue)
app.use(router)
app.use(pinia)

app.mount('#app')
