<template>
  <HeaderPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()"/>

  <header>
    <router-link to="/">
      <img src="../../../img/logo1.png" alt="">
    </router-link>
    <div class="header-buttons">
      <button v-if="!$cookies.get('loginCookie')" @click="TogglePopup()">
        Iniciar sesión | Registrarse
      </button>
      <button v-else-if="$cookies.get('loginCookie')" @click="LogOut()">
        Log Out
      </button>
      
      <router-link to="/publicar">
        <button class="button-color">
          <i class="fa-solid fa-circle-plus"></i>Publicar
        </button>
      </router-link>
    </div>
  </header>
</template>

<script>
import HeaderPopup from "./HeaderPopup.vue";

export default {
  name: "HeaderVue",

  components: {
    HeaderPopup,
  },
  data() {
    return {
      buttonTrigger: false
    }
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger
    },
    LogOut() {
      this.$cookies.remove('loginCookie')
      this.$forceUpdate()
    }
  }
};
</script>

<style lang="sass"></style>
