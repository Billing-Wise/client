<template>
  <div class="logo-container">
    <img src="@/assets/images/logo_white.png" alt="logo" class="logo-image">
  </div>
</template>

<script>
export default {
  name: 'LogoSideVue',
}
</script>

<style lang="scss" scoped>
  .logo-container {
    @include flex-box(row, center, 0px);
    background-color: $theme-color;
    width: 640px;
    height: 100vh;
    .logo-image {
      width: 500px;
    }
  }
</style>