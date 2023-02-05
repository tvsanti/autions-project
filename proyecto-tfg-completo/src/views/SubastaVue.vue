<template>
    <div>
      <HeaderVue />
      <SubastaVue />
    </div>
  </template>
  
<script>
  import HeaderVue from "../components/HeaderVue.vue";
  import SubastaVue from "../components/Subasta/SubastaVue";
  
  export default {
    name: "App",
    components: {
      HeaderVue,
      SubastaVue,
    },
  };
</script>
  
  <style lang="sass">
  @import "./style/style.sass"
  </style>
  