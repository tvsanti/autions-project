<template>
  <div class="popup">
    <div class="popup2">
      <a class="popup-close" @click="ToggleLocalizacion()"
        ><i class="fa-solid fa-x"></i
      ></a>
      <h1>{{ palabra }}</h1>
      <form
        class="localizacion"
        action=""
        method="post"
      >
        <input v-model="palabra" @keyup="buscarPalabra(palabra)" type="text" />
      </form>
      <ul v-for="busqueda in arrayBuscador" :key="busqueda">
        <li>{{ busqueda.address.town || busqueda.address.village || busqueda.address.city}}, {{ busqueda.address.state_district }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require("axios")

export default {
  props: ["ToggleLocalizacion"],
  data() {
    return {
      registerToggle: "loggin",
      palabra: "",
      arrayBuscador: []
    };
  },
  methods: {
    setLoggin() {
      this.registerToggle = "loggin";
    },
    setRegister() {
      this.registerToggle = "register";
    },
    buscarPalabra(palabra){
      const apiKey = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${palabra}&format=json&limit=4&countrycodes=es`
      axios.get(apiKey)
        .then(res => {
          const {data} = res
          this.arrayBuscador = data
          console.log(this.arrayBuscador);
        })
    }
  },
};
</script>

<style></style>
