<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal" />
        <div class="modal-main">
          <div class="img-box" @click="triggerFileInput">
            <span v-if="!imgSrc">이미지 업로드</span>
            <img v-else :src="imgSrc" alt="Uploaded Image" />
          </div>
          <input type="file" ref="fileInput" @change="onImageChange" accept="image/*" style="display: none;" />
          <span class="file-guide">※ 동의 서명 이미지 파일을 등록해주세요</span>
          <InfoInputVue title="계좌 소유주" v-model="owner" />
          <TitleUpSelectVue 
            title="은행"
            :selectedIdx="bankIdx"
            :keywordArr="bankList"
            :choiceFunc="selectBank"
          />
          <InfoInputVue title="계좌 번호" v-model="number" />
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="createConsent" />
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '@/components/common/modal/ModalHeader.vue';
import ModalFooterVue from '@/components/common/modal/ModalFooter.vue';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import TitleUpSelectVue from '@/components/common/select/TitleUpSelect.vue';
import { editConsent, editConsentImage } from '@/utils/consent';
import { mapStores } from 'pinia';
import { useContractDetailStore } from '@/stores/contract/contractDetail';
import { useConsentDetailStore } from '@/stores/contract/consentDetail';

export default {
  name: 'ConsentUpdateModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue,
    InfoInputVue,
    TitleUpSelectVue
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '동의서 수정',
      errorMsg: '',
      owner: '',
      bank: '',
      number: '',
      imgFile: null,
      imgSrc: null,
      bankIdx: 0,
      bankList: [
        { value: 'KB', name: '국민은행' },
        { value: 'SH', name: '신한은행' },
        { value: 'WR', name: '우리은행' },
        { value: 'HN', name: '하나은행' },
        { value: 'NH', name: '농협은행' },
        { value: 'IBK', name: '기업은행' },
      ]
    }
  },
  computed: {
    ...mapStores(useContractDetailStore),
    ...mapStores(useConsentDetailStore)
  },
  watch: {
    isVisible(newVal) {
      if (newVal) this.showData();
    },
  },
  methods: {
    // 현재 데이터 표시
    async showData() {
      this.owner = this.consentDetailStore.data.owner;
      this.bank = this.consentDetailStore.data.bank;
      this.bankIdx = this.bankList.findIndex((bank) => bank.name === this.consentDetailStore.data.bank);
      if (this.bankIdx === -1) {
        this.bankIdx = 0
      };
      this.number = this.consentDetailStore.data.number;
      this.imgSrc = this.consentDetailStore.data.signUrl;
    },
    // 은행 선택
    selectBank(idx) {
      this.bankIdx = idx;
    },
    // 이미지 업로드
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    // 이미지 등록
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imgFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }

    },
    // 동의서 등록
    async createConsent() {
      let isSuccess = true;

      const data = {
        owner: this.owner,
        bank: this.bankList[this.bankIdx].name,
        number: this.number,
      };

      let result = await editConsent(this.contractDetailStore.data.member.id, data);
      if (result.code !== 200) {
        this.errorMsg = result.message;
        isSuccess = false;
      }

      if (this.imgFile !== null) {
        result = await editConsentImage(this.contractDetailStore.data.member.id, this.imgFile);
        if (result.code !== 200) {
          this.errorMsg = result.message;
          isSuccess = false;
        }
      }

      if (isSuccess) {
        this.closeModal();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';

.file-guide {
  color: $input-color;
  font-weight: bold;
}

.img-box {
  @include flex-box(row, center, 0px);
  @include base-icon;
  width: 250px;
  height: 250px;
  border: $theme-color solid 3px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>