<template>
  <div class="root-container">
    <div class="left-side">
      <ContractEditInfoVue />
      <div class="warning-msg">{{ warningMsg }}</div>
      <div class="btn-box" v-if="contractCreateStore.step === 2">
        <WarningWideBtnVue title="취소" :func="routeContratDetail" />
        <SuccessWideBtnVue title="완료" :func="editContract" />
      </div>
    </div>
    <ContractChooseInfoVue v-if="contractCreateStore.step === 2" />
  </div>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue'
import ContractChooseInfoVue from '@/components/contract/create/ContractChooseInfo.vue'
import ContractEditInfoVue from '@/components/contract/ContractEditInfo.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'
import { useContractDetailStore } from '@/stores/contract/contractDetail'
import { editContract, getContract } from '@/utils/contract'

export default {
  name: 'ContractEditView',
  components: {
    WarningWideBtnVue,
    SuccessWideBtnVue,
    ContractEditInfoVue,
    ContractChooseInfoVue
  },
  data() {
    return {
      warningMsg: ''
    }
  },
  computed: {
    ...mapStores(useContractCreateStore),
    ...mapStores(useContractDetailStore)
  },
  methods: {
    routeContratDetail() {
      this.$router.push(`/contract/${this.$route.params.id}`);
    },
    async editContract() {
      const result = await editContract(this.$route.params.id);
      if (result.code === 200) {
        this.$router.push(`/contract/${this.$route.params.id}`);
      } else {
        this.warningMsg = result.message;
      }
    }
  },
  async created() {
    this.contractCreateStore.setStep(2);
    if (this.contractDetailStore.data.id !== Number(this.$route.params.id)) {
      const result = await getContract(this.$route.params.id);
      if (result.code === 200) {
        this.contractCreateStore.setAllDataFromDetailStore(this.contractDetailStore.data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, center, 50px);
  @include root-container;
  height: auto;
  padding: 30px 30px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  min-width: 700px;
  width: 40%;
  min-height: 100%;
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

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