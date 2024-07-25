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
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="update"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import InfoInputVue from '../../common/input/InfoInput.vue';
import TextAreaInputVue from '../../common/input/TextAreaInput.vue';
import { updateMember } from '@/utils/member';
import { mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member';

export default {
  name: 'MemberUpdateModalVue',
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
      title: '회원 수정',
      errorMsg: '',
      name: '',
      email: '',
      phone: '',
      description: '',
    }
  },
  computed: {
    ...mapStores(useMemberStore),
  },
  watch: {
    isVisible(newVal) {
      if (newVal) this.showData();
    },
  },
  methods: {
    // 현재 데이터 표시
    async showData() {
      this.name = this.memberStore.currentMember.name;
      this.email = this.memberStore.currentMember.email;
      this.phone = this.memberStore.currentMember.phone;
      this.description = this.memberStore.currentMember.description;
    },
    // 회원 수정
    async update() {
      const data = {
        'name': this.name,
        'email': this.email,
        'phone': this.phone,
        'description': this.description,
      }

      const result = await updateMember(this.memberStore.currentMember.id, data);
      if (result.code === 200) {
        this.closeModal();
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