<template>
  <div class="root-container">
    <div class="left-side">
      <ItemInfoVue/>
      <div class="btn-box">
        <SuccessWideBtnVue title="수정" :func="() => operateEditModal(true)"/>
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)"/>
      </div>
    </div>
  </div>
  <ItemUpdateModalVue 
    :isVisible="editModalVisible" 
    :closeModal="() => operateEditModal(false)"/>
  <ItemDeleteModalVue 
    :isVisible="deleteModalVisible" 
    :closeModal="() => operateDeleteModal(false)"/>
</template>

<script>
import { useItemStore } from '@/stores/item';
import { getItem } from '@/utils/item';
import { mapStores } from 'pinia';
import ItemInfoVue from '@/components/item/ItemInfo.vue';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import ItemUpdateModalVue from '@/components/item/ItemUpdateModal.vue';
import ItemDeleteModalVue from '@/components/item/ItemDeleteModal.vue';

export default {
  name: 'ItemDetailView',
  components: {
    ItemInfoVue,
    SuccessWideBtnVue,
    WarningWideBtnVue,
    ItemUpdateModalVue,
    ItemDeleteModalVue
  },
  data() {
    return {
      editModalVisible: false,
      deleteModalVisible: false,
    }
  },
  computed: {
    ...mapStores(useItemStore),
  },
  methods: {
    // 메서드 - 상품 수정 모달창 조작
    operateEditModal(value) {
      this.editModalVisible = value;
    },
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    }
  },
  async mounted() {
    await getItem(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, space-between, 20px);
  background: $back-color;
  width: 100%;
  height:100%;
  padding: 60px 50px
}

.left-side {
  @include flex-box(column, space-between, 0px);
  width: 400px;
  height: 100%;
}

.btn-box {
  @include flex-box(row, center, 60px);
  width: 100%;
}
</style>