<template>
  <div class="root-container">
    <div class="top-btn-box">
      <ThemeIconBtnVue title="상품 등록" icon="bi bi-plus-square"/>
      <SearchInputVue title="상품명 검색" v-model="itemName" :search="getData"/>
    </div>
    <div class="table-box">
      <ItemTableVue/>
      <PaginationBarVue :store="itemStore"/>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import SearchInputVue from '@/components/common/input/SearchInput.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ItemTableVue from '@/components/item/ItemTable.vue';
import { useItemStore } from '@/stores/item';
import { mainAxios } from '@/utils/axios';
import { mapActions } from 'pinia';
import { mapStores } from 'pinia';

export default {
  name : 'ItemListView',
  components: {
    ThemeIconBtnVue,
    SearchInputVue,
    PaginationBarVue,
    ItemTableVue,
  },
  data() {
    return {
      itemName: ""
    }
  },
  computed: {
    ...mapStores(useItemStore)
  },
  watch: {
    'itemStore.size': 'getData',
    'itemStore.page': 'getData',
    'itemStore.columns': {
      handler: 'getData',
      deep: true
    }
  },
  methods: {
    ...mapActions(useItemStore, ['setPage','setItemList']),
    // 조회 api 함수 - 로직 수정하면 됩니다.
    async getData() {
      let url = `items?page=${this.itemStore.page}&size=${this.itemStore.size}&name=${this.itemName}`;
      this.itemStore.columns.forEach(column => {
        if (column.sort != null) url += `&sort=${column.data},${column.sort}`
      });
      const result = await mainAxios.get(url);
      this.itemStore.setMaxPage(result.data.totalPages - 1);
      this.itemStore.setItemList(result.data.content);
    },
  },
  async mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
  .root-container {
    @include flex-box(column, space-between, 20px);
    background: $back-color;
    width: 100%;
    min-height:100%;
    height: 100%;
    padding: 30px 40px
  }
  .top-btn-box {
    @include flex-box(row, space-between, 20px);
    width: 100%;
  }
  .table-box {
    @include flex-box(column, space-between, 20px);
    box-shadow: $base-shadow;
    background: white;
    width: 100%;
    padding: 20px 30px;
    border-radius: 5px;
    flex-grow: 1;
  }
</style>
