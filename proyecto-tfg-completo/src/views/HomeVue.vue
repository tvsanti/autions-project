<template>
  <HeaderVue />
  <main>
    <BuscadorVue />
    <CategoriasVue />
    <QueEsBaluVue />
  </main>
  <hr />
  <FooterVue />
</template>

<script>
import BuscadorVue from "../components/Home/BuscadorVue.vue";
import CategoriasVue from "../components/Home/CategoriasVue.vue";
import QueEsBaluVue from "../components/Home/QueEsBaluVue.vue";
import FooterVue from "../components/FooterVue.vue";
import HeaderVue from "@/components/HeaderVue.vue";

export default {
  name: "HomeVue",
  components: {
    BuscadorVue,
    CategoriasVue,
    QueEsBaluVue,
    FooterVue,
    HeaderVue
},
};
</script>

<style lang="sass">
@import "../../style/style"
</style>
