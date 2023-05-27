<template>
  <div>
    <HeaderVue />
    <SubastaVue />
  </div>
</template>
  
<script>
import HeaderVue from "../components/HeaderVue.vue";
import SubastaVue from "../components/Subasta/SubastaVue";

export default {
  name: "App",
  components: {
    HeaderVue,
    SubastaVue,
  },
};
</script>
  
<style lang="sass">
@import "./style/style.sass"

.subastaVue
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 1rem 5vw
  width: 100vw
  @media only screen and (max-width: 800px)
    flex-direction: column
    gap: 2rem


  .menuSubasta
    display: flex
    flex-direction: column
    width: 35vw
    @media only screen and (max-width: 800px)
      width: 90vw
      

    .valoracionUser
      margin-bottom: 1rem
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      i
        font-size: 1.8rem
      .perfilUser
        display: flex
        align-items: center
        img
          width: 8%
          border-radius: 50%
        .infoUser
          margin-left: 1rem
          h4
            font-weight: 400

    .descripcion
      display: flex
      flex-direction: column
      gap: .5rem
      word-wrap: break-word
      background-color: white
      box-shadow: 2px 3px 14px 2px rgba(180, 171, 175, 0.59)
      border-radius: 5px
      padding: 2rem
      margin-bottom: 2rem
      p
        font-weight: 300
        b
          font-weight: 600
      h1
        font-weight: 600
        font-size: 3rem
      h4
        font-size: 1.3rem
        font-weight: 500
        b
          font-weight: 600
    .pujar
      div
        display: flex
        gap: 2rem
        h2
          box-shadow: 2px 3px 14px 2px rgba(180, 171, 175, 0.59)
          border-radius: 5px
          font-weight: 400
          font-size: 1.5rem
          padding: 1rem
          width: 50%
          height: 5rem
          display: flex
          align-items: center
          gap: 1rem
          i
            font-size: 2rem
          b
            font-weight: 500
            color: #72B63D
            font-size: 1.8rem
        div
          height: 5rem
          display: flex
          align-items: center
          gap: 1rem
          width: 60%
          box-shadow: 2px 3px 14px 2px rgba(180, 171, 175, 0.59)
          border-radius: 5px
          span
            margin-left: 1rem
          input
            height: 3rem
            margin-right: .5rem
            padding-left: 8px
            border-radius: .5rem
            border: none
            background: #F1F1F1
            font-size: 25px
            width: 100%


  .imgs
    width: 55vw
    margin-right: 1rem
    display: flex
    flex-direction: row
    max-height: 80vh
    @media only screen and (max-width: 1250px)
      flex-direction: column-reverse
    @media only screen and (max-width: 800px)
      width: 90vw
      
    #big-img
      width: 100%
      overflow: hidden
      object-fit: cover
      @media only screen and (max-width: 1250px)
        width: 100%
  
        
    #scrollRed::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
      border-radius: 10px
      background-color: #F5F5F5

    
    #scrollRed::-webkit-scrollbar
      width: 12px
      background-color: #F5F5F5
    

    #scrollRed::-webkit-scrollbar-thumb
      border-radius: 10px
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
      background-color: #b1b1b1
    
    
    .select-img
      overflow: hidden
      position: relative
      display: flex
      flex-direction: column
      gap: 1rem !important
      object-fit: cover !important
      overflow-y: scroll
      width: 60%
      @media only screen and (max-width: 1250px)
        overflow-x: scroll
        width: 100%
        flex-direction: row
      img
        height: 100%
        margin-right: 1rem
        @media only screen and (max-width: 1250px)
          margin-top: 1rem
          margin-right: 0
          object-fit: cover
          height: 300px

</style>
  