<template>
  <div class="root-container">
    <div class="btn-box">
      <TitleInfoVue title="계약ID" :info="invoiceCreateStore.data.contractId"/>
      <TitleSelectVue title="결제 수단" :selectedIdx="invoiceCreateStore.paymentTypeIdx" :keywordArr="invoiceCreateStore.paymentType"
      :choiceFunc="setPaymentType" />
      <InfoInputVue title="청구금" v-model="chargeAmount" type="number" />
      <InfoInputVue title="약정일" type="date" v-model="contractDate" />
      <InfoInputVue title="납부기한" type="date" v-model="dueDate" />
    </div>
    <div class="table-box">
      <InvoiceCreateTableVue />
      <PaginationBarVue :store="contractListStore" />
    </div>
    <div class="btn-box">
      <WarningBtnVue title="취소" :func="routeInvoice"/>
      <span>{{ warningMsg }}</span>
      <ThemeBtnVue title="계약 등록" :func="createInvoice"/>
    </div>
  </div>
</template>

<script>
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import InvoiceCreateTableVue from '@/components/invoice/table/InvoiceCreateTable.vue';
import TitleInfoVue from '@/components/common/info/TitleInfo.vue';
import ThemeBtnVue from '@/components/common/btn/ThemeBtn.vue';
import WarningBtnVue from '@/components/common/btn/WarningBtn.vue';
import { mapStores } from 'pinia';
import { getContractList } from '@/utils/contract';
import { useContractListStore } from '@/stores/contract/contractList';
import { useInvoiceCreateStore } from '@/stores/invoice/invoiceCreate';
import { createInvoice } from '@/utils/invoice';

export default {
  name: 'InvoiceCreateView',
  components: {
    TitleInfoVue,
    PaginationBarVue,
    InfoInputVue,
    TitleSelectVue,
    InvoiceCreateTableVue,
    ThemeBtnVue,
    WarningBtnVue
  },
  data() {
    return {
      warningMsg:''
    }
  },
  computed: {
    ...mapStores(useContractListStore),
    ...mapStores(useInvoiceCreateStore),
    chargeAmount: {
      get() {
        return this.invoiceCreateStore.data.chargeAmount;
      },
      set(value) {
        this.invoiceCreateStore.data.chargeAmount = value;
      }
    },
    contractDate: {
      get() {
        return this.invoiceCreateStore.data.contractDate;
      },
      set(value) {
        this.invoiceCreateStore.data.contractDate = value;
      }
    },
    dueDate: {
      get() {
        return this.invoiceCreateStore.data.dueDate;
      },
      set(value) {
        this.invoiceCreateStore.data.dueDate = value;
      }
    },
  },
  methods: {
    routeInvoice() {
      this.$router.push({name: 'invoice'})
    },
    async createInvoice() {
      const result = await createInvoice();
      
      if (result.code === 200) {
        this.$router.push(`/invoice/${result.data}`);
      } else {
        this.warningMsg = result.message;
      }
    },
    setPaymentType(idx) {
      this.invoiceCreateStore.setPaymentTypeIdx(idx)
    },
    async getContractList() {
      const result = await getContractList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    setupWatchers() {
      this.$watch('contractListStore.size', this.getContractList);
      this.$watch('contractListStore.page', this.getContractList);
      this.$watch('contractListStore.columns', this.getContractList, { deep: true });
      this.contractListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getContractList);
        }
      });
    },
  },
  async mounted() {
    this.contractListStore.$reset();
    this.contractListStore.setFilter('contractStatusId', 2)
    await this.getContractList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 30px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 30px 40px
}

.btn-box {
    @include flex-box(row, space-between, 20px);
    width: 100%;
    span {
      font-size: 18px;
      font-weight: bold;
      color: $warning-color
    }
  }
</style>
