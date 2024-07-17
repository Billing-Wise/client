<template>
  <div class="root-container">
    <div class="left-layout">
      <router-view/>
    </div>
    <logo-side-vue/>
  </div>
</template>

<script>
import LogoSideVue from '@/components/auth/LogoSide.vue'

export default {
  name: 'AuthView',
  components: {
    LogoSideVue,
  },
}
</script>

<style lang="scss" scoped>
  .root-container {
    @include flex-box(row, center, 0px);
  }

  .left-layout {
    @include flex-box(column, center, 20px);
    flex-grow: 1;
  }
</style>