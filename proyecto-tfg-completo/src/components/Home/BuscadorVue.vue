<template>
  <div class="buscadorVue">
    <h1>Encuentra tesoros,<br>gana emociones</h1>
    <div class="menu-buscador">
      <input type="text" v-model="consultaBuscar" placeholder="Buscar producto" />
      <router-link :to="{name: 'BuscarId', params: { id: copiaBuscar, },}">
        <i @click="limpiarPalabra" class="fa-solid fa-magnifying-glass"></i>
      </router-link>
    </div>
    <div class="home-valoraions">
      <i class="fa-brands fa-google"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuscadorVue",
  data() {
    return {
      consultaBuscar: "",
      copiaBuscar: " "
    }
  },
  methods: {
    limpiarPalabra() {
      this.copiaBuscar = this.consultaBuscar
      this.consultaBuscar = this.consultaBuscar.slice(1)
    }
  }
};
</script>

<style></style>
