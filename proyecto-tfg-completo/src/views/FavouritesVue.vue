<template>
  <HeaderVue />
  <div class="mainFavorito">
    <h1>Favoritos</h1>
    <div class="favoritosVue">
      <div class="perfilCard" v-for="item in items" :key="item">
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
        <div class="perfilDescripcion">
          <div>
            <span>{{ item.title }}</span>
            <h4 id="perfilPrecio">{{ item.price }}</h4>
          </div>
          <i
            v-if="item.isFavourtie"
            @click="getApiData()"
            class="fa-solid fa-heart"
          ></i>
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
</template>
  
  <script>
import axios from "axios";
import HeaderVue from "@/components/HeaderVue.vue";
export default {
  name: "FavoritosVue",
  components: {
    HeaderVue,
  },
  data() {
    return {
      isActive: true,
      items: [],
      fotoPerfil: "",
      nombre: "",
      buttonTrigger: false,
    };
  },
  methods: {
    async addFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      await axios.post(`http://localhost:3001/favourites`, object);
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://localhost:3001/favouritesProducto`, object);
      location.reload()

    },
    async delFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      console.log(object);
      await axios.post(`http://localhost:3001/favouritesDel`, object);
      await axios.post(`http://localhost:3001/favouritesProductoDel`, object);
      location.reload()

    },
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie");
    await axios
      .get(`http://localhost:3001/favourites/${cookie.id_cliente}`)
      .then((res) => {
        const { data } = res;
        const cookie = this.$cookies.get("loginCookie");
        data.map((i, index) => {
          if (i?.favoritos && cookie) {
            i.favoritos
              .split(",")
              .map((i) => parseInt(i))
              .includes(cookie.id_cliente)
              ? (i.favoritos = true)
              : (i.favoritos = false);
          } else {
            if (i != null) {
              i.favoritos = false;
            }else {
              console.log(index);
              data.splice(index,index+1)
            }
          }
        });
        this.items = data;
      });
  },
};
</script>

<style lang="sass">
img
  width: 200px
</style>