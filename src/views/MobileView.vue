<template>
  <div class="mobile-view">
    <header class="logo-header">
      <img 
        class="logo-img"
        src="@/assets/images/name_white.png" 
        alt="logo">
      <p class="page-name">{{ mobilePageStore.pageName }}</p>
    </header>
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'MobileView',
  computed: {
    ...mapStores(useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName'])
  }
}
</script>

<style lang="scss" scoped>
  .mobile-view {
    width: 100%;
    margin: auto;
    position: relative;
    @media (min-width: 801px) {
      max-width: 800px;
    }
  }

  .logo-header {
    @include flex-box(column, center, 10px);
    background-color: $theme-color;
    position: absolute;
    top:0;
    width: 100%;
    height: $mobile-header-height;
    .logo-img {
      width: 200px
    }
    .page-name {
      color: white;
      font-weight: bold;
      font-size: 22px;
      margin: 0px;
    }
  }

  .main-content {
    position: absolute;
    top: $mobile-header-height;
    width: 100%;
  }
</style>