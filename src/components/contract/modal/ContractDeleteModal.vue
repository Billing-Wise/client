<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">진행 중인 계약입니다.</span>
          <span class="content-text">정말로 삭제하시겠습니까?</span>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="deleteContract"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import { deleteContract } from '@/utils/contract';

export default {
  name: 'ContractDeleteModalVue',
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
      title: '계약 삭제',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
    }
  },
  methods: {
    // 상품 삭제
    async deleteContract() {
      const result = await deleteContract(this.$route.params.id);
      if (result.code === 200) {
        this.$router.push({name: 'contract'})
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