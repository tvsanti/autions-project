import { createApp } from 'vue'
import MainVue from './MainVue.vue'
import router from './router/index'
import store from './store'

createApp(MainVue).use(store).use(router).mount('#app')
