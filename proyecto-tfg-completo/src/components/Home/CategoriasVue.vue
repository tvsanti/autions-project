<template>
  <div class="categoriaVue">
    <div class="categoriaTitutlos">
      <h1>¿Comprar o subastar?</h1>
      <h3>Descuble todas nuestras opciones</h3>
    </div>
    <div class="categorias">
      <div>
        <div v-for="item in $store.state.items" :key="item">
          <router-link :to="{name: 'BuscarId', params: { id: item.titulo, },}">
          <!-- <router-link to="/buscar"> -->
            <h4>{{ item.titulo }}</h4>
            <i :class="item.icon"></i>
          </router-link>
        </div>
      </div>
      <button v-if="$store.state.items.length === 8" @click="anadirCategorias()">
        {{ $store.state.titulo }}
      </button>
      <button v-else-if="$store.state.items.length === 12" @click="borrarCategoria()">
        {{ $store.state.titulo }}
      </button>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "CategoriasVue",
  methods: {
    anadirCategorias() {
      this.$store.dispatch('anadirCategoriaVuex')
    },
    borrarCategoria() {
      this.$store.dispatch('borrarCategoriaVuex')
    },
  },
};
</script>

<style lang="sass"></style>
