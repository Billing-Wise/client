<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal" />
        <div class="right-side-header">
          <ItemSearchVue />
        </div>
        <ItemSelectTableVue />
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ItemSelectTableVue from '@/components/contract/table/ItemSelectTable.vue'
import ItemSearchVue from '@/components/item/ItemSearch.vue'

export default {
  name: 'InvoiceCreateModalVue',
  components: {
    ModalHeaderVue,

    ItemSelectTableVue,
    ItemSearchVue,
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '상품 선택',
      errorMsg: '',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';

.modal-content {
  width: 800px;
}

.modal-content {
  padding-bottom: 30px;
}
</style>