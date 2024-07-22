<template>
  <tr class="item-row"> 
    <td class="item-column"><span>{{ itemData.id }}</span></td>
    <td class="item-column"><img :src="itemData.imageUrl" alt="item-image" class="item-image"></td>
    <td class="item-column"><span>{{ itemData.name }}</span></td>
    <td class="item-column"><span>{{ itemData.price }}원</span></td>
    <td class="item-column"><span>{{ itemData.contractCount }}건</span></td>
    <td class="item-column"><span>{{ createdAtDate }}</span></td>
    <td class="item-column"><span>{{ updatedAtDate }}</span></td>
  </tr>
</template>

<script>
import { toDateFromDateTime } from '@/utils/date';

export default {
  name: 'ItemTableRowVue',
  props: {
    itemData: Object
  },
  computed: {
    createdAtDate() {
      return toDateFromDateTime(this.itemData.createdAt)
    },
    updatedAtDate() {
      return toDateFromDateTime(this.itemData.updatedAt)
    }
  },
}
</script>

<style lang="scss" scoped>
  .item-row {
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background-color: $back-color;
      opacity: 0.5;
    }
  }

  .item-column {
    font-weight: bold;
    padding: 10px 20px;
  }

  .item-image {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
</style>