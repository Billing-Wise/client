<template>
  <div class="main-view" >
    <TheNavBarVue/>
    <TheSideBarVue/>
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
</template>

<script>
import TheNavBarVue from "@/components/common/TheNavBar.vue";
import TheSideBarVue from "@/components/common/TheSideBar.vue";

export default {
  name: 'MainView',
  components: {
    TheNavBarVue, 
    TheSideBarVue  
  },
}
</script>

<style lang="scss" scoped>
  .main-content {
    position: fixed;
    top: $nav-bar-height;
    left: $side-bar-width;
    width: calc(100vw - $side-bar-width);
    height: calc(100vh - $nav-bar-height);
    // height: calc(100vh - $nav-bar-height);
    overflow-x: auto;
  }
</style>