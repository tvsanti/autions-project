<template>
  <HeaderPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()"/>

  <header>
    <img src="../../../img/logo1.png" alt="">
    <div class="header-buttons">
      <button @click="() => TogglePopup()">
        Iniciar sesión | Registrarse
      </button>
      <button class="button-color">
        <i class="fa-solid fa-circle-plus"></i>Publicar
      </button>
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
    }
  }
};
</script>

<style lang="sass"></style>
