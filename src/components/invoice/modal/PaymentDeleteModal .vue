<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">결제 취소를 진행하시겠습니까?</span>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="deletePayment"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import { deletePayment } from '@/utils/payement';

export default {
  name: 'PaymentDeleteModalVue',
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
      title: '결제 취소',
      errorMsg: '',
    }
  },
  methods: {
    async deletePayment() {
      const result = await deletePayment(this.$route.params.id);
      if (result.code === 200) {
        this.$router.go(this.$router.currentRoute);
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