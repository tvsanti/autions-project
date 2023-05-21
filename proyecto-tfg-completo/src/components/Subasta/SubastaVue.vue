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
          <img :src="datosUsuario.imgPerfil" alt="" />
          <div class="infoUser">
            <h3>{{ datosUsuario.nombre }}</h3>
            <h4>4 productos</h4>
          </div>
        </div>
        <i
          v-if="prouctContent.favoritos && $cookies.get('loginCookie')"
          @click="
            delFavourites(prouctContent.id_producto, prouctContent.created_by)
          "
          class="fa-solid fa-heart"
        ></i>
        <i
          v-else
          @click="
            addFavourites(prouctContent.id_producto, prouctContent.created_by)
          "
          class="fa-regular fa-heart"
        ></i>
      </div>
      <div class="descripcion">
        <h1>{{ prouctContent.title }}</h1>
        <p>
          <b>Descripcion:</b> <br />
          {{ prouctContent.description }}
        </p>
        <p>
          <b>Informe de estado</b> <br />
          {{ prouctContent.condicion }}
        </p>
        <h4>
          <i class="fa-solid fa-clock-rotate-left"></i> {{ getTimeRemaining().days }}:{{
            getTimeRemaining().hours
          }}:{{ getTimeRemaining().minutes }}:{{ getTimeRemaining().seconds }}
        </h4>
      </div>
      <div class="pujar">
        <div>
          <h2>
            <i class="fa-solid fa-dollar-sign"></i> Puja actual: {{ userPuja }} <b>{{ prouctContent.price }}€</b>
          </h2>
          <div>
            <span>PUJAR</span>
            <input @keyup.enter="pujar" type="number" placeholder="Importe de puja" />
          </div>
        </div>
        <span v-if="mensajeError">No tienes suficiente dinero</span>
        <span v-else-if="mensajeErrorMenor">La puja debe ser mayor al precio del producto</span>
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
      userPuja: "",
      startDate: new Date(),
      datosUsuario: [],
      mensajeError: false,
      mensajeErrorMenor: false
    };
  },
  methods: {
    async pujar() {
      const importe = document.querySelector('input[type="number"]').value;
      const cookie = this.$cookies.get("loginCookie");

      const data = {
        importe: importe,
        user: cookie.nombre,
        id_cliente: cookie.id_cliente,
      };

      await axios
        .get(`http://167.99.240.123:81/api/miDinero/${cookie.id_cliente}`)
        .then(async (res) => {
          console.log(res.data.saldo.saldo < parseInt(importe));
          console.log(importe);
          console.log(this.prouctContent.price);
          if (res.data.saldo.saldo < parseInt(importe)) {
            this.mensajeError = true
          }else if (importe < this.prouctContent.price ){
            this.mensajeErrorMenor = true
          }else {
            this.socket.emit("puja", data);
            await axios
            .post(
              `http://167.99.240.123:81/api/subasta/${this.$route.params.id}/${this.$route.params.categoria}/${this.$route.params.titulo}`,
              { price: importe, ultimoPujador: cookie.id_cliente }
              )
              .then((res) => {
                console.log(res.data);
              });
          }
        });
    },
    getTimeRemaining() {
      const total =
        Date.parse(this.prouctContent.time_left) - Date.parse(this.startDate);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      return { days, hours, minutes, seconds };
    },
    async addFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      await axios.post(`http://167.99.240.123:81/api/favourites`, object);
      await axios.post(`http://167.99.240.123:81/api/favouritesProducto`, object);
    },
    async delFavourites(id_producto, created_by) {
      const object = {
        id_producto,
        created_by,
      };
      object["cookie"] = this.$cookies.get("loginCookie").id_cliente;
      console.log(object);
      await axios.post(`http://167.99.240.123:81/api/favouritesDel`, object);
      await axios.post(`http://167.99.240.123:81/api/favouritesProductoDel`, object);
    },
  },
  created() {
    setInterval(() => {
      this.startDate = new Date();
    }, 1000);
  },
  async mounted() {
    this.socket = io("http://167.99.240.123:81");
    this.socket.on("puja", (data) => {
      this.prouctContent.price = data.importe;
      this.userPuja = data.user;
    });
    await axios
      .get(
        `http://167.99.240.123:81/api/subasta/${this.$route.params.id}/${this.$route.params.categoria}/${this.$route.params.titulo}`
      )
      .then((res) => {
        const { data } = res;

        this.prouctContent = data[0];
      });
    
    console.log(this.$route.params.id);
    await axios
      .get(`http://167.99.240.123:81/api/subasta/${this.$route.params.id}`)
      .then((res) => {
        console.log(this.$route.params.id);
        const { data } = res;
        this.arrayImg = data;
      });

    await axios
      .get(`http://167.99.240.123:81/api/perfil/${this.$route.params.id}`)
      .then((res) => {
        const { data } = res;
        this.datosUsuario = data[0];
      });
  },
};
</script>

<style></style>
