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
import { useContractStore } from '@/stores/contract';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

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
    ...mapStores(useContractStore, useMobileStore)
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
          const reader = new FileReader();
          reader.onload = async (e) => {
            const signatureImage = e.target.result;
            this.contractStore.setSignImage(signatureImage);
            await this.contractStore.submitEasyConsent();
            this.$router.push({ name: 'paymentCompletion' });
          };
          reader.readAsDataURL(this.selectedFile);
        } catch (error) {
          console.error('Contract submission failed:', error);
          alert('계약 제출에 실패했습니다. 다시 시도해 주세요.');
        }
      }
    }
  },
  mounted() {
    this.setPageName('서명 업로드');
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
