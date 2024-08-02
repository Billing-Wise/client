<template>
  <div class="root-container">
    <img src="@/assets/images/warn.png" alt="warning">
    <div class="main-container">
      <span>존재하지 않는 데이터입니다.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoDataView',
}
</script>

<style lang="scss" scoped>
  .root-container {
    @include flex-box(column, center, 40px);
    @include root-container;
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