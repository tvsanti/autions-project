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
        action=""
        method="post"
      >
        <label>Email</label>
        <input type="text" />
        <label>Contraseña</label>
        <input type="password" />
        <a href="">¿Has olvidado la contraseña?</a>
        <input id="submitIS" type="submit" value="Iniciar sesión" />
      </form>
      <form
        v-else-if="registerToggle === 'register'"
        class="inicio-sesion"
        action=""
        method="post"
      >
        <label>Nombre</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>Contraseña</label>
        <input type="password" />
        <div>
          <input type="checkbox" name="" id="" />Acepto las condiciones de uso y
          la información básica sobre protección de datos.
        </div>
        <input id="submitIS" type="submit" value="Registrarse" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["TogglePopup"],
  data() {
    return {
      registerToggle: "loggin",
    };
  },
  methods: {
    setLoggin() {
      this.registerToggle = "loggin";
    },
    setRegister() {
      this.registerToggle = "register";
    },
  },
};
</script>

<style></style>
