import { createRouter, createWebHistory } from "vue-router";

// importamos nustras vistas
import Home from "../views/HomeVue"
import Publicar from "../views/PublicarVue"
import Subasta from "../views/SubastaVue"
import Buscar from "../views/BuscarVue"
import Perfil from '../views/PerfilVue.vue'
import Favourites from '../views/FavouritesVue.vue'
import Error404Vue from '../views/Error404Vue.vue'
import SuccessVue from '../views/SuccessVue.vue'
import CancelVue from '../views/CancelVue.vue'
import VueCookies from 'vue-cookies'

// creamos la instancia router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home',
        },
        {
            path: '/publicar/',
            component: Publicar,
            name: 'Publicar',
            beforeEnter: (to, from, next) => {
                if ( VueCookies.get('loginCookie') == null ) {
                    next('/error404');
                } else {
                    next();
                }
            }
        },
        {
            path: '/buscar',
            component: Buscar,
            name: 'Buscar'
        },
        {
            path: '/buscar/:id',
            component: Buscar,
            name: 'BuscarId'
        },
        {
            path: '/subasta/:id/:categoria/:titulo',
            component: Subasta,
            name: 'Subasta'
        },
        {
            path: '/perfil',
            component: Perfil,
            name: 'PerfilVue',
            beforeEnter: (to, from, next) => {
                if ( VueCookies.get('loginCookie') == null ) {
                    next('/error404');
                } else {
                    next();
                }
            }
        },
        {
            path: '/favourites',
            component: Favourites,
            name: 'FavouritesVue',
            beforeEnter: (to, from, next) => {
                if ( VueCookies.get('loginCookie') == null ) {
                    next('/error404');
                } else {
                    next();
                }
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error404Vue',
            component: Error404Vue
        },
        {
            path: '/success',
            name: 'Success',
            component: SuccessVue
        },
        {
            path: '/cancel',
            name: 'cancel',
            component: CancelVue
        },
    ],
})

// Exportamos la instancia router
export default router