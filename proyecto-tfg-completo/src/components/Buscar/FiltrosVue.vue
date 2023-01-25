<template>
  <div class="filtrosVue">
    <ul class="ul1">
      <div class="filtroLi">
        <div class="filtro2">
          <button><i class="fa-solid fa-list-check"></i>Categorias</button>
          <i
            :class="{ flechaIconoAnimacion: animacionActiva }"
            @click="rotarIconos()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>
        <div :class="{mostarLi2: animacionActiva}" class="mostrarLi">
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
            :class="{ flechaIconoAnimacion: animacionActiva }"
            @click="rotarIconos()"
            class="fa-solid fa-caret-left flechaIcono"
          ></i>
        </div>
      </div>
      <div class="filtroLi">
        <div class="filtro2">
          <button><i class="fa-solid fa-money-bill"></i>Precio</button>
          <i
            :class="{ flechaIconoAnimacion: animacionActiva }"
            @click="rotarIconos()"
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
            :class="{ flechaIconoAnimacion: animacionActiva }"
            @click="rotarIconos()"
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
export default {
  name: "App",
  components: {},
  data() {
    return {
      animacionActiva: false,
    };
  },
  methods: {
    rotarIconos() {
      this.animacionActiva = !this.animacionActiva;
    },
  },
};
</script>

<style></style>
