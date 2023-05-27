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
            <img :src="item.img"  />
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
      await axios.post(`http://167.99.240.123:81/api/favourites`, object);
      await axios.post(`http://167.99.240.123:81/api/favouritesProducto`, object);
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
      await axios.post(`http://167.99.240.123:81/api/favouritesDel`, object);
      await axios.post(`http://167.99.240.123:81/api/favouritesProductoDel`, object);
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
        .get(`http://167.99.240.123:81/api/${this.$route.params.id}`, {
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
      .get(`http://167.99.240.123:81/api/${this.$route.params.id}`)
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
.contentProductos
  display: flex
  flex-direction: row
  .filtrosVue
    background: white
    height: 100%
    @media only screen and (max-width: 1400px)
    .flechaFiltro
      display: flex
      align-items: center
      .esconder
        font-size: 2rem
        

    .ul1
      flex-direction: row
      padding: 0
      width: 100%
      margin-top: .9rem
      align-items: center
      gap: 1rem
      div
        background: #bb1e26

        .filtroLi
          display: flex
          flex-direction: column
          .filtro2
            width: 100% !important
            display: flex
            justify-content: space-between
            button
              width: max-content
            .flechaIcono
              margin-left: 6rem !important
              margin-right: 1rem !important
          
            input
              width: 50% !important
            #precioFiltro
              width: 50%
            #inputPrecio
              width: 50%
              height: 2rem
              padding-left: 8px
              border-radius: 5px
              border: none

          .mostarLi2,.mostarLi4,.mostarLi3
            display: flex !important
            margin: 0 1rem
            flex-direction: column
          
            #button-locationFiltros
              background-color: white
              color: black
              margin: 0
              font-size: 1rem
              padding: .5rem 1.5rem
              border: 1px solid
              i
                color: #bb1e26
                font-size: 1.5rem

            select
              width: 100%
              border: 1px solid var(--select-border)
              border-radius: 0.25em
              padding: 0.25em 0.5em
              font-size: 1.25rem
              cursor: pointer
              background-color: #fff
              background-image: linear-gradient(to top, #f9f9f9, #fff 33%)

          .mostrarLi
            display: none
          .filtro2
            display: flex
            width: 90%
            justify-content: space-between
            align-items: center
          .flechaIcono
            font-size: 1.3rem
            color: white
            cursor: pointer
            transition: .1s

          .flechaIconoAnimacion1
            transform: rotate(-90deg)
          .flechaIconoAnimacion2
            transform: rotate(-90deg)
          .flechaIconoAnimacion3
            transform: rotate(-90deg)
          .flechaIconoAnimacion4
            transform: rotate(-90deg)

          button
            margin: 2rem 0
            @include buttonStyle()
            padding: 5px 1rem
            font-weight: 500
            color: white
            display: flex
            align-items: center
            i
              margin-right: .8rem
              font-size: 1.3rem
    .ul2
      width: 100%
      display: flex
      flex-direction: column
      align-items: flex-start
      button
        margin: 2rem 0
        @include buttonStyle()
        padding: 5px 1rem
        font-weight: 500
  .productosVue
    .productoVue
      display: grid
      grid-template-columns: repeat(4, 1fr)
      align-items: center
      @media only screen and (max-width: 1250px)
        grid-template-columns: repeat(3, 1fr)
      @media only screen and (max-width: 900px)
        grid-template-columns: repeat(2, 1fr)
      @media only screen and (max-width: 480px)
        grid-template-columns: repeat(1, 1fr)

      .productoVfor
        display: flex
        flex-direction: column
        margin: 2rem 2rem
        a
          text-decoration: none
          color: black
          img
            cursor: pointer
            border-radius: 1rem
            width: 100%
            height: 300px
            object-fit: cover

        .productoDescripcion
          display: flex
          justify-content: space-between
          flex-direction: row
          div
            margin-top: 1rem
            #productoPrecio
              font-weight: 600
              margin: .5rem 0
          i
            cursor: pointer
            font-size: 1.4rem
            margin: .5rem 0
            margin-top: 1rem
            color: #bb1e26

</style>
