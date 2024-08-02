<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-main">
          <span class="content-text" v-for="(value, idx) in contractBulkStore.errorList" :key="idx">{{ value }}</span>
        </div>
        <ModalFooterVue title="확인" :func="closeModal"/>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapStores } from 'pinia';
import { useContractBulkStore } from '@/stores/contract/contractBulk';
import ModalFooterVue from '@/components/common/modal/ModalFooter.vue';

export default {
  name: 'ContractBulkErrorModalVue',
  components: {
    ModalFooterVue
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: ' ',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
    }
  },
  computed: {
    ...mapStores(useContractBulkStore),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';
  .modal-main {
    margin-top: 30px;
  }

  .content-text{
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
</style>