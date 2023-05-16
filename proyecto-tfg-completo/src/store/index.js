import { createStore } from 'vuex'
export default createStore({
    state: {
        count: 0,
        isActive: true,
        titulo: "Más categorias",
        siguienteSaldo: 0,
        items: [
            {
                titulo: "Joyas",
                icon: "fas fa-gem",
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
                titulo: "Joyas",
                icon: "fas fa-gem",
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
        SOCKET_COUNTER_INCREMENT(state, counter) {
            state.count = counter
        },
        SOCKET_COUNTER_DECREMENT(state, counter) {
            state.count = counter
        },
        sumarSaldo(state, saldo) {
            state.siguienteSaldo += parseFloat(saldo)
        }
    },
    actions: {
        anadirCategoriaVuex(context) {
            context.commit('anadirCategorias')
        },
        borrarCategoriaVuex(context) {
            context.commit('borrarCategoria')
        },
        socket_increment:({state, rootState}) => {
            rootState.io.emit('increment', state.count)
        }, 
        socket_decrement:({state, rootState}) => {
            rootState.io.emit('decrement', state.count)
        } 
    },
    modules: {
    }
})
