<template>
    <div class="error-page">
      <h1>¡Error 404!</h1>
      <p>Lo sentimos, la página que estás buscando no se encontró.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Error404Vue'
  }
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  .error-page h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  .error-page p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .error-page router-link {
    font-size: 2rem;
    color: #0077ff;
  }
  </style>
  