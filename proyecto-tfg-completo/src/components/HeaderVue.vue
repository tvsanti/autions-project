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
          <img src="../../img/logo1.png"  />
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
import SaldoVueVue from "@/components/Perfil/SaldoVue.vue";

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

<style lang="sass">
@import "../../style/style"
header
  @include displayFlex(row,space-around,center)
  width: 100% 

  nav
    display: none
    @include displayFlex(row,space-between,center)
    position: fixed
    width: 91%
    background: white
    img
      width: 100px
      padding: .5rem 0
    .header-buttons
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      @media only screen and (max-width: 991px)
        gap: 2rem
      .fa-circle-plus
        padding-right: .5rem
      a
        display: flex
        gap: 1rem
      i
        color: #bb1e26
        font-size: 1.2rem
      .inicioSesion
        border: 1px solid
        border-radius: 5px
        transition: .3s
        &:hover
          background: #51585e
          color: white
      .heartButton
        background: none
        button
          display: flex
          align-items: center
          gap: 1rem
          i
            font-size: 1.6rem

      .heart-none
        font-size: 2rem

      a,button
        @include buttonStyle()
        display: flex
        background: none
        justify-content: center
        align-items: center
        padding: 0 1.5rem
        text-decoration: none
        color: black
        height: 2.9rem
        font-size: 16px
        @media only screen and (max-width: 991px)
          font-size: 1.3rem



</style>
