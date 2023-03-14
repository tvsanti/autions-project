<template>
  <div class="mainPublicar">
    <form @submit.prevent="createPost">
      <h1>Publicar producto</h1>
      <label id="label1" for="">Categoria</label>
      <select v-model="formulario.categoria" id="">
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
      <label for="">Precio</label>
      <input v-model="formulario.precio" type="number" />
      <div id="arrastrarImagen">
        <label for="inputFile">
          <h3>Arrastrar fotos</h3>
          <h3>- o -</h3>
          <h3>Seleccionar fotos</h3>
        </label>
        <input id="inputFile" type="file" multiple @change="previewFiles" />
      </div>
      <span
        >Fotos seleccionadas: <b>{{ numeroFotos }}</b></span
      >
      <input id="inputEnviar" type="submit" value="Publicar" />
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
        descripcion: "",
        estado: "",
        precio: "",
      },
    };
  },
  methods: {
    previewFiles(event) {
      const files = event.target.files;
      this.numeroFotos = files.length;
    },
    async createPost() {
      await axios
        .post("http://localhost:3001/api", this.formulario)
        .then((res) => console.log(res));
    },
  },
};
</script>

<style lang="sass">
@import ../../../style/publicar
</style>
