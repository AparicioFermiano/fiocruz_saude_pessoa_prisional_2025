import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import 'typeface-lato'
import 'typeface-merriweather'

const app = createApp(App)

app.use(router)

app.mount('#app')
