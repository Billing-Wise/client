<template>
  <div class="root-container">
    <div class="left-side">
      <ContractCreateInfoVue />
      <div class="warning-msg">{{ warningMsg }}</div>
      <div class="btn-box" v-if="contractCreateStore.step === 0">
        <WarningWideBtnVue title="취소" :func="routeContratList" />
        <ThemeWideBtnVue title="다음" :func="() => changeStep(1)" />
      </div>
      <div class="btn-box" v-if="contractCreateStore.step === 1">
        <ThemeWideBtnVue title="이전" :func="() => changeStep(0)" />
        <ThemeWideBtnVue title="다음" :func="() => changeStep(2)" />
      </div>
      <div class="btn-box" v-if="contractCreateStore.step === 2">
        <ThemeWideBtnVue title="이전" :func="() => changeStep(1)" />
        <SuccessWideBtnVue title="완료" :func="createContract" />
      </div>
    </div>
    <ContractChooseMemberVue v-if="contractCreateStore.step === 0" />
    <ContractChooseItemVue v-if="contractCreateStore.step === 1" />
  </div>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue'
import ContractCreateInfoVue from '@/components/contract/ContractCreateInfo.vue'
import ContractChooseMemberVue from '@/components/contract/create/ContractChooseMember.vue'
import ContractChooseItemVue from '@/components/contract/create/ContractChooseItem.vue'
import ContractChooseInfoVue from '@/components/contract/create/ContractChooseInfo.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'
import { createContract } from '@/utils/contract'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    SuccessWideBtnVue,
    ContractCreateInfoVue,
    ContractChooseMemberVue,
    ContractChooseItemVue,
    ContractChooseInfoVue
  },
  data() {
    return {
      warningMsg: ''
    }
  },
  computed: {
    ...mapStores(useContractCreateStore),
  },
  methods: {
    routeContratList() {
      this.$router.push({ name: 'contract' });
    },
    changeStep(step) {
      this.contractCreateStore.setStep(step);
    },
    async createContract() {
      const result = await createContract();
      if (result.code === 200) {
        this.$router.push(`/contract/${result.data}`);
      } else {
        this.warningMsg = result.message;
      }
    }
  },
  mounted() {
    if (!this.contractCreateStore.dataPassed) {
      this.contractCreateStore.$reset();
    }
    this.contractCreateStore.setDataPassed(false);
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, center, 100px);
  @include root-container;
  height: auto;
  padding: 30px 30px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  min-width: 700px;
  width: 40%;
  height: 100%;
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;
  transition: all 0.5s;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.warning-msg {
  height: 20px;
  color: tomato;
  font-weight: bold;
}
</style>