<template>
  <div class="root-container">
    <div class="top-btn-box">
      <ThemeIconBtnVue title="상품 등록" icon="bi bi-plus-square"/>
      <SearchInputVue title="상품명 검색" :modelValue="itemName"/>
    </div>
    <div class="table-box">
      <div>300</div>
      <div>12341345</div>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import SearchInputVue from '@/components/common/input/SearchInput.vue';

export default {
  name : 'ItemListView',
  components: {
    ThemeIconBtnVue,
    SearchInputVue
  },
  data() {
    return {
      itemName: ""
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
