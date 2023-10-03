import './assets/css/base.css'
import './assets/css/main.css'
import './assets/css/button.css'
import './assets/css/input.css'
import './assets/css/grid.css'
import './assets/css/responsive.css'
import './assets/css/themify-icons.css'
import './assets/css/cart.css'
import './assets/css/menu.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import AppLinkVue from './components/AppLink.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// pinia.use((context) => {
//   console.log('[pinia] context: ', context)
//   //sync store from local storage
//   const storeId = context.store.$id
//   const serializer = {
//     serialize: JSON.stringify,
//     deserialize: JSON.parse
//   }

//   if (storeId == 'cartManager') {
//     const cartStateFrStorage = window.localStorage.getItem(storeId)
//     console.log('[pinia] cart state from storage: ', cartStateFrStorage)
//     if (cartStateFrStorage) {
//       const cartState = JSON.parse(cartStateFrStorage)
//       console.log('[pinia] cart state: ', cartState)
//       console.log('[pinia] cart state 2: ', JSON.parse(cartStateFrStorage))
//       context.store.$patch(cartState)
//     }
//   }
//   //list for changes and update local storage
//   context.store.$subscribe((mutation, state) => {
//     console.log('[pinia] mutation: ', mutation)
//     console.log('[pinia] store id: ', storeId)
//     console.log('[pinia] state: ', state)
//     if (storeId == 'cartManager') {
//       console.log('Save cart to local storage')
//       window.localStorage.setItem(storeId, serializer.serialize(state))
//     }
//   })
// })
app.use(pinia)
app.use(router)

app.component('AppLink', AppLinkVue).mount('#app')
