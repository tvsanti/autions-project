<template>
  <div class="filtrosVue">
    <i v-if="toggleFiltro" @click="toggleFiltro = !toggleFiltro" class="fa-solid fa-arrow-right esconder"></i>
    <i v-if="!toggleFiltro" @click="toggleFiltro = !toggleFiltro" class="fa-solid fa-arrow-left esconder"></i>
    <ul v-if="!toggleFiltro" class="ul1">
      <div>
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
            <select @change="notifyCategory" v-model="category" id="category">
              <option
                v-for="item in $store.state.itemsCompleta"
                :key="item"
                :value="item.titulo"
              >
                {{ item.titulo }}
              </option>
            </select>
          </div>
        </div>
        <div class="filtroLi">
          <div class="filtro2">
            <button><i class="fa-solid fa-money-bill"></i>Precio Máximo</button>
            <i
              :class="{ flechaIconoAnimacion3: animacionActiva3 }"
              @click="rotarIconos3()"
              class="fa-solid fa-caret-left flechaIcono"
            ></i>
          </div>
          <div :class="{ mostarLi3: animacionActiva3 }" class="mostrarLi">
            <input
              @change="notifyPrecio"
              v-model="precioFiltro"
              id="precioFiltro"
              min="0"
              :max="numeroMax+1"
              step="1"
              type="range"
            />
            <input id="inputPrecio" @change="notifyPrecio" type="number" v-model="precioFiltro" placeholder="Precio Máximo">

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
          <div :class="{ mostarLi4: animacionActiva4 }" class="mostrarLi">
            <select @change="notify" v-model="message" id="message">
              <option value="Nuevo con etiqueta">Nuevo con etiqueta</option>
              <option value="Nuevo sin etiqueta">Nuevo sin etiqueta</option>
              <option value="Muy bueno">Muy bueno</option>
              <option value="Bueno">Bueno</option>
              <option value="Satisfactorio">Satisfactorio</option>
            </select>
          </div>
        </div>
        <div class="filtroLi">
          <div class="filtro2">
            <button><i class="fa-solid fa-sort"></i>Ordenar Por</button>
            <i
            :class="{ flechaIconoAnimacion4: animacionActiva4 }"
            @click="rotarIconos2()"
            class="fa-solid fa-caret-left flechaIcono"
            ></i>
          </div>
          <div :class="{ mostarLi2: animacionActiva2 }" class="mostrarLi">
            <div class="mostarLi">
              <select @change="notifyOrdenar" v-model="ordenar" id="ordenar">
              <option value="mayor">Precio: de mayor a menor</option>
              <option value="menor">Precio: de menor a mayor</option>
            </select>
            </div>
          </div>
        </div>
      </div>
      
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "App",
  emits: ["onFire", "onFirePrecio, onFireCategory, onFireOrdenar"],
  setup(props, { emit }) {
    const message = ref("");
    const precioFiltro = ref("");
    const category = ref("");
    const ordenar = ref("");

    const notify = () => {
      emit("onFire", message.value);
    };
    const notifyOrdenar = () => {
      emit("onFireOrdenar", ordenar.value);
    };
    const notifyCategory = () => {
      emit("onFireCategory", category.value);
    };
    const notifyPrecio = () => {
      emit("onFirePrecio", precioFiltro.value);
    };
    return { message, notify, notifyPrecio, notifyCategory, notifyOrdenar,precioFiltro, ordenar,category };
  },
  data() {
    return {
      animacionActiva1: false,
      animacionActiva2: false,
      animacionActiva3: false,
      animacionActiva4: false,
      buttonTrigger: false,
      numeroMax: 1000000,
      toggleFiltro: true
    };
  },
  methods: {
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
  async mounted() {
    await axios
      .get(`http://localhost:3001/api/${this.$route.params.id}`)
      .then((res) => {
        const { data } = res;
        this.numeroMax = data[data.length-1][0].numero_maximo
      });
  }
};
</script>

<style></style>
