<template>
  <div class="productosVue">
    <div class="productoVue">
      <div class="productoVfor" v-for="item in items" :key="item">
        <router-link :to="{name: 'Subasta', params: { id: item.titulo, },}">
          <img :src="item.urlImg" alt="" />
        </router-link>
          <div class="productoDescripcion">
            <div>
              <span>{{ item.titulo }}</span>
              <h4 id="productoPrecio">{{ item.precio }}</h4>
            </div>
            <i @click="getApiData()" class="fa-regular fa-heart"></i>
          </div>
      </div>
    </div>
  </div>
  <router-view />

</template>

<script>
export default {
  name: "ProductosVue",
  data() {
    return {
      isActive: true,
      items: [
        {
          urlImg:
            "https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995",
          precio: "30€",
          titulo: "Esto es un producto de prueba",
        },
        {
          urlImg:
            "https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995",
          precio: "25€",
          titulo: "Esto es un producto de prueba",
        },
        {
          urlImg:
            "https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995",
          precio: "25€",
          titulo: "Esto es un producto de prueba",
        },
        {
          urlImg:
            "https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995",
          precio: "25€",
          titulo: "Esto es un producto de prueba",
        }
      ],
    };
  },
};
</script>

<style lang="sass"></style>
