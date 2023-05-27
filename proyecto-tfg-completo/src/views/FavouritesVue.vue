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
          <img :src="item.img"  />
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
      await axios.post(`http://167.99.240.123:81/api/favourites`, object);
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://167.99.240.123:81/api/favouritesProducto`, object);
      location.reload()

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
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie");
    await axios
      .get(`http://167.99.240.123:81/api/favourites/${cookie.id_cliente}`)
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
.mainFavorito
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  h1
    font-size: 3rem
  .favoritosVue
    width: 100%
    display: grid
    grid-template-columns: repeat(4, 1fr)
    align-items: center
    @media only screen and (max-width: 1250px)
      grid-template-columns: repeat(3, 1fr)
    @media only screen and (max-width: 900px)
      grid-template-columns: repeat(2, 1fr)
    @media only screen and (max-width: 480px)
      grid-template-columns: repeat(1, 1fr)
    .perfilCard
      display: flex
      flex-direction: column
      margin: 2rem 2rem
      .perfilDescripcion
        display: flex
        justify-content: space-between
        align-items: center
        i
          font-size: 2rem
          color: #bb1e26
      a
        text-decoration: none
        color: black
        img
          cursor: pointer
          border-radius: 1rem
          width: 100%
          height: 300px

</style>