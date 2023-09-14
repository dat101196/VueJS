import './assets/css/base.css'
import './assets/css/main.css'
import './assets/css/button.css'
import './assets/css/grid.css'
import './assets/css/responsive.css'
import './assets/css/themify-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AppLinkVue from './components/AppLink.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('AppLink', AppLinkVue).mount('#app')


