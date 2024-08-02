<template>
  <table class="contract-table">
    <thead>
      <TableHaederVue :store="invoiceListStore"
        :excludeColumnArr="['contractId', 'itemName', 'memberName', 'createdAt', 'paymentType']" />
      <ContractInvoiceTableFilterVue />
    </thead>
    <tbody>
      <ContractInvoiceTableRowVue v-for="(invoice, idx) in invoiceListStore.invoiceList" :key="idx" :invoiceData="invoice" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useInvoiceListStore } from '@/stores/invoice/invoiceList';
import { getInvoiceList } from '@/utils/invoice';
import TableHaederVue from '@/components/common/table/TableHaeder.vue';
import ContractInvoiceTableFilterVue from './ContractInvoiceTableFilter.vue';
import ContractInvoiceTableRowVue from './ContractInvoiceTableRow.vue';


export default {
  name: 'ContractInvoiceTableVue',
  components: {
    TableHaederVue,
    ContractInvoiceTableFilterVue,
    ContractInvoiceTableRowVue
  },
  computed: {
    ...mapStores(useInvoiceListStore),
  },
  methods: {
    ...mapActions(useInvoiceListStore, ['setColumnSort']),
    async getInvoiceList() {
      const result = await getInvoiceList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    setupWatchers() {
      this.$watch('invoiceListStore.size', this.getInvoiceList);
      this.$watch('invoiceListStore.page', this.getInvoiceList);
      this.$watch('invoiceListStore.columns', this.getInvoiceList, { deep: true });
      this.invoiceListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getInvoiceList);
        }
      });
    },
  },
  async mounted() {
    this.invoiceListStore.$reset();
    this.invoiceListStore.setFilter('contractId', this.$route.params.id);
    await this.getInvoiceList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.contract-table {
  @include base-table();
}
</style>