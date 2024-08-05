<template>
  <div class="root-container">
    <div class="left-layout">
      <router-view/>
    </div>
    <logo-side-vue/>
    <AuthLoadingVue v-if="loadingStore.isLoading"/>
  </div>

</template>

<script>
import AuthLoadingVue from '@/components/auth/AuthLoading.vue';
import LogoSideVue from '@/components/auth/LogoSide.vue'
import { useLoadingStore } from '@/stores/error/loading';
import { mapStores } from 'pinia';

export default {
  name: 'AuthView',
  components: {
    LogoSideVue,
    AuthLoadingVue
  },
  computed: {
    ...mapStores(useLoadingStore)
  }
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