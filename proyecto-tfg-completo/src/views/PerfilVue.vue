<template>
  <PerfilPopup v-if="buttonTrigger" :TogglePopup="() => TogglePopup()" />

  <HeaderVue />
  <div class="pefilMain">
    <div class="userInfo">
      <div class="infoPerfil">
        <img
          class="roundedProfile"
          :src="fotoPerfil"
          alt=""
        />
        <div class="textPerfil">
          <pre>{{nombre}}</pre>
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
          <i @click="getApiData()" class="fa-regular fa-heart"></i>
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
    PerfilPopup
  },
  data() {
    return {
      isActive: true,
      items: [],
      fotoPerfil: '',
      nombre: '',
      buttonTrigger: false
    };
  },
  methods: {
    TogglePopup() {
      this.buttonTrigger = !this.buttonTrigger
    },
  },
  async mounted() {
    const cookie = this.$cookies.get("loginCookie");
    await axios
      .get(`http://localhost:3001/perfil/${cookie.id_cliente}`)
      .then((res) => {
        const { data } = res;
        this.items = data;
        this.fotoPerfil = data[0].imgPerfil
        this.nombre= data[0].nombre
      });
      console.log(this.items);
    },
};
</script>

<style lang="sass">
.roundedProfile
  border-radius: 100%
  width: 200px
  height: 200px
</style>