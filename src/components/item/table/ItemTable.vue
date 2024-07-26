<template>
  <table class="item-table">
    <thead>
      <TableHaederVue :store="itemStore"/>
    </thead>
    <tbody>
      <ItemTableRowVue v-for="(value, key) in itemStore.itemList" :key="key" :itemData="value"/>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useItemStore } from '@/stores/item';
import TableHaederVue from '../../common/table/TableHaeder.vue';
import ItemTableRowVue from '../table/ItemTableRow.vue';

export default {
  name: 'ItemTableVue',
  components: {
    TableHaederVue,
    ItemTableRowVue
  },  
  computed: {
    ...mapStores(useItemStore),
  },
  methods: {
    ...mapActions(useItemStore, ['setColumnSort']),
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.item-table {
  @include base-table();
}
</style>