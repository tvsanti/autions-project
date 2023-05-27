<template>
  <div class="mainPublicar">
    <form enctype="multipart/form-data" @submit.prevent="createPost">
      <h1>Publicar producto</h1>
      <label id="label1" >Categoria</label>
      <select required v-model="formulario.categoria" >
        <option
          v-for="item in $store.state.itemsCompleta"
          :key="item"
          v-bind="item"
        >
          {{ item.titulo }}
        </option>
      </select>
      <label >Titulo</label>
      <input
        type="text"
        v-model="formulario.titulo"
        placeholder="Que quieres subastar?"
      />
      <label >Descripcion</label>
      <textarea v-model="formulario.descripcion" placeholder="Descripcion" />
      <label >Estado del producto</label>
      <select v-model="formulario.estado" >
        <option
          v-for="estado in $store.state.estado"
          :key="estado"
          v-bind="estado"
        >
          {{ estado.estado }}
        </option>
      </select>

      <label >Fin de la subasta</label>
      <input v-model="formulario.time_left" type="datetime-local" />

      <label >Precio</label>
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
@import ../../../style/style

header
  @include displayFlex(row,space-around,center)
  width: 100% 

.mainPublicar
    width: 100%
    display: flex
    justify-content: center
    form
      margin-bottom: 4vh
      border: .5px solid gray
      padding: 1.5rem 3rem
      border-radius: 1rem
      display: flex
      flex-direction: column
      width: 35%
      @media only screen and (max-width: 1500px)
        width: 40%
      @media only screen and (max-width: 1250px)
        width: 45%
      @media only screen and (max-width: 900px)
        width: 65%
      @media only screen and (max-width: 480px)
        width: 80%
         
      h1
        text-align: center
        font-weight: 600
      select
        height: 2rem
      input,textarea,select
        padding-left: 8px
      input
          height: 2rem
          width: 100%
      textarea
        resize: vertical
        height: 25vh
        padding-top: 8px
      label
        margin-top: 2rem

      #inputEnviar
        border: none
        border-radius: 5px
        cursor: pointer
        margin-top: 2rem
        transition: .3s
        background: #bb1e26
        color: white
        width: 35%

        &:hover
          background: #861e23
      #label1
        margin-top: 1rem

      #arrastrarImagen
        opacity: 1
        border: 2px dashed grey
        display: flex
        justify-content: center
        position: relative
        align-items: center
        flex-direction: column 
        margin-top: 2rem
        #inputFile
          opacity: 0
          position: absolute
          height: 100%
          width: 100%
        label
          margin: 0
          width: 100%
          padding: 4rem 0
          text-align: center
      span
        margin-top: .7rem
        font-weight: 500

    #file
      width: 200px
      background:#bb1e26
      padding: 1rem
    
</style>



