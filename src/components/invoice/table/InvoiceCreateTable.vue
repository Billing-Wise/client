<template>
  <table class="contract-table">
    <thead>
      <TableHaeder :store="contractListStore" :excludeColumnArr="['contractStatus']"/>
      <InvoiceCreateTableFilterVue/>
    </thead>
    <tbody>
      <InvoiceCreateTableRowVue v-for="(contract, idx) in contractListStore.contractList" :key="idx" :contractData="contract" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractListStore } from '@/stores/contract/contractList';
import TableHaeder from '@/components/common/table/TableHaeder.vue';
import InvoiceCreateTableFilterVue from './InvoiceCreateTableFilter.vue';
import InvoiceCreateTableRowVue from './InvoiceCreateTableRow.vue';


export default {
  name: 'InvoiceCreateTableVue',
  components: {
    TableHaeder,
    InvoiceCreateTableFilterVue,
    InvoiceCreateTableRowVue
  },  
  computed: {
    ...mapStores(useContractListStore),
  },
  methods: {
    ...mapActions(useContractListStore, ['setColumnSort']),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.contract-table {
  @include base-table();
}
</style>