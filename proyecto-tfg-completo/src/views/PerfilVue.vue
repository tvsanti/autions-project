<template>
  <PerfilPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()" />

  <HeaderVue />
  <div class="pefilMain">
    <div class="userInfo">
      <div class="infoPerfil">
        <img class="roundedProfile" :src="fotoPerfil" alt="" />
        <div class="textPerfil">
          <pre>{{ nombre }}</pre>
          <span
            ><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half"></i> 0 valoraciones</span
          >
        </div>
      </div>
      <button @click="TogglePopup()">Editar perfil</button>
    </div>
    <hr />
    <h1>Tus Productos</h1>
    <div class="perfilVue">
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
          <div class="iconsPerfil">
            <i @click="deleteSubasta(item.id_producto)" class="fa-solid fa-trash"></i>
            <div v-if="showPopup" class="popup">
              <div class="popupOtions">
                <p>¿Estás seguro de que deseas eliminar esta subasta?</p>
                <div class="optionPopup">
                  <button @click="delSubasta(item.id_producto)">Sí</button>
                  <button @click="showPopup = false">No</button>
                </div>
              </div>
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
  </div>
</template>

<script>
import axios from "axios";
import PerfilPopup from "@/components/PerfilPopup.vue";
import HeaderVue from "@/components/HeaderVue.vue";
export default {
  name: "PerfilVue",
  components: {
    HeaderVue,
    PerfilPopup,
  },
  data() {
    return {
      isActive: true,
      items: [],
      fotoPerfil: "",
      nombre: "",
      buttonTrigger: false,
      showPopup: false,
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger;
    },
    async addFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://localhost:3001/favourites`, object);
      await axios.post(`http://localhost:3001/favouritesProducto`, object);
      location.reload()

    },
    async delSubasta(id_producto) {
      await axios.post(`http://localhost:3001/delSubasta`, { id_producto });
      this.showPopup = false;
      location.reload()

    },
    deleteSubasta() {
      this.showPopup = true;
    },
    async delFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://localhost:3001/favouritesDel`, object);
      await axios.post(`http://localhost:3001/favouritesProductoDel`, object);
    },
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie");
    await axios
      .get(`http://localhost:3001/perfilLocal/${cookie.id_cliente}`)
      .then((res) => {
        const  [data]  = res.data;
        this.items = data[1];
        this.fotoPerfil = data[0][0].imgPerfil;
        this.nombre = data[0][0].nombre;
      });
  },
};
</script>

<style lang="sass">
.roundedProfile
  border-radius: 100%
  width: 200px
  height: 200px
</style>