<template>
  <div class="main-view" >
    <NavBarVue/>
    <SideBarVue/>
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
</template>

<script>
import NavBarVue from "@/components/common/NavBar.vue";
import SideBarVue from "@/components/common/SideBar.vue";

export default {
  name: 'MainView',
  components: {
    NavBarVue, 
    SideBarVue  
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
    overflow-x: auto;
  }
</style>