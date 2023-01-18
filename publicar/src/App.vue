
import PublicarVue from './components/PublicarVue.vue';

<template>
  <HeaderVue/>
  <PublicarVue />
  <mapa-vue />
</template>

<script>
import HeaderVue from './components/HeaderVue.vue'
import MapaVue from './components/MapaVue.vue'
import PublicarVue from './components/PublicarVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    PublicarVue,
    MapaVue,
  }
}
</script>

<style lang="sass">
@import "./style/style.sass"
</style>
