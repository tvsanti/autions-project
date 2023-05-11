<template>
  <HeaderPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()" />
  <SaldoVueVue v-if="buttonTriggerSlado" :TogglePopup="() => TogglePopupSaldo()" />
  <header>
    <router-link to="/">
      <img src="../../../img/logo1.png" alt="" />
    </router-link>
    <div class="header-buttons">
      <button v-if="!$cookies.get('loginCookie')" @click="TogglePopup()">
        Iniciar sesión | Registrarse
      </button>
      <button v-else-if="$cookies.get('loginCookie')" @click="LogOut()">
        Log Out
      </button>
      <router-link to="/perfil">
        Perfil
      </router-link>
    
      <router-link class="heartButton" to="/favourites">
        <i class="fa-regular fa-heart"></i>
      </router-link>
    
      <button @click="TogglePopupSaldo"><i class="fa-solid fa-money-bill"></i>Saldo</button>

      <router-link to="/publicar">
        <button class="button-color">
          <i class="fa-solid fa-circle-plus"></i>Publicar
        </button>
      </router-link>
    </div>
  </header>
</template>

<script>
import SaldoVueVue from '@/components/SaldoVue.vue';

import HeaderPopup from "./HeaderPopup.vue";
export default {
  name: "HeaderVue",

  components: {
    HeaderPopup,
    SaldoVueVue
  },
  data() {
    return {
      buttonTrigger: false,
      buttonTriggerSlado: false,
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger;
    },
    TogglePopupSaldo() {
      this.buttonTriggerSlado = !this.buttonTriggerSlado;
    },
    LogOut() {
      this.$cookies.remove("loginCookie");
      this.$forceUpdate();
    },
    saldo() {

    }
  },
};
</script>

<style lang="sass"></style>
