<template>
  <div class="loading">
    <img src="@/assets/images/loading.gif" alt="loading">
  </div>
</template>

<script>
export default {
  name: 'AuthLoadingVue'
}
</script>

<style lang="scss" scoped>
.loading {
  @include flex-box(row, center, 0px);
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  img {
    width: 160px;
  }
}
</style>