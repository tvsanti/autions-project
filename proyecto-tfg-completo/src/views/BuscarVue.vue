<template>
  <HeaderVue />
  <HeaderPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()" />

  <div class="contentProductos">
    <FiltrosVue
      @onFirePrecio="eventEmmitedFromChildPrecio"
      @onFire="eventEmmitedFromChild"
      @onFireCategory="eventEmmitedFromChildCategory"
      @onFireOrdenar="eventEmmitedFromChildOrdenar"
    />
    <div class="productosVue">
      <div class="productoVue">
        <div class="productoVfor" v-for="item in items" :key="item">
          <router-link
            :to="{
              name: 'Subasta',
              params: {
                id: item.id_producto,
                categoria: item.categoria,
                titulo: item.title,
              },
            }"
          >
            <img :src="item.img" alt="" />
          </router-link>
          <div class="productoDescripcion">
            <div>
              <span>{{ item.title }}</span>
              <h4 id="productoPrecio">{{ item.price }}€</h4>
            </div>
            <i
              v-if="item.favoritos"
              @click="delFavourites(item.id_producto, item.created_by)"
              class="fa-solid fa-heart"
            ></i>
            <i
              v-else
              @click="addFavourites(item.id_producto, item.created_by)"
              class="fa-regular fa-heart"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import FiltrosVue from "@/components/Buscar/FiltrosVue.vue";
import HeaderVue from "@/components/HeaderVue.vue";
import HeaderPopup from "../components/HeaderPopup.vue"

import { ref } from "vue";

export default {
  name: "ProductosVue",
  components: {
    FiltrosVue,
    HeaderVue,
    HeaderPopup
  },
  data() {
    return {
      isActive: true,
      items: [],
      buttonTrigger: false
    };
  },
  setup() {
    const estado = ref("");
    const estadoPrecio = ref("");
    const estadoCategory = ref("");
    const estadoOrdenar = ref("");
    const eventEmmitedFromChild = (message) => {
      estado.value = message;
    };
    const eventEmmitedFromChildOrdenar = (ordenar) => {
      estadoOrdenar.value = ordenar;
    };
    const eventEmmitedFromChildPrecio = (precioFiltro) => {
      estadoPrecio.value = precioFiltro;
    };
    const eventEmmitedFromChildCategory = (category) => {
      estadoCategory.value = category;
    };
    return {
      eventEmmitedFromChild,
      estado,
      eventEmmitedFromChildPrecio,
      estadoPrecio,
      eventEmmitedFromChildCategory,
      estadoCategory,
      estadoOrdenar,
      eventEmmitedFromChildOrdenar,
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger;
    },
    async addFavourites(id_producto, created_by) {
      const cookie = this.$cookies.get("loginCookie")
      if (cookie) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://localhost:3001/favourites`, object);
      await axios.post(`http://localhost:3001/favouritesProducto`, object);
      location.reload()
      } else {
        this.TogglePopup()
      }
    },
    async delFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://localhost:3001/favouritesDel`, object);
      await axios.post(`http://localhost:3001/favouritesProductoDel`, object);
      location.reload()

    },
    async actualizar() {
      let objeto = {
        condicion: this.estado,
        price: this.estadoPrecio,
        categoria: this.estadoCategory,
        ordenar: this.estadoOrdenar,
      };
      await axios
        .get(`http://localhost:3001/api/${this.$route.params.id}`, {
          params: { objeto },
        })
        .then((res) => {
          const { data } = res;
          const cookie = this.$cookies.get("loginCookie");
          data.map((i) => {
            if (i.favoritos) {
              i.favoritos
                .split(",")
                .map((i) => parseInt(i))
                .includes(cookie.id_cliente)
                ? (i.favoritos = true)
                : (i.favoritos = false);
            } else {
              i.favoritos = false;
            }
          });
          this.items = data;
        });
    },
  },
  async mounted() {
    await axios
      .get(`http://localhost:3001/api/${this.$route.params.id}`)
      .then((res) => {
        const { data } = res;
        data.pop();
        const cookie = this.$cookies.get("loginCookie");
        data.map((i) => {
          if (i.favoritos && cookie) {
            i.favoritos
              .split(",")
              .map((i) => parseInt(i))
              .includes(cookie.id_cliente)
              ? (i.favoritos = true)
              : (i.favoritos = false);
          } else {
            i.favoritos = false;
          }
        });
        this.items = data;
      });
  },
  watch: {
    estado() {
      this.actualizar();
    },
    estadoPrecio() {
      this.actualizar();
    },
    estadoCategory() {
      this.actualizar();
    },
    estadoOrdenar() {
      this.actualizar();
    },
  },
};
</script>

<style lang="sass">
@import "../../style/style"
</style>
