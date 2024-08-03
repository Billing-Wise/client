<template>
  <nav class="nav-bar">
    <img src="@/assets/images/name_white.png" alt="">
    <div class="nav-info">
      <div class="nav-info-item">{{ authStore.clientName }}</div>
      <div class="nav-info-item">{{ authStore.userName }} 님</div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { mainAxios } from '@/utils/axios';
import { mapStores } from 'pinia';

export default {
  name: 'TheNavBarVue',
  data() {
    return {
      clientName: String,
      userName: String,
    };
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  async mounted() {
    const result = await mainAxios.get('users/current');
    if (result.code === 200) {
      this.authStore.setUserData(result.data)
    }
  },
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    @include flex-box(row, space-between, 0px);
    background-color: $theme-color;
    position: absolute;
    top: 0px;
    left: 0px;
    height: $nav-bar-height;
    width: 100%;
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