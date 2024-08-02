import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'
import { useLoadingStore } from './stores/loading'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia)
app.use(router)

app.mount('#app')
