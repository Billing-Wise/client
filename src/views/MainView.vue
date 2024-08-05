<template>
  <div class="main-view">
    <TheNavBarVue/>
    <TheSideBarVue/>
    <div class="main-content">
      <RouterView/>
    </div>
    <LoadingVue v-show="loadingStore.isLoading"/>
  </div>
</template>

<script>
import TheNavBarVue from "@/components/common/TheNavBar.vue";
import TheSideBarVue from "@/components/common/TheSideBar.vue";
import LoadingVue from "@/components/common/Loading.vue";
import { useLoadingStore } from "@/stores/error/loading";
import { mapStores } from "pinia";
import { useErrorHandleStore } from "@/stores/error/errorHandle";

export default {
  name: 'MainView',
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  components: {
    TheNavBarVue, 
    TheSideBarVue,
    LoadingVue  
  },
  computed: {
    ...mapStores(useLoadingStore),
    ...mapStores(useErrorHandleStore),
  },
  watch: {
    'errorHandleStore.notFound'(newValue) {
      // 404 에러 발생
      if (newValue) {
        this.$router.replace({name: 'notFound'});
        this.errorHandleStore.$reset();
      }
    },
    'errorHandleStore.notAuthorized'(newValue) {
      // 403 에러 발생
      if (newValue) {
        this.$router.replace({name: 'accessDenied'});
        this.errorHandleStore.$reset();
      }
    },
    'errorHandleStore.serverError'(newValue) {
      // 서버 에러 발생
      if (newValue) {
        this.$router.push({name: 'serverError'});
        this.errorHandleStore.$reset();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    background: $back-color;
    padding-top: $nav-bar-height;
    padding-left: $side-bar-width;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }
</style>