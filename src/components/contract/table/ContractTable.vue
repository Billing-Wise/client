<template>
  <table class="contract-table">
    <thead>
      <TableHaeder :store="contractListStore"/>
      <ContractTableFilterVue/>
    </thead>
    <tbody>
      <ContractTableRowVue v-for="(contract, idx) in contractListStore.contractList" :key="idx" :contractData="contract" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractListStore } from '@/stores/contract/contractList';
import ContractTableFilterVue from '@/components/contract/table/ContractTableFilter.vue';
import ContractTableRowVue from '@/components/contract/table/ContractTableRow.vue';
import TableHaeder from '@/components/common/table/TableHaeder.vue';

export default {
  name: 'ContractTableVue',
  components: {
    TableHaeder,
    ContractTableFilterVue,
    ContractTableRowVue
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