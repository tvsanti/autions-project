<template>
  <section class="cancel">
    <h1>¡Atención! Tu pago ha sido cancelado.</h1>
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
    const cookie = this.$cookies.get("loginCookie");
    console.log(this.$store.state.siguienteSaldo);
    await axios.post(
      `http://[::1]:3001/miDineroCancelado/${cookie.id_cliente}`
    );
  },
};
</script>
