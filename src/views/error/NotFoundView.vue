<template>
  <div class="root-container">
    <img src="@/assets/images/warn.png" alt="warning">
    <div class="main-container">
      <i class="bi bi-arrow-left-square-fill" @click="goBack"></i>
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .root-container {
    @include flex-box(column, center, 40px);
    width: 100vw;
    height: 100vh;
    img {
      width: 150px;
    }
    .main-container {
      @include flex-box(row, center, 20px);
      span {
        font-weight: bold;
        font-size: 18px;
      }
      i {
        @include base-icon;
        font-size: 24px;
      }
    }
  }
</style>