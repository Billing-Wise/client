<template>
  <nav class="nav-bar">
    <img src="@/assets/images/name_white.png" alt="">
    <div class="nav-info">
      <div class="nav-info-item">{{ clientName }}</div>
      <div class="nav-info-item">{{ userName }} 님</div>
    </div>
  </nav>
</template>

<script>
import { mainAxios } from '@/utils/axios';

export default {
  name: 'TheNavBarVue',
  data() {
    return {
      clientName: String,
      userName: String,
    };
  },
  async mounted() {
    // const result = await mainAxios.get('users/current');
    // this.clientName = result.data.clientName
    // this.userName = result.data.userName
    this.clientName = "KOSA"
    this.userName = "홍길동"
  },
  method: {
  },
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    @include flex-box(row, space-between, 0px);
    background-color: $theme-color;
    position: fixed;
    top: 0px;
    left: 0px;
    height: $nav-bar-height;
    width: 100vw;
    padding: 0px 20px;
    z-index: 2;
    .nav-info {
      @include flex-box(row, center, 20px);
      .nav-info-item {
        @include flex-box(row, center, 0px);
        background-color: white;
        border-radius: 5px;
        padding: 5px 15px;
        font-weight: bold;
      }
    }
  }
</style>