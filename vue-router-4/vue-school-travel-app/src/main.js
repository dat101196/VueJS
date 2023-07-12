import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router'
import AppLink from '@/components/AppLink.vue'

const pinia = createPinia();
const app = createApp(App);

app.component('AppLink', AppLink)
    .use(router)
    .use(pinia)
    .mount('#app')
