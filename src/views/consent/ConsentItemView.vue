<template>
  <div>
    <h1>비회원 아이템 선택</h1>
  </div>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'ConsentItemView',
  computed: {
    ...mapStores(useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName'])
  },
  mounted() {
    this.mobilePageStore.setPageName("상품 선택")
  }
}
</script>

<style lang="scss" scoped>

</style>

