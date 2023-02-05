<template>
  <div class="subastaVue">
    <div class="imgs">
      <div class="select-img">
        <img v-for="(img, index) in arrayImg" @click="arraySeleccionada = index" :src="img" :key="img"/>
      </div>
      <img id="big-img" :src="arrayImg[arraySeleccionada]" alt=""/>
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
        <h1>Jarron gris moderno</h1>
        <p>
          <b>Descripcion:</b> <br />Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Repellendus qui tenetur magni ad laboriosam
          reiciendis, at non mollitia saepe adipisci. Molestiae quam natus fuga
          distinctio quod, harum totam voluptates fugit.
        </p>
        <p>
          <b>Informe de estado</b> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <h4>Tiempo restante: <b>12h 23min</b></h4>
      </div>
      <div class="pujar">
        <h2>Puja actual: <b>500€</b></h2>
        <div>
          <input type="text" placeholder="Importe de puja" />
          <button>Pujar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="masProductos">
    <h1>Ver más productos</h1>
    <div class="masProductos2">
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris </p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/8385/046/400/8385046400_1_1_3.jpg?t=1647616865404"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris </p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris </p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/9365/046/712/9365046712_1_1_3.jpg?t=1663171365923"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris </p>
      </div>
      <div>
        <img
          src="https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995"
          alt=""
        />
        <h2>Titulo</h2>
        <h3>305€</h3>
        <p>Descripcion de producto jarron moderno fondo gris </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayImg: [
        'https://static.zarahome.net/8/photos4/2022/I/4/1/p/2383/046/400/2383046400_1_1_3.jpg?t=1669111568995',
        'https://static.zarahome.net/8/photos4/2022/I/4/1/p/8385/046/400/8385046400_1_1_3.jpg?t=1647616865404',
        'https://static.zarahome.net/8/photos4/2022/I/4/1/p/9365/046/712/9365046712_1_1_3.jpg?t=1663171365923',
        'https://static.zarahome.net/8/photos4/2022/I/4/1/p/8838/046/450/8838046450_1_1_3.jpg?t=1651476681556'
      ],
      arraySeleccionada: 0
    }
  }
};
</script>

<style></style>
