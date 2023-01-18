<template>
  <HeaderVue/>
  
  <div class="contentProductos">
    <FiltrosVue/>
    <ProductosVue />
  </div>
</template>

<script>
import FiltrosVue from './components/FiltrosVue.vue'
import HeaderVue from './components/HeaderVue.vue'
import ProductosVue from './components/ProductosVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    FiltrosVue,
    ProductosVue
  }
}
</script>

<style lang="sass">
@import "../style/style.sass"
</style>
