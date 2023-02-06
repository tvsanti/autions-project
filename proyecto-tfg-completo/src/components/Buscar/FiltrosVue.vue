<template>
  <localizacion-popup v-if="buttonTrigger" :ToggleLocalizacion="() => ToggleLocalizacion()"/>
  <div class="filtrosVue">
    <ul class="ul1">
      <div class="filtroLi">
        <div class="filtro2">
          <button><i class="fa-solid fa-list-check"></i>Categorias</button>
          <i
            :class="{ flechaIconoAnimacion1: animacionActiva1 }"
            @click="rotarIconos1()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>
        <div :class="{ mostarLi2: animacionActiva1 }" class="mostrarLi">
          <select name="" id="">
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
      </div>

      <div class="filtroLi">
        <div class="filtro2">
          <button>
            <i class="fa-sharp fa-solid fa-location-dot"></i>Localización
          </button>
          <i
            :class="{ flechaIconoAnimacion2: animacionActiva2 }"
            @click="rotarIconos2()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>

        <div :class="{ mostarLi2: animacionActiva2 }" class="mostrarLi">
          <button @click="ToggleLocalizacion()" id="button-locationFiltros">
            <i class="fa-solid fa-location-dot"></i>Localización
          </button>
        </div>
      </div>
      <div class="filtroLi">
        <div class="filtro2">
          <button><i class="fa-solid fa-money-bill"></i>Precio</button>
          <i
            :class="{ flechaIconoAnimacion3: animacionActiva3 }"
            @click="rotarIconos3()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>
      </div>
      <div class="filtroLi">
        <div class="filtro2">
          <button>
            <i class="fa-solid fa-star-of-life"></i>Estado del Productos
          </button>
          <i
            :class="{ flechaIconoAnimacion4: animacionActiva4 }"
            @click="rotarIconos4()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>
      </div>
    </ul>
    <ul class="ul2">
      <button>Ordenar Por</button>
    </ul>
  </div>
</template>

<script>
import LocalizacionPopup from '../Localizacion/LocalizacionPopup.vue';

export default {
  name: "App",
  components: { 
    LocalizacionPopup
   },
  data() {
    return {
      animacionActiva1: false,
      animacionActiva2: false,
      animacionActiva3: false,
      animacionActiva4: false,
      buttonTrigger: false
    };
  },
  methods: {
    ToggleLocalizacion() {
      this.buttonTrigger = !this.buttonTrigger

    },
    rotarIconos1() {
      this.animacionActiva1 = !this.animacionActiva1;
    },
    rotarIconos2() {
      this.animacionActiva2 = !this.animacionActiva2;
    },
    rotarIconos3() {
      this.animacionActiva3 = !this.animacionActiva3;
    },
    rotarIconos4() {
      this.animacionActiva4 = !this.animacionActiva4;
    },
  },
};
</script>

<style></style>
