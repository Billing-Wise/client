<template>
  <div class="right-side">
    <div class="right-side-header">
      <MemberSearchVue />
    </div>
    <MemberSelectTableVue />
  </div>
</template>

<script>
import MemberSelectTableVue from '@/components/contract/table/MemberSelectTable.vue'
import MemberSearchVue from '@/components/member/MemberSearch.vue'

export default {
  name: 'ContractChooseMemberVue',
  components: {
    MemberSelectTableVue,
    MemberSearchVue,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/contract/choose-box.scss';
</style>