<template>
  <table class="contract-table">
    <thead>
      <TableHaeder :store="contractListStore" :excludeColumnArr="['itemName']"/>
      <ItemContractTableFilterVue/>
    </thead>
    <tbody>
      <ItemContractTableRowVue v-for="(contract, idx) in contractListStore.contractList" :key="idx" :contractData="contract" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractListStore } from '@/stores/contract/contractList';
import TableHaeder from '../../common/table/TableHaeder.vue';
import ItemContractTableFilterVue from './ItemContractTableFilter.vue';
import ItemContractTableRowVue from './ItemContractTableRow.vue';

export default {
  name: 'ItemContractTableVue',
  components: {
    TableHaeder,
    ItemContractTableFilterVue,
    ItemContractTableRowVue
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