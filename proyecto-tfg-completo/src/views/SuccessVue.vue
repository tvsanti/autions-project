<template>
  <section class="success">
    <h1>¡Enhorabuena! Tu pago ha sido procesado correctamente.</h1>
    <router-link to="/">Pulsa aqui para volver a Home</router-link>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cantidad: null,
    };
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie")
    await axios
      .post(
        `http://localhost:3001/miDinero/${cookie.id_cliente}`,{precio: this.$store.state.siguienteSaldo}
      )
  },
};
</script>
