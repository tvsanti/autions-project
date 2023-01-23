import { createRouter, createWebHistory } from "vue-router";

// importamos nustras vistas
import Home from "../views/HomeVue"
import Publicar from "../views/PublicarVue"
import Buscar from "../views/BuscarVue"

// creamos la instancia router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home'
        },
        {
            path: '/publicar',
            component: Publicar,
            name: 'Publicar'
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
    ]
  })

// Exportamos la instancia router
export default router