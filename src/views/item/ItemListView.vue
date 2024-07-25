<template>
  <div class="root-container">
    <div class="top-btn-box">
      <ThemeIconBtnVue title="상품 등록" icon="bi bi-plus-square" :func="() => operateModal(true)"/>
      <SearchInputVue title="상품명 검색" v-model="itemName" :search="getItemList"/>
    </div>
    <div class="table-box">
      <ItemTableVue/>
      <PaginationBarVue :store="itemStore"/>
    </div>
  </div>
  <ItemCreateModal 
    :isVisible="modalVisible" 
    :closeModal="() => operateModal(false)"/>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import SearchInputVue from '@/components/common/input/SearchInput.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ItemTableVue from '@/components/item/ItemTable.vue';
import ItemCreateModal from '@/components/item/ItemCreateModal.vue';
import { useItemStore } from '@/stores/item';
import { mapActions } from 'pinia';
import { mapStores } from 'pinia';
import { getItemList } from '@/utils/item';

export default {
  name : 'ItemListView',
  components: {
    ThemeIconBtnVue,
    SearchInputVue,
    PaginationBarVue,
    ItemTableVue,
    ItemCreateModal,
  },
  data() {
    return {
      itemName: "",
      modalVisible: false,
    }
  },
  computed: {
    ...mapStores(useItemStore)
  },
  watch: {
    'itemStore.size': 'getItemList',
    'itemStore.page': 'getItemList',
    'itemStore.columns': {
      handler: 'getItemList',
      deep: true
    }
  },
  methods: {
    ...mapActions(useItemStore, ['setPage','setItemList']),
    // 메서드 - 상품 목록 조회
    async getItemList() {
      const result = await getItemList(this.itemName);
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    // 메서드 - 상품 생성 모달창 조작
    operateModal(value) {
      this.modalVisible = value;
    }
  },
  async mounted() {
    this.getItemList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

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
</style>
