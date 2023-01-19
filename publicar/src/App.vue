
import PublicarVue from './components/PublicarVue.vue';

<template>
  <HeaderVue/>
  <PublicarVue />
</template>

<script>
import HeaderVue from './components/HeaderVue.vue'
import PublicarVue from './components/PublicarVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    PublicarVue,
  }
}
</script>

<style lang="sass">
@import "./style/style.sass"
</style>
