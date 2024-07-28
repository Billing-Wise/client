<template>
  <div class="table-box">
    <table class="item-table">
      <thead>
        <TableHaederVue :store="itemStore" :excludeColumnArr="['contractCount', 'createdAt', 'updatedAt']" />
      </thead>
      <tbody>
        <ItemSelectTableRowVue v-for="(value, key) in itemStore.itemList" :key="key" :itemData="value" />
      </tbody>
    </table>
    <PaginationBarVue :store="itemStore" />
  </div>
</template>

<script>
import TableHaederVue from '@/components/common/table/TableHaeder.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import { mapActions, mapStores } from 'pinia';
import { useItemStore } from '@/stores/item';
import { getItemList } from '@/utils/item';
import ItemSelectTableRowVue from './ItemSelectTableRow.vue';


export default {
  name: 'ItemSelectTableVue',
  components: {
    TableHaederVue,
    PaginationBarVue,
    ItemSelectTableRowVue
  },
  computed: {
    ...mapStores(useItemStore),
  },
  methods: {
    ...mapActions(useItemStore, ['setColumnSort']),
    async getItemList() {
      await getItemList();
    },
    setupWatchers() {
      this.$watch('itemStore.size', this.getItemList);
      this.$watch('itemStore.page', this.getItemList);
      this.$watch('itemStore.columns', this.getItemList, { deep: true });
    }
  },
  async mounted() {
    this.itemStore.$reset();
    await this.getItemList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.item-table {
  @include base-table();
}
</style>