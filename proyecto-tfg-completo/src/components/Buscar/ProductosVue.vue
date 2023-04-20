<template>
  <div class="productosVue">
    <div class="productoVue">
      <div class="productoVfor" v-for="item in items" :key="item">
        <router-link :to="{name: 'Subasta', params: { id: item.id_producto, categoria: item.categoria, titulo: item.title },}">
          <img :src=item.img alt="" />
        </router-link>
          <div class="productoDescripcion">
            <div>
              <span>{{ item.title }}</span>
              <h4 id="productoPrecio">{{ item.price }}</h4>
            </div>
            <i @click="getApiData()" class="fa-regular fa-heart"></i>
          </div>
      </div>
    </div>
  </div>
  <router-view />

</template>

<script>
import axios from 'axios';
export default {
  name: "ProductosVue",
  data() {
    return {
      isActive: true,
      items: [],
    };
  },
  async mounted() {
    await axios.get(`http://localhost:3001/api/${this.$route.params.id}`).then((res) => {
      const {data} = res
      this.items = data
    })
  }
 };
</script>

<style lang="sass"></style>
