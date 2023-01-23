<template>
  <div class="categoriaVue">
    <h1>Quieres comprar o subastar?</h1>
    <h3>Descuble todas nuestras categorias</h3>
    <div class="categorias">
      <div>
        <div v-for="item in items" :key="item">
          <router-link :to="{name: 'BuscarId', params: { id: item.titulo, },}">
          <!-- <router-link to="/buscar"> -->
            <h4>{{ item.titulo }}</h4>
            <i :class="item.icon"></i>
          </router-link>
        </div>
      </div>
      <button v-if="items.length === 8" @click="anadirCategorias()">
        {{ titulo }}
      </button>
      <button v-else-if="items.length === 12" @click="borrarCategoria()">
        {{ titulo }}
      </button>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "CategoriasVue",
  data() {
    return {
      isActive: true,
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
      titulo: "Más categorias",
    };
  },
  methods: {
    anadirCategorias() {
      this.masCategorias.map((i) => this.items.push(i));
      this.titulo = "Ver menos";
    },
    borrarCategoria() {
      this.masCategorias.map((i) => this.items.pop(i));
      this.titulo = "Más categorias";
    },
  },
};
</script>

<style lang="sass"></style>
