<template>
  <table class="contract-table">
    <thead>
      <TableHaederVue :store="invoiceListStore"/>
      <InvoiceTableFilterVue/>
    </thead>
    <tbody>
      <InvoiceTableRowVue v-for="(invoice, idx) in invoiceListStore.invoiceList" :key="idx" :invoiceData="invoice" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useInvoiceListStore } from '@/stores/invoice/invoiceList';
import TableHaederVue from '@/components/common/table/TableHaeder.vue';
import InvoiceTableFilterVue from './InvoiceTableFilter.vue';
import InvoiceTableRowVue from './InvoiceTableRow.vue';


export default {
  name: 'InvoiceTableVue',
  components: {
    TableHaederVue,
    InvoiceTableFilterVue,
    InvoiceTableRowVue
  },  
  computed: {
    ...mapStores(useInvoiceListStore),
  },
  methods: {
    ...mapActions(useInvoiceListStore, ['setColumnSort']),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.contract-table {
  @include base-table();
}
</style>