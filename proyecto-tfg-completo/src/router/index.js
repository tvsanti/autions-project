import { createRouter, createWebHistory } from "vue-router";

// importamos nustras vistas
import Home from "../views/HomeVue.vue"
import Publicar from "../views/Publicar.vue"

// Creamos el array de rutas
const routes = [
    {
        path: '/',
        component: Home
    },

    {
        path: '/publicar',
        component: Publicar
    },
]

// creamos la instancia router
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

// Exportamos la instancia router
export default router