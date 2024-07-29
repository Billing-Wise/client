<template>
  <div class="draw-signature">
    <div class="content">
      <p class="instruction">화면에 직접 서명을 입력하세요.</p>
      <div class="example-signature">
        <p>아래와 같은 서명을 그리고 제출합니다.</p>
        <img src="@/assets/images/sign0.gif" alt="서명 예시" class="signature-gif">
      </div>
      <p class="hint">아래에 직접 서명을 입력하세요.</p>
      <div class="signature-area">
        <canvas ref="signatureCanvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing" @touchstart="startDrawing" @touchmove="draw" @touchend="stopDrawing"></canvas>
      </div>
      <button class="clear-button" @click="clearCanvas">지우기</button>

      <footer>
        <ThmemBtnVue class="submit-button" title="계약 완료" @click="submitSignature" :disabled="!isSigned"/>
      </footer>
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
  name: 'DrawSignature',
  components: { ThmemBtnVue },
  data() {
    return {
      isDrawing: false,
      isSigned: false,
      context: null
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
    startDrawing(event) {
      event.preventDefault();
      this.isDrawing = true;
      this.draw(event);
    },
    draw(event) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.signatureCanvas;
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX || event.touches[0].clientX) - rect.left;
      const y = (event.clientY || event.touches[0].clientY) - rect.top;
      this.context.lineTo(x, y);
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.isSigned = true;
    },
    stopDrawing() {
      this.isDrawing = false;
      this.context.beginPath();
    },
    clearCanvas() {
      const canvas = this.$refs.signatureCanvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.isSigned = false;
    },
    async submitSignature() {
      if (this.isSigned) {
        try {
          const contractInfo = this.consentContractInfoStore.getInfo(this.contractId);
          const accountInfo = this.consentAccountInfoStore.getInfo(this.contractId);

          if (!contractInfo || !accountInfo) {
            throw new Error('계약 정보 또는 계좌 정보가 없습니다.');
          }

          const canvas = this.$refs.signatureCanvas;
          const signatureImage = canvas.toDataURL('image/png');
          
          const formData = new FormData();
          formData.append('signImage', this.dataURLtoFile(signatureImage, 'signature.png'));
          
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
          // 에러 발생 시 error.response를 그대로 저장
          this.consentResultStore.setInfo(this.contractId, error.response || {
            data: {
              code: 500,
              message: error.message || '내부 서버 오류입니다'
            }
          });
        } finally {
          // 성공이든 실패든 결과 페이지로 이동
          this.$router.push({ name: 'memberPaymentCompletion', params: { contractId: this.contractId } });
        }
      }
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
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
    this.setPageName('서명 입력');
    this.checkAndLoadData();
    const canvas = this.$refs.signatureCanvas;
    this.context = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 150; 
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000000';
  }
}
</script>

<style lang="scss" scoped>
.draw-signature {
  @include flex-box(column, space-between, 0px);
  min-height: 90vh;
  background-color: #f5f5f5;

  header {
    background-color: #8a70d6;
    padding: 20px 0;
    text-align: center;
    color: white;

    h1 { font-size: 24px; margin: 0; }
    h2 { font-size: 18px; margin: 5px 0 0; }
  }

  .content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .instruction {
      text-align: center;
      margin-top: 60px;
      font-size:20px;
      margin: 50px 0;
    }

    .hint{
      text-align: center;
      margin: 20px 0;
    }

    .example-signature {
      text-align: center;
      margin: 20px 0;

      p { margin-bottom: 10px; }

      .signature-gif {
        width: 100%;
        max-width: 300px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
    }

    .signature-area {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;

      canvas {
        width: 100%;
        height: 150px;
      }
    }
  }

  .clear-button {
      align-self: center;
      padding: 10px 20px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 20px;
  }

  footer {
    @include flex-box(column, flex-start, 20px);
    padding: 20px;
    .submit-button {
      width: 70%;
      height: 40px;
      background-color: $theme-color;
      color: white;
      border: none;
      padding: 15px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>