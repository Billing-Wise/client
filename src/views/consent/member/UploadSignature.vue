<template>
  <div class="upload-signature">
    <p class="instruction">서명 이미지를 업로드해주세요.</p>
    <div class="signature-area">
      <p>아래 같은 사인 이미지를 업로드 해주세요.</p>
      <p><예시></p>
      <div class="signature-examples">
        <img src="@/assets/images/sign.png" alt="Signature Example">
        <img src="@/assets/images/도장.png" alt="Stamp Example">
      </div>
    </div>
    <div class="upload-button">
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-folder"></i> {{ selectedFile ? selectedFile.name : '파일을 업로드 해주세요.' }}
      </label>
      <input id="file-upload" type="file" @change="handleFileUpload" accept="image/*" />
      <img v-if="previewUrl" :src="previewUrl" alt="Uploaded Signature Preview" class="signature-preview" />
      <ThmemBtnVue class="submit-button" title="계약 완료" @click="submitSignature" :disabled="!selectedFile"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useConsentContractInfoStore } from '@/stores/consent/member/consentContractInfo';
import { useConsentAccountInfoStore } from '@/stores/consent/member/consentAccountInfo';
import { useConsentResultStore } from '@/stores/consent/member/consentResult';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';
import { memberAxios } from '@/utils/axios';

export default {
  name: 'UploadSignature',
  components: { ThmemBtnVue },
  data() {
    return {
      selectedFile: null,
      previewUrl: null
    };
  },
  computed: {
    ...mapStores(useConsentContractInfoStore, useConsentAccountInfoStore, useMobileStore, useConsentResultStore),
    contractId() {
      return this.$route.params.contractId;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.createPreview();
      } else {
        this.previewUrl = null;
      }
    },
    createPreview() {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
    async submitSignature() {
      if (this.selectedFile) {
        try {
          const contractInfo = this.consentContractInfoStore.getInfo(this.contractId);
          const accountInfo = this.consentAccountInfoStore.getInfo(this.contractId);

          if (!contractInfo || !accountInfo) {
            throw new Error('계약 정보 또는 계좌 정보가 없습니다.');
          }

          const formData = new FormData();
          formData.append('signImage', this.selectedFile);
          
          const data = {
            owner: accountInfo.accountHolder,
            bank: accountInfo.bankName,
            number: accountInfo.accountNumber
          };
          formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

          const response = await memberAxios.post(`/easy-consent/member?contractId=${this.contractId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          this.consentResultStore.setInfo(this.contractId, response);
        } catch (error) {
          console.error('Contract submission failed:', error);
          this.consentResultStore.setInfo(this.contractId, error.response || {
            data: {
              code: 500,
              message: error.message || '내부 서버 오류입니다'
            }
          });
        } finally {
          this.$router.push({ name: 'memberPaymentCompletion', params: { contractId: this.contractId } });
        }
      }
    },
    checkAndLoadData() {
      const contractInfo = this.consentContractInfoStore.getInfo(this.contractId);
      const accountInfo = this.consentAccountInfoStore.getInfo(this.contractId);

      if (!contractInfo) {
        this.$router.push({ 
          name: 'memberContractInfoConfirmation', 
          params: { contractId: this.contractId } 
        });
      } else if (!accountInfo) {
        this.$router.push({ 
          name: 'memberAccountInfo', 
          params: { contractId: this.contractId } 
        });
      }
    }
  },
  mounted() {
    this.setPageName('서명 업로드');
    this.checkAndLoadData();
  }
}
</script>

<style lang="scss" scoped>
.upload-signature {
  @include flex-box(column, space-between, 10px);
  height: 100%;
  align-items: center;
  background-color: white;
  padding: 20px;

  h1 {
    font-size: 24px;
    color: white;
    background-color: #8a70d6;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    margin: 0;
  }

  h2 {
    font-size: 20px;
    color: #8a70d6;
    margin-top: 20px;
  }

  .instruction {
    font-size: 20px;
    text-align: center;
    margin: 50px 0;
    font-weight: bold;
  }

  .signature-area {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 90%;
    margin-bottom: 40px;
    font-weight: bold;
    text-align: center;

    p {
      font-size: 15px;
      color: #666;
      margin-bottom: 10px;
    }

    .signature-examples {
      display: flex;
      justify-content: space-around;
      border: 1px solid #8a70d6;
      border-radius: 10px;

      img {
        width: 150px;
        height: 100px;
        object-fit: contain;
      }
    }
  }

  .upload-button {
    width: 90%;
    margin-bottom: 20px;
    @include flex-box(column, flex-start, 20px);
    padding: 10px;

    .custom-file-upload {
      border: 1px solid $theme-color;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      background-color: white;
      color: $theme-color;
      border-radius: 5px;
      width: 100%;
      text-align: center;
    }

    input[type="file"] {
      display: none;
    }

    .file-name {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  }

  .signature-preview {
      max-width: 100%;
      max-height: 200px;
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

  .submit-button {
    width: 70%;
    height: 40px;
  }
}
</style>