<template>
  <div class="popup">
    <div class="popup2">
      <a class="popup-close" @click="TogglePopup()"
        ><i class="fa-solid fa-x"></i
      ></a>
      <div class="saldo">
        <h1>Mi Cuenta Bancaria</h1>
        <h3>Ingresa la cantidad a depositar:</h3>
        <div>
          <label for="cantidad">Cantidad:</label>
          <input v-model="cantidad" /><br />
          <button @click="depositar">Depositar</button>
        </div>
        <h3>Tu saldo actual es: {{ miDinero || 0 }}€</h3>
      </div>
    </div>
  </div>
</template>
    
<script>
import axios from "axios";
export default {
  props: ["TogglePopup"],
  data() {
    return {
      cantidad: 0,
      miDinero: 0,
    };
  },
  methods: {
    async depositar() {
      const cookie = this.$cookies.get("loginCookie")
      this.$store.commit('sumarSaldo',this.cantidad)    
      await axios
        .post(
          `http://localhost:3001/pujar/${cookie.id_cliente}`,
          { price: this.cantidad }
        )
        .then((res) => {
          window.location.href = res.data.url;
        });
    },
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie")
    await axios
      .get(
        `http://localhost:3001/miDinero/${cookie.id_cliente}`,
      )
      .then((res) => {
        this.miDinero = res.data.saldo.saldo
      });
  },
};
</script>
<style lang="sass">
.saldo
  display: flex
  justify-content: center
  flex-direction: column
  gap: 1rem
  h3
    font-weight: 400
    font-size: 1.3rem
  label
    margin-right: 1rem
  button
    background-color: #bb1e26
    color: white
    border: none
    margin-top: 1rem
    padding: .5rem 2rem
    border-radius: .4rem
</style>
    