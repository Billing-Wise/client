<template>
  <div class="root-container">
    <div class="left-side">
      <ContractInfoVue />
      <div class="btn-box">
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)" />
        <ThemeWideBtnVue title="수정" :func="routeContractEdit" />
      </div>
    </div>
    <div class="right-side">
      <div class="right-header">
        <div class="haeder-left">
          <div class="contract-status">
            <span>{{ contractDetailStore.data.contractStatus.name }}</span>
            <div :class="contractStatsClass"></div>
          </div>
          <span class="contract-title">현재 계약 관련 청구</span>
        </div>
        <div class="right-btn-box">
          <ThemeIconBtnVue title="동의서 등록" icon="bi bi-plus-square" :func="() => operationConsentModal(true)"
            v-if="!canCreateInvoice()" />
          <ThemeIconBtnVue title="청구 생성" icon="bi bi-plus-square" :func="() => operateCreaeteInvoiceModal(true)"
            v-if="canCreateInvoice()" />
          <ThemeIconBtnVue title="동의서 수정" icon="bi bi-pencil-square" :func="() => operationConsentEditModal(true)"
            v-if="canEditConsent()" />
          <WarningBtnVue title="계약 종료" 
            :func="() => operationContractEndModal(true)" 
            v-if="contractDetailStore.data.contractStatus.id === 2"/>
          <SuccessBtnVue title="계약 재개" :func="() => editContractStatus(2)" v-if="contractDetailStore.data.contractStatus.id === 3"/>
        </div>
      </div>
      <div class="table-box">
        <ContractInvoiceTableVue />
        <PaginationBarVue :store="invoiceListStore" />
      </div>
    </div>
  </div>
  <ContractDeleteModalVue :is-visible="deleteModalVisible" :close-modal="() => operateDeleteModal(false)" />
  <InvoiceCreateModalVue :is-visible="creaeteInvoiceModalVisible"
    :close-modal="() => operateCreaeteInvoiceModal(false)" />
  <ConsentCreateModalVue :is-visible="consentModalVisible" :close-modal="() => operationConsentModal(false)" />
  <ConsentUpdateModalVue :is-visible="consentEditModalVisible" :close-modal="() => operationConsentEditModal(false)" />
  <ContractEndModalVue :is-visible="contractEndModalVisible" :close-modal="() => operationContractEndModal(false)" />
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
import ConsentCreateModalVue from '@/components/consent/modal/ConsentCreateModal.vue'
import ConsentUpdateModalVue from '@/components/consent/modal/ConsentUpdateModal.vue'
import WarningBtnVue from '@/components/common/btn/WarningBtn.vue'
import SuccessBtnVue from '@/components/common/btn/SuccessBtn.vue'
import ContractEndModalVue from '@/components/contract/modal/ContractEndModal.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'
import { useInvoiceListStore } from '@/stores/invoice/invoiceList'
import { useConsentDetailStore } from '@/stores/contract/consentDetail'
import { useContractDetailStore } from '@/stores/contract/contractDetail'
import { getConsent } from '@/utils/consent'
import { editContractStatus, getContract } from '@/utils/contract'


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
    InvoiceCreateModalVue,
    ConsentCreateModalVue,
    ConsentUpdateModalVue,
    ContractEndModalVue,
    WarningBtnVue,
    SuccessBtnVue,
  },
  data() {
    return {
      warningMsg: '',
      deleteModalVisible: false,
      creaeteInvoiceModalVisible: false,
      consentModalVisible: false,
      consentEditModalVisible: false,
      contractEndModalVisible: false,
    }
  },
  computed: {
    ...mapStores(useContractDetailStore),
    ...mapStores(useContractCreateStore),
    ...mapStores(useInvoiceListStore),
    ...mapStores(useConsentDetailStore),
    contractStatsClass() {
      const id = this.contractDetailStore.data.contractStatus.id
      if (id === 1) {
        return 'waiting';
      } else if (id === 2) {
        return 'success';
      } else {
        return 'warning';
      }
    },
  },
  methods: {
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    operateCreaeteInvoiceModal(value) {
      this.creaeteInvoiceModalVisible = value;
    },
    operationConsentModal(value) {
      this.consentModalVisible = value;
    },
    operationConsentEditModal(value) {
      this.consentEditModalVisible = value
    },
    operationContractEndModal(value) {
      this.contractEndModalVisible = value
    },
    routeContractEdit() {
      this.$router.push(`/contract/${this.$route.params.id}/edit`)
    },
    canCreateInvoice() {
      return this.contractDetailStore.data.paymentType.id === 1 || this.consentDetailStore.isExist;
    },
    canEditConsent() {
      return this.contractDetailStore.data.paymentType.id === 2 && this.consentDetailStore.isExist;
    },
    // 계약 상태 변경
    async editContractStatus(statusId) {
      const result = await editContractStatus(this.$route.params.id, statusId);
      if (result.code !== 200) {
        // 예외 처리
      }
    }
  },
  async created() {
    this.consentDetailStore.$reset();
    const result1 = await getContract(this.$route.params.id);
    if (result1.code !== 200 && result1.code !== 400) {
      return;
    }
    const result2 = await getConsent(this.contractDetailStore.data.member.id);
    if (result2.code !== 200 && result2.code !== 400) {
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(row, center, 60px);
  @include root-container;
  height: 100%;
  padding: 30px 50px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  width: 650px;
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
  width: 900px;
  height: 100%;

  .right-header {
    @include flex-box(row, space-between, 20px);
    width: 100%;

    .haeder-left {
      @include flex-box(row, start, 15px);
      font-weight: bold;

      .contract-title {
        left: 50%;
        font-size: 22px;

      }

      .contract-status {
        @include flex-box(row, start, 5px);
        padding: 5px 7px;
        background: white;
        border-radius: 20px;
        border: solid 2px $theme-color;

        div {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

    }

    .right-btn-box {
      @include flex-box(row, center, 20px);
    }
  }
}

.waiting {
  background-color: $waiting-color;
}

.success {
  background-color: $success-color;
}

.warning {
  background-color: $warning-color;
}
</style>