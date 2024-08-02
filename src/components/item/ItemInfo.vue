<template>
    <div class="info-container">
      <img :src="itemStore.currentItem.imageUrl" alt="item-image">
      <TitleInfoVue title="상품명" :info="itemStore.currentItem.name"/>
      <TitleInfoVue title="가격" :info="`${itemStore.currentItem.price}원`"/>
      <TitleInfoVue title="생성일" :info="createdAtDate"/>
      <TitleInfoVue title="수정일" :info="updatedAtDate"/>
      <DescriptionInfoVue :infoValue="itemStore.currentItem.description"/>
    </div>
</template>

<script>
import { useItemStore } from '@/stores/item';
import { mapStores } from 'pinia';
import { toDateFromDateTime } from '@/utils/formatter';
import TitleInfoVue from '@/components/common/info/TitleInfo.vue';
import DescriptionInfoVue from '../common/info/DescriptionInfo.vue';

export default {
  name: 'ItemInfoVue',
  components: {
    TitleInfoVue,
    DescriptionInfoVue
  },
  computed: {
    ...mapStores(useItemStore),
    createdAtDate() {
      return toDateFromDateTime(this.itemStore.currentItem.createdAt)
    },
    updatedAtDate() {
      return toDateFromDateTime(this.itemStore.currentItem.updatedAt)
    }
  },
}
</script>

<style lang="scss" scoped>
.info-container {
  @include flex-box(column, center, 20px);
  width: 100%;
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border: $theme-color solid 3px;
    border-radius: 10px;
  }
}
</style>