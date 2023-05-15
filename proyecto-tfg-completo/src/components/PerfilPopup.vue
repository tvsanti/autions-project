<template>
  <div class="popup">
    <div class="popup2">
      <a class="popup-close" @click="TogglePopup()"
        ><i class="fa-solid fa-x"></i
      ></a>
      <h1>Editar Perfil</h1>
      <form class="inicio-sesion" @submit.prevent="createPost">
        <label>Foto de Perfil</label>
        <input type="file" ref="file" @change="onFileChange" />
        <label>Nombre de usuario</label>
        <input v-model="formularioEditar.user" type="text" />
        <input id="submitIS" type="submit" value="Publicar" />
      </form>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  props: ["TogglePopup"],
  data() {
    return {
      formularioEditar: {
        user: "",
      },
      cookie: "",
      file: null,
    };
  },
  methods: {
    async createPost() {
      if (this.file != null) {
        const perfilImg = new FormData();
        perfilImg.append("file", this.file);
  
        await axios.post("http://167.99.240.123:81/api/localimages/perfil",perfilImg);
      }
      if (this.formularioEditar.user != "") {
        console.log(this.formularioEditar.user);
        await axios.post("http://167.99.240.123:81/api/editarPerfil", this.formularioEditar)
      }
      window.location.reload()
    },
    onFileChange() {
      this.file = this.$refs.file.files[0]
      console.log(this.file);
    },
  },
};
</script>
  
  <style></style>
  