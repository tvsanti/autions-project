<template>
  <div class="popup">
    <div class="popup2">
      <a class="popup-close" @click="ToggleLocalizacion()"
        ><i class="fa-solid fa-x"></i
      ></a>
      <form class="localizacion">
        <h2>Busca tu localizacion</h2>
        <input v-model="palabra" @keyup="buscarPalabra(palabra)" type="text" />
      </form>
      <ul v-for="busqueda in arrayBuscador" :key="busqueda">
        <li v-if="busqueda.class == 'boundary'">
          <i class="fa-solid fa-location-dot"></i>
          <span>
            {{busqueda.address.town || busqueda.address.village || busqueda.address.city }}, {{ busqueda.address.state_district }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: ["ToggleLocalizacion"],
  data() {
    return {
      registerToggle: "loggin",
      palabra: "",
      arrayBuscador: [],
      isTown: "",
    };
  },
  methods: {
    setLoggin() {
      this.registerToggle = "loggin";
    },
    setRegister() {
      this.registerToggle = "register";
    },
    buscarPalabra(palabra) {
      const apiKey = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${palabra}&format=json&countrycodes=es`;
      axios.get(apiKey).then((res) => {
        let { data } = res;
        console.log(data);
        data = data.filter(i => i.display_name.split(',').length -1 >= 3)
        this.arrayBuscador = data;

      });
    },
  },
};
</script>

<style></style>
