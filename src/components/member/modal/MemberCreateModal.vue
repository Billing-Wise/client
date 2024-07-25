<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <InfoInputVue title="회원명" v-model="name"/>
          <InfoInputVue title="이메일" v-model="email"/>
          <InfoInputVue title="전화번호" v-model="phone"/>
          <TextAreaInputVue rows=5 title="특이 사항을 입력하세요." v-model="description"/>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="create"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import InfoInputVue from '../../common/input/InfoInput.vue';
import TextAreaInputVue from '../../common/input/TextAreaInput.vue';
import { createMember } from '@/utils/member';

export default {
  name: 'MemberCreateModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue,
    InfoInputVue,
    TextAreaInputVue,
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '회원 등록',
      errorMsg: '',
      name: '',
      email: '',
      phone: '',
      description: '',
    }
  },
  methods: {
    // 회원 생성
    async create() {
      const data = {
        'name': this.name,
        'email': this.email,
        'phone': this.phone,
        'description': this.description,
      }
      const result = await createMember(data);

      if (result.code === 200) {
        this.closeModal();
        this.$router.push(`/member/${result.data}`);
      } else {
        this.errorMsg = result.message;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';

</style>