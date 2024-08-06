<template>
  <tr :class="{'table-row': true, 'choosed-row':isChoosed}" @click="chooseItem">
    <td class="table-column"><span>{{ itemData.id }}</span></td>
    <td class="table-column"><img :src="itemData.imageUrl" alt="item-image" class="item-image"></td>
    <td class="table-column"><span>{{ itemData.name }}</span></td>
    <td class="table-column"><span>{{ currentPrice }}원</span></td>
  </tr>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { formatNumber } from '@/utils/formatter';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'ItemSelectTableRowVue',
  props: {
    itemData: Object
  },
  computed: {
    ...mapStores(useContractCreateStore),
    currentPrice() {
      return formatNumber(this.itemData.price)
    },
    isChoosed() {
      return this.itemData.id === this.contractCreateStore.item.id;
    }
  },
  methods: {
    ...mapActions(useContractCreateStore, ['setItem']),
    chooseItem() {
      this.contractCreateStore.setItem(this.itemData);  
      this.contractCreateStore.setSelectingItem(false);

    }
  } 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: contain;
}

.choosed-row {
  background-color: $back-color;
}
</style>