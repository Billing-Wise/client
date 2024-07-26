<template>
  <div class="root-container">
    <div class="left-side">
      <ContractCreateInfoVue/>
      <div class="btn-box">
        <WarningWideBtnVue title="취소" />
        <ThemeWideBtnVue title="다음" />
      </div>
    </div>
    <div class="right-side" v-if="contractCreateStore.step === 0">
      <div class="right-side-header">
        <MemberSearchVue/>
      </div>
      <MemberSelectTableVue/>
    </div>
    <div class="right-side" v-if="contractCreateStore.step === 1">
      <div class="right-side-header">
      </div>
      <ItemSelectTableVue/>
    </div>
  </div>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import ContractCreateInfoVue from '@/components/contract/ContractCreateInfo.vue'
import MemberSelectTableVue from '@/components/contract/table/MemberSelectTable.vue'
import MemberSearchVue from '@/components/member/MemberSearch.vue'
import ItemSelectTableVue from '@/components/contract/table/ItemSelectTable.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contractCreate'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    ContractCreateInfoVue,
    MemberSelectTableVue,
    MemberSearchVue,
    ItemSelectTableVue
  },
  computed: {
    ...mapStores(useContractCreateStore),
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(row, space-between, 100px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 60px 130px;
}

.left-side {
  @include flex-box(column, space-between, 0px);
  width: 40%;
  height: 100%;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.right-side {
  @include flex-box(column, space-between, 20px);
  position: relative;
  width: 60%;
  height: 100%;
}

.right-side-header {
    @include flex-box(row, space-between, 20px);
    width: 100%;

    span {
    font-size: 22px;
    font-weight: bold;
    padding: 10px;
    border: $theme-color solid 2px;

  }
  }
</style>