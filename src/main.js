import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vueClickOutside from 'click-outside-vue3'

createApp(App)
    .use(vueClickOutside)
    .use(router)
    .mount('#app')
