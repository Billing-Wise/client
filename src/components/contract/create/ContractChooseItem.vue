<template>
  <div class="right-side">
    <div class="right-side-header">
      <ItemSearchVue />
      <div class="input-box">
        <InfoInputVue title="가격" type="number" v-model="item.price"/>
        <InfoInputVue title="수량" type="number" v-model="item.count"/>
      </div>
    </div>
    <ItemSelectTableVue />
  </div>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import ItemSelectTableVue from '@/components/contract/table/ItemSelectTable.vue'
import ItemSearchVue from '@/components/item/ItemSearch.vue'
import InfoInputVue from '@/components/common/input/InfoInput.vue'
import { mapStores } from 'pinia';

export default {
  name: 'ContractChooseItemVue',
  components: {
    ItemSelectTableVue,
    ItemSearchVue,
    InfoInputVue,
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
