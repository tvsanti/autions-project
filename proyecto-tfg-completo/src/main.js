import { createApp } from 'vue'
import MainVue from './MainVue.vue'
import router from './router/index'

createApp(MainVue).use(router).mount('#app')
