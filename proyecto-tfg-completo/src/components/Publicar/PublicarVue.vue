<template>
  <div class="mainPublicar">
    <form enctype="multipart/form-data" @submit.prevent="createPost">
      <h1>Publicar producto</h1>
      <label id="label1" for="">Categoria</label>
      <select required v-model="formulario.categoria" id="">
        <option
          v-for="item in $store.state.itemsCompleta"
          :key="item"
          v-bind="item"
        >
          {{ item.titulo }}
        </option>
      </select>
      <label for="">Titulo</label>
      <input
        type="text"
        v-model="formulario.titulo"
        placeholder="Que quieres subastar?"
      />
      <label for="">Descripcion</label>
      <textarea v-model="formulario.descripcion" placeholder="Descripcion" />
      <label for="">Estado del producto</label>
      <select v-model="formulario.estado" id="">
        <option
          v-for="estado in $store.state.estado"
          :key="estado"
          v-bind="estado"
        >
          {{ estado.estado }}
        </option>
      </select>

      <label for="">Fin de la subasta</label>
      <input v-model="formulario.time_left" type="datetime-local" />

      <label for="">Precio</label>
      <input v-model="formulario.precio" type="number" />
      <div id="arrastrarImagen" @dragover="onDragOver" @drop="onDrop">
        <label for="imagen">
          <h3>Arrastrar fotos</h3>
          <h3>- o -</h3>
          <h3>Seleccionar fotos</h3>
        </label>
        <input id="inputFile" ref="files" type="file" multiple @change="onFileChange" draggable="true" />
      </div>
      <span
        >Fotos seleccionadas: <b>{{ numeroFotos }}</b></span
      >
      <input
        v-if="numeroFotos <= 4"
        id="inputEnviar"
        type="submit"
        value="Publicar"
      />
      <span v-else>Debes agregar maximo 4 fotos</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      numeroFotos: 0,
      formulario: {
        categoria: "",
        titulo: "",
        time_left: "",
        descripcion: "",
        estado: "",
        precio: "",
      },
      files: [],
    };
  },
  methods: {
    async createPost() {
      const productos = new FormData();
      this.files.forEach((file) => {
        productos.append("files", file);
      });

      await axios.post('http://167.99.240.123:81/api/localimages/productos', productos);
      
      let cookie = this.$cookies.get('loginCookie')
      this.formulario.created_by = cookie.id_cliente
      let objeto = JSON.parse(JSON.stringify(this.formulario));
      await axios.post("http://167.99.240.123:81/api", objeto)
      window.location.href = 'http://167.99.240.123:80/'


    },
    onFileChange(event) {
      const files = this.$refs.files.files;
      this.files = [...this.files, ...files];
      let imagenes = event.target.files;
      this.numeroFotos = imagenes.length;
    },
    onDragOver(event) {
      event.preventDefault();
    },

    onDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.files = [...this.files, ...files];
      this.numeroFotos = this.files.length;
    },
  },
};
</script>

<style lang="sass">
@import ../../../style/publicar
</style>



