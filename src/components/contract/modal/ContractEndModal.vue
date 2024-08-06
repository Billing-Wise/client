<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">진행 중인 계약입니다.</span>
          <span class="content-text">정말로 종료하시겠습니까?</span>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="endContractStatus"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import { editContractStatus } from '@/utils/contract';

export default {
  name: 'ContractEndModalVue',
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
      title: '계약 종료',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
    }
  },
  methods: {
    // 계약 상태 종료
    async endContractStatus() {
      const result = await editContractStatus(this.$route.params.id, 3);
      if (result.code === 200) {
        this.closeModal();
      }
    }
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