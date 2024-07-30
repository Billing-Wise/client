<template>
  <div class="root-container">
    <div class="left-side">
      <ContractInfoVue/>
      <div class="btn-box">
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)"/>
        <ThemeWideBtnVue title="수정" :func="routeContractEdit"/>
      </div>
    </div>
    <div class="right-side">
      <div class="right-header">
        <span class="contract-count">총 {{ invoiceListStore.invoiceList.length }} 건</span>
        <span class="contract-title">현재 계약 관련 청구</span>
        <ThemeIconBtnVue title="청구 생성" icon="bi bi-plus-square" :func="() => operateCreaeteInvoiceModal(true)"/>
      </div>
      <div class="table-box">
        <ContractInvoiceTableVue/>
        <PaginationBarVue :store="invoiceListStore" />
      </div>
    </div>
  </div>
  <ContractDeleteModalVue :is-visible="deleteModalVisible" :close-modal="() => operateDeleteModal(false)"/>
  <InvoiceCreateModalVue :is-visible="creaeteInvoiceModalVisible" :close-modal="() => operateCreaeteInvoiceModal(false)"/>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import ContractInfoVue from '@/components/contract/ContractInfo.vue'
import ContractDeleteModalVue from '@/components/contract/modal/ContractDeleteModal.vue'
import ContractInvoiceTableVue from '@/components/contract/table/ContractInvoiceTable.vue'
import PaginationBarVue from '@/components/common/PaginationBar.vue'
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue'
import InvoiceCreateModalVue from '@/components/contract/modal/InvoiceCreateModal.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'
import { useInvoiceListStore } from '@/stores/invoice/invoiceList'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    ContractInfoVue,
    ContractDeleteModalVue,
    ContractInvoiceTableVue,
    PaginationBarVue,
    ThemeIconBtnVue,
    InvoiceCreateModalVue
  },
  data() {
    return {
      warningMsg: '',
      deleteModalVisible: false,
      creaeteInvoiceModalVisible: false,
    }
  },  
  computed: {
    ...mapStores(useContractCreateStore),
    ...mapStores(useInvoiceListStore),
  },
  methods: {
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    operateCreaeteInvoiceModal(value) {
      this.creaeteInvoiceModalVisible = value;
    },
    routeContractEdit() {
      this.$router.push(`/contract/${this.$route.params.id}/edit`)
    },
  },
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

.right-side {
  @include flex-box(column, space-between, 20px);
  position: relative;
  width: 100%;
  height: 100%;

  .right-header {
    @include flex-box(row, space-between, 20px);
    width: 100%;
    padding: 0px 20px;

    .contract-count {
      font-size: 20px;
      font-weight: bold;
    }

    .contract-title {
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>