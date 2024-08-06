<template>
  <tr class="table-row" @click="toItemDetail">
    <td class="table-column"><span>{{ itemData.id }}</span></td>
    <td class="table-column"><img :src="itemData.imageUrl" alt="item-image" class="item-image"></td>
    <td class="table-column"><span>{{ itemData.name }}</span></td>
    <td class="table-column"><span>{{ currentPrice }}원</span></td>
    <td class="table-column"><span>{{ itemData.contractCount }}건</span></td>
    <td class="table-column"><span>{{ createdAtDate }}</span></td>
    <td class="table-column"><span>{{ updatedAtDate }}</span></td>
  </tr>
</template>

<script>
import { formatNumber, toDateFromDateTime } from '@/utils/formatter';

export default {
  name: 'ItemTableRowVue',
  props: {
    itemData: Object
  },
  computed: {
    currentPrice() {
      return formatNumber(this.itemData.price);
    },
    createdAtDate() {
      return toDateFromDateTime(this.itemData.createdAt)
    },
    updatedAtDate() {
      return toDateFromDateTime(this.itemData.updatedAt)
    }
  },
  methods: {
    toItemDetail() {
      this.$router.push(`/item/${this.itemData.id}`);
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
</style>