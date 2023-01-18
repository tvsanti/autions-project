<template>
  <HeaderVue />
  <SubastaVue />
</template>

<script>
import HeaderVue from './components/HeaderVue.vue'
import SubastaVue from './components/SubastaVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    SubastaVue
    
  }
}
</script>

<style lang="sass">
@import "../style/style.sass";
</style>
