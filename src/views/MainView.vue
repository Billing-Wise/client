<template>
  <div class="main-view" :style="{ width: width + 'px', height: height + 'px'}">
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
  watch: {

  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  components: {
    TheNavBarVue, 
    TheSideBarVue  
  },
}
</script>

<style lang="scss" scoped>
  .main-view {
    position:relative;
  }
  .main-content {
    position: absolute;
    top: $nav-bar-height;
    left: $side-bar-width;
    overflow: auto;
    overflow: auto;
    width: calc(100% - $side-bar-width);
    height: calc(100% - $nav-bar-height);
  }
</style>