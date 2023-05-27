<template>
  <HeaderVue />
  <main>
    <BuscadorVue />
    <CategoriasVue />
    <QueEsBaluVue />
  </main>
  <hr />
  <FooterVue />
</template>

<script>
import BuscadorVue from "../components/Home/BuscadorVue.vue";
import CategoriasVue from "../components/Home/CategoriasVue.vue";
import QueEsBaluVue from "../components/Home/QueEsBaluVue.vue";
import FooterVue from "../components/FooterVue.vue";
import HeaderVue from "@/components/HeaderVue.vue";

export default {
  name: "HomeVue",
  components: {
    BuscadorVue,
    CategoriasVue,
    QueEsBaluVue,
    FooterVue,
    HeaderVue
},
};
</script>

<style lang="sass">
@import "../../style/style"
main
  width: 100%
  @include displayFlex(column,center,center)
  .buscadorVue
    width: 90%
    border-radius: 5px
    margin: 2rem 0
    background-image: url('/img/landpage.jpg')
    background-position: center
    background-size: cover
    @include displayFlex(column,space-center,start)
    padding: 3rem
    padding-bottom: 10rem
    gap: 2rem
    h1
      font-size: 4.5rem
      font-weight: 600
      color: #362F29
      @media only screen and (max-width: 1300px)
        font-size: 3.5rem
      @media only screen and (max-width: 900px)
        font-size: 3rem
      @media only screen and (max-width: 650px)
        font-size: 2.5rem
    .menu-buscador
      @include displayFlex(row,start,center)
      width: 100%
      i
        transform: translateY(-50%) translateX(-170%)
        position: absolute
        border: none
        color: #362F29
        font-size: 1.8rem

      input
        width: 30%
        padding-left: 1rem
        border-radius: 2rem
        font-size: 1.1rem
        outline: none
        color: #787878
        font-weight: 300
        border: none
        background-color: rgba(255, 255, 255, 0.56)
        height: 3rem
        @media only screen and (max-width: 1300px)
          width: 40%
        @media only screen and (max-width: 900px)
          width: 50%
        @media only screen and (max-width: 650px)
          width: 100%

    .home-valoraions  
      display: flex
      align-items: center
      gap: 1rem
      i
        color: white 
      .fa-google
        font-size: 2rem


  .categoriaVue
    width: 80%
    margin-top: 2rem
    gap: 1rem
    @include displayFlex(row,space-between,start)
    @media only screen and (max-width: 1400px)
      gap: 1rem
      @include displayFlex(column,center,center)
    .categoriaTitutlos
      h1
        font-size: 3rem
        font-weight: 600
        @media only screen and (max-width: 900px)
          font-size: 1.8rem
          text-align: center

      h3
        font-weight: 400
        font-size: 1.8rem
        @media only screen and (max-width: 900px)
          font-size: 1.2rem
          text-align: center


    .categorias
      display: flex
      align-items: flex-start
      justify-content: space-around
      flex-direction: column
      gap: 2rem
      width: 50%
      @media only screen and (max-width: 1400px)
        width: 60%

      div
        width: 100%
        display: grid
        gap: 2rem

        grid-template-columns: repeat(4, 1fr)
        @media only screen and (max-width: 1250px)
          grid-template-columns: repeat(3, 1fr)
        @media only screen and (max-width: 900px)
          grid-template-columns: repeat(2, 1fr)
        @media only screen and (max-width: 480px)
          grid-template-columns: 1fr

        div
          cursor: pointer
          @include displayFlex(column,center,center)
          border: none
          box-shadow: 0 5px 10px 0 #c2c2c2
          border-radius: 5px
          height: 18vh
          transition: .3s
          &:hover
            background: #fcf7f7
          a
            text-align: center
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            color: black
            text-decoration: none
            width: 100%
            height: 100%
            h4
              text-align: center
              font-weight: 500
              margin-bottom: 1rem
              font-size: 1.2rem

            i
              font-size: 3rem
      button
        color: white
        border-radius: 5px
        border: none
        cursor: pointer
        padding: .5rem 1rem
        background: #bb1e26

  .queEsBalu
    margin-top: 3rem
    display: flex
    width: 60%
    flex-direction: column
    gap: 3rem
    @media only screen and (max-width: 900px)
      width: 80%
    h1
      margin: 2rem 0
      font-size: 3rem
      font-weight: 600
    div
      display: flex
      gap: 3rem
      flex-direction: column

      .queEsRerversed
        display: flex
        flex-direction: row-reverse
        justify-content: space-between
        @media only screen and (max-width: 1100px)
          flex-direction: column
        
      div
        display: flex
        flex-direction: row
        text-align: end
        @media only screen and (max-width: 1100px)
          flex-direction: column
          text-align: start

      
        img
          height: 500px
          width: auto
          border-radius: 5px
          @media only screen and (max-width: 1100px)
            object-fit: cover

        div
          flex-direction: column
          p
            text-align: justify
            font-size: 1.3rem
          h2
            font-weight: 600

</style>
