<template>
  <div class="popup">
    <div class="popup2">
      <a class="popup-close" @click="TogglePopup()"
        ><i class="fa-solid fa-x"></i
      ></a>
      <div class="inicio-registro">
        <button @click="setLoggin()" id="inicioSboton">Iniciar Sesion</button>
        <button @click="setRegister()">Registrarse</button>
      </div>
      <form
        v-if="registerToggle === 'loggin'"
        class="inicio-sesion"
        @submit.prevent="loginPost"
      >
        <label>Email</label>
        <input v-model="formularioLogin.mail" type="text" />
        <label>Contraseña</label>
        <input v-model="formularioLogin.password" type="password" />
        <a href="">¿Has olvidado la contraseña?</a>
        <input id="submitIS" type="submit" value="Iniciar sesión" />
      </form>
      <form
        v-else-if="registerToggle === 'register'"
        class="inicio-sesion"
        @submit.prevent="registerPost"
        method="post"
      >
        <label>Nombre</label>
        <input required v-model="formularioRegister.nombre" type="text" />
        <label>Email</label>
        <input required v-model="formularioRegister.mail" type="text" />
        <label>Contraseña</label>
        <input required v-model="formularioRegister.password" type="password" />
        <div>
          <input required type="checkbox" name="" id="" />Acepto las condiciones de uso y
          la información básica sobre protección de datos.
        </div>
        <input id="submitIS" type="submit" value="Registrarse" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ["TogglePopup"],
  data() {
    return {
      registerToggle: "loggin",
      formularioLogin: {
        mail: '',
        password: ''
      },
      formularioRegister: {
        nombre: '',
        mail: '',
        password: '',
      },
      cookie: ''
    };
  },
  methods: {
    setLoggin() {
      this.registerToggle = "loggin";
    },
    setRegister() {
      this.registerToggle = "register";
    },
    async registerPost() {
      await axios
        .post("http://localhost:3001/register", this.formularioRegister)
        .then((res) => console.log(res));
    },
    async loginPost() {
      await axios
        .post("http://localhost:3001/login", this.formularioLogin)
        .then((res) => this.cookie = res.data);
      
      if (this.cookie) {
        this.$cookies.set('loginCookie', this.cookie)
        this.TogglePopup()
        this.$forceUpdate()
      }
    }
  },
};
</script>

<style></style>
