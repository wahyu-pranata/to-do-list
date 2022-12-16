import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vueClickOutside from 'click-outside-vue3'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

createApp(App)
    .use(router)
    .use(vueClickOutside)
    .use(ConfirmDialog)
    .mount('#app')
