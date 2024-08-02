<template>
  <table class="contract-table">
    <thead>
      <TableHaeder :store="contractListStore" :excludeColumnArr="['memberName']"/>
      <MemberContractTableFilterVue/>
    </thead>
    <tbody>
      <MemberContractTableRowVue v-for="(contract, idx) in contractListStore.contractList" :key="idx" :contractData="contract" />
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractListStore } from '@/stores/contract/contractList';
import TableHaeder from '../../common/table/TableHaeder.vue';
import MemberContractTableFilterVue from './MemberContractTableFilter.vue';
import MemberContractTableRowVue from './MemberContractTableRow.vue';

export default {
  name: 'MemberContractTableVue',
  components: {
    TableHaeder,
    MemberContractTableFilterVue,
    MemberContractTableRowVue
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