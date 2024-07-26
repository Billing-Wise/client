<template>
  <div class="root-container">
    <div class="left-side">
      <ContractCreateInfoVue/>
      <div class="btn-box">
        <WarningWideBtnVue title="취소" />
        <ThemeWideBtnVue title="다음" />
      </div>
    </div>
    <!-- <div class="right-side">
      <div class="right-header">
        <span class="contract-count">총 {{ memberStore.currentMember.contractCount }}건</span>
        <span class="contract-title">현재 회원 관련 계약</span>
        <ThemeIconBtnVue title="계약 등록" icon="bi bi-plus-square"/>
      </div>
    </div> -->
  </div>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import ContractCreateInfoVue from '@/components/contract/ContractCreateInfo.vue'

export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    ContractCreateInfoVue
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(row, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 60px 50px
}

.left-side {
  @include flex-box(column, space-between, 0px);
  width: 400px;
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

// .right-side {
//   @include flex-box(column, space-between, 20px);
//   position: relative;
//   width: 100%;
//   height: 100%;

//   .right-header {
//     @include flex-box(row, space-between, 20px);
//     width: 100%;
//     padding: 0px 20px;

//     .contract-count {
//       font-size: 20px;
//       font-weight: bold;
//     }

//     .contract-title {
//       position:absolute;
//       left: 50%;
//       transform: translateX(-50%);
//       font-size: 24px;
//       font-weight: bold;
//     }
//   }
// }
</style>