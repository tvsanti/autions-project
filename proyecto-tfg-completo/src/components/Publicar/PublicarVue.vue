<template>
  <div class="mainPublicar">
    <form action="">
      <h1>Publicar producto</h1>
      <label id="label1" for="">Categoria</label>
      <select name="" id="">
        <option value="">Cosas</option>
        <option value="">Cosas</option>
        <option value="">Cosas</option>
      </select>
      <label for="">Titulo</label>
      <input type="text" placeholder="Que quieres subastar?" />
      <label for="">Descripcion</label>
      <textarea placeholder="Descripcion" />
      <label for="">Estado del producto</label>
      <select name="" id="">
        <option value="">Cosas</option>
        <option value="">Cosas</option>
        <option value="">Cosas</option>
      </select>
      <label for="">Precio</label>
      <input type="number" />
      <div id="arrastrarImagen">
        <label for="inputFile">
          <h3>Arrastrar fotos</h3>
          <h3>- o -</h3>
          <h3>Seleccionar fotos</h3>
        </label>
        <input id="inputFile" type="file" multiple @change="previewFiles" />
      </div>
      <span>Fotos seleccionadas: <b>{{ numeroFotos }}</b></span>
      <input id="inputEnviar" type="submit" value="Publicar" />
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            numeroFotos: 0
        }
    },
    methods: {
    previewFiles(event) {
        const files = event.target.files
        this.numeroFotos = files.length
    },
  },
};
</script>

<style lang="sass">
@import ../../../style/publicar
</style>
