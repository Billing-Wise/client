<template>
  <div class="root-container">
    <div class="left-side">
      <ContractCreateInfoVue />
      <div class="warning-msg">{{ warningMsg }}</div>
      <div class="btn-box">
        <WarningWideBtnVue title="취소" :func="routeContract" />
        <SuccessWideBtnVue title="완료" :func="createContract" />
      </div>
    </div>
  </div>
  <ItemSelectModalVue 
    :isVisible="contractCreateStore.selectingItem"
    :close-modal="() => contractCreateStore.setSelectingItem(false)"/>
  <MemberSelectModalVue 
    :isVisible="contractCreateStore.selectingMember"
    :close-modal="() => contractCreateStore.setSelectingMember(false)"/>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue'
import ContractCreateInfoVue from '@/components/contract/ContractCreateInfo.vue'
import ItemSelectModalVue from '@/components/contract/modal/ItemSelectModal.vue'
import MemberSelectModalVue from '@/components/contract/modal/MemberSelectModal.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'
import { createContract } from '@/utils/contract'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    SuccessWideBtnVue,
    ContractCreateInfoVue,
    ItemSelectModalVue,
    MemberSelectModalVue
  },
  data() {
    return {
      warningMsg: '',
    }
  },
  computed: {
    ...mapStores(useContractCreateStore),
  },
  methods: {
    routeContratList() {
      this.$router.push({ name: 'contract' });
    },
    routeContract() {
      this.$router.push({name:'contract'});
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
  width: 700px;
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