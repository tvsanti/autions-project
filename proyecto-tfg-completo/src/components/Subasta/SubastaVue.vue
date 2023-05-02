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
          Tiempo restante: {{ getTimeRemaining().days }}:{{ getTimeRemaining().hours }}:{{ getTimeRemaining().minutes }}:{{ getTimeRemaining().seconds }}
        </h4>
      </div>
      <div class="pujar">
        <h2>Puja actual: {{ userPuja }} <b>{{ prouctContent.price }}€</b></h2>
        <div>
          <input type="text" placeholder="Importe de puja" />
          <button @click="pujar">Pujar</button>
        </div>
      </div>
    </div>
  </div>
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
      userPuja: '',
      startDate: new Date()
    };
  },
  methods: {
    async pujar() {
      const importe = document.querySelector('input[type="text"]').value;
      const data = {
        importe: importe,
        user: this.$cookies.get('loginCookie').nombre,
        id_cliente: this.$cookies.get('loginCookie').id_cliente
      };
      this.socket.emit("puja", data);
      
      await axios
        .post(`http://localhost:3001/subasta/${this.$route.params.id}/${this.$route.params.categoria}/${this.$route.params.titulo}`, {price: importe});
    },
    getTimeRemaining() {
      const total = Date.parse(this.prouctContent.time_left) - Date.parse(this.startDate);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      return { days, hours, minutes, seconds };
    }
  },
  created() {
    setInterval(() => {
      this.startDate = new Date();
    }, 1000);
  },
  async mounted() {
    this.socket = io("http://localhost:3001");
    this.socket.on("puja", (data) => {
      this.prouctContent.price = data.importe
      this.userPuja = data.user
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
