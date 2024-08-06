<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal" />
        <div class="right-side-header">
          <MemberSearchVue />
        </div>
        <MemberSelectTableVue />
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import MemberSelectTableVue from '@/components/contract/table/MemberSelectTable.vue'
import MemberSearchVue from '@/components/member/MemberSearch.vue'

export default {
  name: 'MemberSelectModalVue',
  components: {
    ModalHeaderVue,
    MemberSelectTableVue,
    MemberSearchVue,
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '회원 선택',
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