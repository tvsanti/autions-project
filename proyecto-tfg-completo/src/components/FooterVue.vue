<template>
  <footer>
    <p>© 2022 Balú S.L | Terms of Use | Privacy | Cookies | Interest-based ads </p>
  </footer>
</template>

<script>
export default {
    name: 'FooterVue'
}
</script>

<style lang="sass">
@import "./style/style.sass"

footer
  @include displayFlex(row,center,center)
  padding: 1rem 0
</style>