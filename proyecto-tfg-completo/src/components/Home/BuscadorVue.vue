<template>
  <div class="buscadorVue">
    <h1>Buscar productos</h1>
    <div class="menu-buscador">
      <button class="button-location"><i class="fa-solid fa-location-dot"></i>Localización</button>
      <input type="text" v-model="consultaBuscar" placeholder="Buscar producto" />
      <router-link :to="{name: 'BuscarId', params: { id: consultaBuscar, },}">
        <button class="button-buscar"><i class="fa-solid fa-magnifying-glass"></i>Buscar</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuscadorVue",
  data() {
    return {
      consultaBuscar: ' '
    }
  },
  methods: {

  }
};
</script>

<style></style>
