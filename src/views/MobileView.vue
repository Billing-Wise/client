<template>
  <div class="mobile-view">
    <header class="logo-header">
      <img 
        class="logo-img"
        src="@/assets/images/name_white.png" 
        alt="logo">
    </header>
    <RouterView/>
  </div>
</template>

<script>
export default {
  name: 'MobileView'
}
</script>

<style lang="scss" scoped>
  .mobile-view {
    width: 100%;
    margin: auto;

    @media (min-width: 501px) {
      max-width: 500px;
    }
  }

  .logo-header {
    @include flex-box(row, center, 0px);
    background-color: $theme-color;
    width: 100%;
    padding: 10px;
    .logo-img {
      width: 200px
    }
  }
</style>