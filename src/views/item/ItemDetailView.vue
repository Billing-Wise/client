<template>
  <div class="root-container">
    <div class="left-side">
      <ItemInfoVue />
      <div class="btn-box">
        <SuccessWideBtnVue title="수정" :func="() => operateEditModal(true)" />
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)" />
      </div>
    </div>
    <div class="right-side">
      <div class="right-header">
        <span class="contract-count">총 {{ itemStore.currentItem.contractCount }}건</span>
        <span class="contract-title">현재 상품 관련 계약</span>
        <ThemeIconBtnVue title="계약 등록" icon="bi bi-plus-square" :func="routContractCreate"/>
      </div>
      <div class="table-box">
        <ItemContractTableVue />
        <PaginationBarVue :store="contractListStore" />
      </div>
    </div>
  </div>
  <ItemUpdateModalVue :isVisible="editModalVisible" :closeModal="() => operateEditModal(false)" />
  <ItemDeleteModalVue :isVisible="deleteModalVisible" :closeModal="() => operateDeleteModal(false)" />
</template>

<script>
import { useItemStore } from '@/stores/item';
import { getItem } from '@/utils/item';
import { mapActions, mapStores } from 'pinia';
import { useContractListStore } from '@/stores/contract/contractList';
import { getContractList } from '@/utils/contract';
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import ItemInfoVue from '@/components/item/ItemInfo.vue';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import ItemUpdateModalVue from '@/components/item/modal/ItemUpdateModal.vue';
import ItemDeleteModalVue from '@/components/item/modal/ItemDeleteModal.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ItemContractTableVue from '@/components/item/table/ItemContractTable.vue';
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';

export default {
  name: 'ItemDetailView',
  components: {
    ItemInfoVue,
    SuccessWideBtnVue,
    WarningWideBtnVue,
    ItemUpdateModalVue,
    ItemDeleteModalVue,
    PaginationBarVue,
    ItemContractTableVue,
    ThemeIconBtnVue
  },
  data() {
    return {
      editModalVisible: false,
      deleteModalVisible: false,
    }
  },
  computed: {
    ...mapStores(useItemStore),
    ...mapStores(useContractListStore),
    ...mapStores(useContractCreateStore),
  },
  methods: {
    ...mapActions(useContractListStore, ['setFilter']),
    operateEditModal(value) {
      this.editModalVisible = value;
    },
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    routContractCreate() {
      this.contractCreateStore.$reset();
      this.contractCreateStore.setDataPassed(true);
      this.contractCreateStore.setItem(this.itemStore.currentItem);
      this.$router.push({name: 'contractCreate'})
    },
    async getContractList() {
      this.contractListStore.setFilter('itemId', this.$route.params.id);
      const result = await getContractList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    setupWatchers() {
      this.$watch('contractListStore.size', this.getContractList);
      this.$watch('contractListStore.page', this.getContractList);
      this.$watch('contractListStore.columns', this.getContractList, { deep: true });
      this.contractListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getContractList);
        }
      });
    }
  },
  async mounted() {
    const result1 = await getItem(this.$route.params.id);
    if (result1.code !== 200 && result1.code !== 400) {
      return;
    }

    this.contractListStore.$reset();

    await this.getContractList();


    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";
$root-margin: 20px;

.root-container {
  @include flex-box(row, center, 60px);
  @include root-container;
  height: 100%;
  width: fit-content;
  padding: $root-margin 50px
}

.left-side {
  @include flex-box(column, space-between, 30px);
  width: 330px;
  min-height: 100%;
  height: auto;
  margin: $root-margin 0;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.right-side {
  @include flex-box(column, space-between, 20px);
  position: relative;
  width: 1400px;
  height: 100%;

  .right-header {
    @include flex-box(row, space-between, 20px);
    width: 100%;
    padding: 0px 20px;

    .contract-count {
      font-size: 20px;
      font-weight: bold;
    }

    .contract-title {
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>