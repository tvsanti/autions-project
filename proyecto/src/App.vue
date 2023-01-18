<template>
  <HeaderVue />
  <hr />
  <main>
    <BuscadorVue />
    <CategoriasVue />
    <QueEsBaluVue />
  </main>
  <hr />
  <FooterVue />
</template>

<script>
import BuscadorVue from "./components/BuscadorVue.vue";
import CategoriasVue from "./components/CategoriasVue.vue";
import FooterVue from "./components/FooterVue.vue";
import HeaderVue from "./components/HeaderVue.vue";
import QueEsBaluVue from "./components/QueEsBaluVue.vue";

export default {
  name: "App",
  components: {
    HeaderVue,
    BuscadorVue,
    CategoriasVue,
    QueEsBaluVue,
    FooterVue,
  },
};
</script>

<style lang="sass">
@import "../style/style.sass"
</style>
