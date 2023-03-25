import { createApp } from 'vue'
import MainVue from './MainVue.vue'
import router from './router/index'
import store from './store'
import VueCookies from 'vue-cookies'

createApp(MainVue).use(VueCookies,{expires: '3d'}).use(store).use(router).mount('#app')
