<template>
  <div class="side-bar-logout" @click="logout">
    <i class="bi bi-arrow-right-circle"></i>
    <span>로그아웃</span>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/auth';
export default {
  name: 'SideBarLogoutVue',
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-bar-logout {
    background-color: $theme-color;
    @include flex-box(row, center, 10px);
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    &:hover{
      opacity: 0.7;
    }
  }
</style>