<template>
  <table class="contract-table">
    <thead>
      <TableHaeder :store="contractStore"/>
      <ContractTableFilterVue/>
    </thead>
    <tbody>
      <ContractTableRowVue v-for="(contract, idx) in contractStore.contractList" :key="idx" :contractData="contract" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractStore } from '@/stores/contract';
import ContractTableFilterVue from './table/ContractTableFilter.vue';
import ContractTableRowVue from './table/ContractTableRow.vue';
import TableHaeder from '../common/table/TableHaeder.vue';

export default {
  name: 'ContractTableVue',
  components: {
    TableHaeder,
    ContractTableFilterVue,
    ContractTableRowVue
  },  
  computed: {
    ...mapStores(useContractStore),
  },
  methods: {
    ...mapActions(useContractStore, ['setColumnSort']),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.contract-table {
  @include base-table();
}
</style>