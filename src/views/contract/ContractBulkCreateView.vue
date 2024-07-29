<template>
  <div class="root-container">
    <div class="left-side">
      <ExcelUploadVue :store="contractBulkStore" />
      <div class="btn-box">
        <WarningWideBtnVue title="취소" :func="cancelBulk"/>
        <SuccessWideBtnVue title="계약 등록" :func="registerBulk"/>
      </div>
    </div>
    <div class="right-side">
      <span>등록할 계약 정보</span>
      <ContractCreateTableVue />
    </div>
  </div>
  <ContractBulkErrorModalVue :isVisible="isInValid" :close-modal="() => operateErrorModal(false)"/>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractBulkStore } from '@/stores/contract/contractBulk';
import { createContractBulk } from '@/utils/contract';
import ExcelUploadVue from '@/components/common/ExcelUpload.vue';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import ContractCreateTableVue from '@/components/contract/table/ContractCreateTable.vue';
import ContractBulkErrorModalVue from '@/components/contract/modal/ContractBulkErrorModal.vue';

export default {
  name: 'ContractBulkCreateView',
  components: {
    ExcelUploadVue,
    WarningWideBtnVue,
    SuccessWideBtnVue,
    ContractCreateTableVue,
    ContractBulkErrorModalVue
  },
  data() {
    return {
      isInValid: false,
    }
  },
  computed: {
    ...mapStores(useContractBulkStore),
  },
  methods: {
    ...mapActions(useContractBulkStore, ['setErrorList']),
    cancelBulk() {
      this.$router.push({name: 'contract'});
    },
    operateErrorModal(value) {
      this.isInValid = value;
    },
    async registerBulk() {
      if (this.contractBulkStore.file === null) {
        this.contractBulkStore.setErrorList(['파일이 업로드되지 않았습니다.']);
        this.operateErrorModal(true);
        return;
      }

      const result = await createContractBulk(this.contractBulkStore.file);

      if (result.code !== 200) {
        this.operateErrorModal(true);
        return;
      } 
      
      this.$router.push({name: 'contract'})
    },
  },
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, center, 100px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 100px 30px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  min-width: 700px;
  height: 100%;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.right-side {
  @include flex-box(column, start, 30px);
  width:100%;
  min-width: 900px;
  height: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  span {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>