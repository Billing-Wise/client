<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">현재 {{ itemStore.currentItem.contractCount }}건의 관련된 계약이 존재합니다.</span>
          <span class="content-text">정말로 삭제하시겠습니까?</span>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="() => deleteItem()"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../common/modal/ModalHeader.vue';
import ModalFooterVue from '../common/modal/ModalFooter.vue';
import { deleteItem } from '@/utils/item';
import { mapStores } from 'pinia';
import { useItemStore } from '@/stores/item';

export default {
  name: 'ItemDeleteModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue,
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '상품 삭제',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
    }
  },
  computed: {
    ...mapStores(useItemStore),
  },
  methods: {
    // 상품 삭제
    async deleteItem() {
      const result = await deleteItem(this.itemStore.currentItem.id);
      if (result.code === 200) {
        this.$router.push({name: 'item'})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';
  .content-text{
    padding: 0px;
    font-weight: bold;
  }
</style>