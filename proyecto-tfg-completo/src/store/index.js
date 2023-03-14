import { createStore } from 'vuex'
export default createStore({
    state: {
        isActive: true,
        titulo: "Más categorias",
        items: [
            {
                titulo: "Todas las categorias",
                icon: "fas fa-eye",
            },
            {
                titulo: "Motor",
                icon: "fas fa-car",
            },
            {
                titulo: "Moda y accesorios",
                icon: "fas fa-shirt",
            },
            {
                titulo: "Consolas y Videojuegos",
                icon: "fas fa-gamepad",
            },
            {
                titulo: "Bicicletas",
                icon: "fas fa-bicycle",
            },
            {
                titulo: "Hogar y jardín",
                icon: "fas fa-couch",
            },
            {
                titulo: "Inmobiliaria",
                icon: "fas fa-house",
            },
            {
                titulo: "TV, audio y foto",
                icon: "fas fa-tv",
            },
        ],
        masCategorias: [
            {
                titulo: "Teléfonos móbiles",
                icon: "fas fa-mobile",
            },
            {
                titulo: "Informática",
                icon: "fas fa-computer",
            },
            {
                titulo: "Deporte",
                icon: "fas fa-basketball",
            },
            {
                titulo: "Electrodomésticos",
                icon: "fas fa-plug",
            },
        ],
        itemsCompleta: [
            {
                titulo: "Todas las categorias",
                icon: "fas fa-eye",
            },
            {
                titulo: "Motor",
                icon: "fas fa-car",
            },
            {
                titulo: "Moda y accesorios",
                icon: "fas fa-shirt",
            },
            {
                titulo: "Consolas y Videojuegos",
                icon: "fas fa-gamepad",
            },
            {
                titulo: "Bicicletas",
                icon: "fas fa-bicycle",
            },
            {
                titulo: "Hogar y jardín",
                icon: "fas fa-couch",
            },
            {
                titulo: "Inmobiliaria",
                icon: "fas fa-house",
            },
            {
                titulo: "TV, audio y foto",
                icon: "fas fa-tv",
            },
            {
                titulo: "Teléfonos móbiles",
                icon: "fas fa-mobile",
            },
            {
                titulo: "Informática",
                icon: "fas fa-computer",
            },
            {
                titulo: "Deporte",
                icon: "fas fa-basketball",
            },
            {
                titulo: "Electrodomésticos",
                icon: "fas fa-plug",
            },

        ],
        estado: [
            {
                estado: 'Nuevo con etiqueta',
            },
            {
                estado: 'Nuevo sin  etiqueta',
            },
            {
                estado: 'Muy bueno',
            },
            {
                estado: 'Bueno',
            },
            {
                estado: 'Satisfactorio',
            },
        ]
    },
    getters: {
    },
    mutations: {
        anadirCategorias(state) {
            state.masCategorias.map((i) => state.items.push(i));
            state.titulo = "Ver menos";
        },
        borrarCategoria(state) {
            state.masCategorias.map((i) => state.items.pop(i));
            state.titulo = "Más categorias";
        },
    },
    actions: {
        anadirCategoriaVuex(context) {
            context.commit('anadirCategorias')
        },
        borrarCategoriaVuex(context) {
            context.commit('borrarCategoria')
        }
    },
    modules: {
    }
})
