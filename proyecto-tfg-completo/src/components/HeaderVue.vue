<template>
  <HeaderPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()" />
  <SaldoVueVue
    v-if="buttonTriggerSlado"
    :TogglePopup="() => TogglePopupSaldo()"
  />
  <header>
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="../../../img/logo1.png" alt="" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="header-buttons navbar-nav collapse navbar-collapse" id="navbarTogglerDemo01">
            <router-link class="nav-item heartButton" to="/favourites">
              <i class="fa-regular fa-heart"></i>
            </router-link>
            <button class="nav-item" v-if="!$cookies.get('loginCookie')" @click="TogglePopup()">
              Iniciar sesión | Registrarse
            </button>
            <button class="nav-item" v-else-if="$cookies.get('loginCookie')" @click="LogOut()">
              Log Out
            </button>
            <div class="dropdown nav-item">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Perfil
            </a>
      
            <ul class="dropdown-menu">
              <router-link to="/perfil"> Perfil </router-link>
              <button @click="TogglePopupSaldo">
                <i class="fa-solid fa-money-bill"></i>Saldo
              </button>        
            </ul>
            </div>
              <router-link to="/publicar">
                <button class="button-color">
                  <i class="fa-solid fa-circle-plus"></i>Publicar
                </button>
              </router-link>
          </div>            
      </div>
    </nav>
  </header>
</template>

<script>
import SaldoVueVue from "@/components/SaldoVue.vue";

import HeaderPopup from "./HeaderPopup.vue";
export default {
  name: "HeaderVue",

  components: {
    HeaderPopup,
    SaldoVueVue,
  },
  data() {
    return {
      buttonTrigger: false,
      buttonTriggerSlado: false,
      showMenu: false,
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    TogglePopupSaldo() {
      this.buttonTriggerSlado = !this.buttonTriggerSlado;
    },
    LogOut() {
      this.$cookies.remove("loginCookie");
      this.$forceUpdate();
    },
  },
};
</script>
