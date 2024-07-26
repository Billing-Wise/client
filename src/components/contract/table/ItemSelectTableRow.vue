<template>
  <tr class="table-row" @click="chooseItem">
    <td class="table-column"><span>{{ itemData.id }}</span></td>
    <td class="table-column"><img :src="itemData.imageUrl" alt="item-image" class="item-image"></td>
    <td class="table-column"><span>{{ itemData.name }}</span></td>
    <td class="table-column"><span>{{ itemData.price }}원</span></td>
  </tr>
</template>

<script>
export default {
  name: 'ItemSelectTableRowVue',
  props: {
    itemData: Object
  },
  methods: {
    chooseItem() {
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