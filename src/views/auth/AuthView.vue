<template>
  <div class="root-container">
    <router-view/>
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
</style>