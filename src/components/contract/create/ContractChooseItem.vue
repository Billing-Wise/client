<template>
  <div class="right-side">
    <div class="right-side-header">
      <ItemSearchVue />
    </div>
    <ItemSelectTableVue />
  </div>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';
import ItemSelectTableVue from '@/components/contract/table/ItemSelectTable.vue'
import ItemSearchVue from '@/components/item/ItemSearch.vue'

export default {
  name: 'ContractChooseItemVue',
  components: {
    ItemSelectTableVue,
    ItemSearchVue,
  },
  computed: {
    ...mapStores(useContractCreateStore),
    item: {
      get() {
        return this.contractCreateStore.item;
      },
      set(value) {
        this.contractCreateStore.item.price = value.price;
        this.contractCreateStore.item.count = value.count;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/contract/choose-box.scss';

.right-side {
  height: 100%;
}
</style>
