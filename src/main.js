import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vueClickOutside from 'click-outside-vue3'

createApp(App).use(vueClickOutside).mount('#app')
