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
        <span v-if="mensajeLogin">La contraseña o el correo es incorrecto</span>
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
        <span v-if="passwordNoValida"
          >La contraseña debe tener al menos un dígito, una letra minúscula, una letra
          mayúscula y una longitud mínima de 8 caracteres</span
        >
        <div>
          <input required type="checkbox" name="" id="" />Acepto las condiciones
          de uso y la información básica sobre protección de datos.
        </div>
        <input id="submitIS" type="submit" value="Registrarse" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["TogglePopup"],
  data() {
    return {
      registerToggle: "loggin",
      passwordNoValida: false,
      formularioLogin: {
        mail: "",
        password: "",
      },
      formularioRegister: {
        nombre: "",
        mail: "",
        password: "",
      },
      mensajeLogin: false,
      cookie: "",
    };
  },
  methods: {
    setLoggin() {
      this.registerToggle = "loggin";
    },
    setRegister() {
      this.registerToggle = "register";
    },
    validatePassowrd(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    },
    async registerPost() {
      if (this.validatePassowrd(this.formularioRegister.password)) {
        await axios.post("http://localhost:3001/register",this.formularioRegister).then(res => {
          if (res) {
            window.location.reload()
          }
        })
        } else {
        this.passwordNoValida = true;
      }
    },
    async loginPost() {
      await axios
        .post("http://localhost:3001/login", this.formularioLogin)
        .then((res) =>  {
          this.cookie = res.data
        });
      this.$cookies.remove("loginCookie");
      
      if (this.cookie) {
        this.$cookies.set("loginCookie", this.cookie);
        this.TogglePopup();
        this.$forceUpdate();
      }else{
        this.mensajeLogin = true
      }
    },
  },
};
</script>

<style></style>
