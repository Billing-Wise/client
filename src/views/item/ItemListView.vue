<template>
  <div class="root-container">
    <div class="top-btn-box">
      <ThemeIconBtnVue title="상품 등록" icon="bi bi-plus-square"/>
      <SearchInputVue title="상품명 검색" :modelValue="itemName"/>
    </div>
    <div class="table-box">
      <div>300</div>
      <PaginationBarVue :store="itemStore"/>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import SearchInputVue from '@/components/common/input/SearchInput.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import { useItemStore } from '@/stores/item';
import { mapStores } from 'pinia';

export default {
  name : 'ItemListView',
  components: {
    ThemeIconBtnVue,
    SearchInputVue,
    PaginationBarVue
  },
  data() {
    return {
      itemName: ""
    }
  },
  computed: {
    ...mapStores(useItemStore)
  },
  methods: {
    // 조회 api 함수 - 로직 수정하면 됩니다.
    getData(page, size) {
      console.log(page, size)
    }
  }
}
</script>

<style lang="scss" scoped>
  .root-container {
    @include flex-box(column, space-between, 20px);
    background: $back-color;
    width: 100%;
    height: 100%;
    padding: 30px 40px
  }
  .top-btn-box {
    @include flex-box(row, space-between, 20px);
    width: 100%;
  }
  .table-box {
    @include flex-box(column, space-between, 20px);
    background: white;
    width: 100%;
    flex-grow: 1;
  }
</style>
