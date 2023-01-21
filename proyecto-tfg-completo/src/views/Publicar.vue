<template>
  <div>
    <HeaderVue />
    <PublicarVue />
  </div>
</template>

<script>
import HeaderVue from "../components/HeaderVue.vue";
import PublicarVue from "../components/Publicar/PublicarVue";

export default {
  name: "App",
  components: {
    HeaderVue,
    PublicarVue,
  },
};
</script>

<style lang="sass">
@import "./style/style.sass"
</style>
