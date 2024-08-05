<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue title="비회원 접속 링크" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">{{ link }}</span>
        </div>
        <ModalFooterVue title="닫기" :func="closeModal"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '@/components/common/modal/ModalFooter.vue';
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'NonMemberLinkModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  computed: {
    ...mapStores(useAuthStore),
    link() {
      return `https://billingwise.site/m/consent/non-member/${this.authStore.data.clientId}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';
  .content-text{
    padding: 0px;
    font-weight: bold;
  }
</style>