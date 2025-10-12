import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import 'typeface-lato'
import 'typeface-merriweather'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(FloatingVue)
app.use(router)

app.mount('#app')
