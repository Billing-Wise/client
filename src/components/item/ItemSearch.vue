<template>
  <SearchInputVue title="상품명 검색" v-model="itemName" :search="getItemList" />
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import SearchInputVue from '../common/input/SearchInput.vue';
import { getItemList } from '@/utils/item';
import { useItemStore } from '@/stores/item';

export default {
  name: 'ItemSearchVue',
  components: {
    SearchInputVue
  },
  data() {
    return {
      itemName: "",
    }
  },
  watch: {
    itemName() {
      this.itemStore.setSearchValue(this.itemName);
    }
  },
  computed: {
    ...mapStores(useItemStore)
  },
  methods: {
    ...mapActions(useItemStore, ['setSearchValue']),
    async getItemList() {
      const result = await getItemList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
  }

}
</script>

<style></style>