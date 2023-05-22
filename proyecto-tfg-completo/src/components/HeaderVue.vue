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
          <img src="../../img/logo1.png" alt="" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="header-buttons navbar-nav collapse navbar-collapse" id="navbarTogglerDemo01">
              <router-link to="/publicar">
                <button class="button-color">
                  <i class="fa-solid fa-circle-plus"></i>Publicar
                </button>
              </router-link>
            <div class="dropdown nav-item">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user"></i> Perfil
              </a>
              
              <ul class="dropdown-menu">
                <router-link to="/perfil"><i class="fa-solid fa-user"></i>Perfil </router-link>
                <button @click="TogglePopupSaldo">
                  <i class="fa-solid fa-money-bill"></i>Saldo
                </button>        
              </ul>
            </div>
            <router-link class="nav-item heartButton" to="/favourites">
              <button>
                Favoritos <i class="fa-regular fa-heart"></i>
              </button>
            </router-link>
            <button class="nav-item inicioSesion" v-if="!$cookies.get('loginCookie')" @click="TogglePopup()">
              Iniciar sesión
            </button>
            <button class="nav-item inicioSesion" v-else-if="$cookies.get('loginCookie')" @click="LogOut()">
              Log Out
            </button>

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
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger;
    },
    TogglePopupSaldo() {
      const cookie = this.$cookies.get("loginCookie")
      if (cookie) {
        this.buttonTriggerSlado = !this.buttonTriggerSlado;
      }else{
        this.TogglePopup()
      }
    },
    LogOut() {
      this.$cookies.remove("loginCookie");
      this.$forceUpdate();
    },
  },
};
</script>
