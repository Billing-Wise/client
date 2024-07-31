<template>
  <div class="root-container">
    <div class="header-container">

    </div>
    <div class="main-container">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(column, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 30px 40px
}

</style>
