<template>
  <div class="loading">
    <img src="@/assets/images/loading.gif" alt="loading">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.loading {
  @include flex-box(row, center, 0px);
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  top: $nav-bar-height;
  left: $side-bar-width;
  width: calc(100% - $side-bar-width);
  height: calc(100% - $nav-bar-height);
  z-index: 9999;

  img {
    width: 160px;
  }
}
</style>