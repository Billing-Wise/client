<template>
  <div>
  </div>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'PaymentStartView',
  computed: {
    ...mapStores(useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName'])
  },
  mounted() {
    this.mobilePageStore.setPageName("회원 결제")
  }
}
</script>

<style lang="scss" scoped>

</style>

