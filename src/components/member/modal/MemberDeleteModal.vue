<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <span class="content-text">현재 {{ memberStore.currentMember.contractCount }}건의 관련된 계약이 존재합니다.</span>
          <span class="content-text">정말로 삭제하시겠습니까?</span>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="() => deleteMember()"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import { mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member/member';
import { deleteMember } from '@/utils/member';

export default {
  name: 'MemberDeleteModalVue',
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
      title: '회원 삭제',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
    }
  },
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    async deleteMember() {
      const result = await deleteMember(this.memberStore.currentMember.id);
      if (result.code === 200) {
        this.$router.push({name: 'member'})
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