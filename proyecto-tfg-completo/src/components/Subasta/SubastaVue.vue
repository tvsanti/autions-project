<template>
  <div class="subastaVue">
    <div class="imgs">
      <div class="select-img">
        <img
          v-for="(img, index) in arrayImg"
          @click="arraySeleccionada = index"
          :src="img"
          :key="img"
        />
      </div>
      <img id="big-img" :src="arrayImg[arraySeleccionada]" alt="" />
    </div>
    <div class="menuSubasta">
      <div class="valoracionUser">
        <div class="perfilUser">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div class="infoUser">
            <h3>Santiago Thevenet</h3>
            <h4>4 productos</h4>
          </div>
        </div>
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="descripcion">
        <h1>{{ prouctContent.title }}</h1>
        <p>
          <b>Descripcion:</b> <br />
          {{ prouctContent.description }}
        </p>
        <p>
          <b>Informe de estado</b> <br />
          {{ prouctContent.condition }}
        </p>
        <h4>
          Tiempo restante: <b>{{ prouctContent.time_left }}</b>
        </h4>
      </div>
      <div class="pujar">
        <h2>Puja actual: <b>{{ prouctContent.price }}€</b></h2>
        <div>
          <input type="text" placeholder="Importe de puja" />
          <button @click="pujar">Pujar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="masProductos">
    <h1>Ver más productos</h1>
    <div class="masProductos2">
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris</p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/8385/046/400/8385046400_1_1_3.jpg?t=1647616865404"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris</p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris</p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/9365/046/712/9365046712_1_1_3.jpg?t=1663171365923"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris</p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris</p>
      </div>
    </div>
  </div> -->
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  data() {
    return {
      arrayImg: [],
      arraySeleccionada: 0,
      prouctContent: [],
      socket: null,
    };
  },
  methods: {
    pujar() {
      const importe = document.querySelector('input[type="text"]').value;
      const data = {
        importe: importe,
        user: this.$cookies.get('loginCookie').nombre,
        id_cliente: this.$cookies.get('loginCookie').id_cliente
      };
      this.socket.emit("puja", data);
    },
  },
  async mounted() {
    this.socket = io("http://localhost:3001");
    this.socket.on("puja", (data) => {
      console.log(data); // se reciben los datos de la puja realizada
      this.prouctContent.price = data.importe
      // actualizar la puja actual en el frontend con los datos recibidos
    });
    await axios
      .get(
        `http://localhost:3001/subasta/${this.$route.params.id}/${this.$route.params.categoria}/${this.$route.params.titulo}`
      )
      .then((res) => {
        const { data } = res;
        this.prouctContent = data[0];
      });
    await axios
      .get(`http://localhost:3001/subasta/${this.$route.params.id}`)
      .then((res) => {
        const { data } = res;
        this.arrayImg = data;
      });
  },
};
</script>

<style></style>
