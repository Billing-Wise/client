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
import { useContractStore } from '@/stores/consent/non-member/contract';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

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
    ...mapStores(useContractStore, useMobileStore)
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
      const canvas = this.$refs.signatureCanvas;
      const signatureImage = canvas.toDataURL();
      const contractStore = useContractStore();
      contractStore.setSignImage(signatureImage);

      try {
        await contractStore.submitEasyConsent();
        this.$router.push({ name: 'paymentCompletion' });
      } catch (error) {
        console.error('Contract submission failed:', error);
        alert('동의 제출에 실패했습니다. 다시 시도해주세요.');
      }
    }
  },
  mounted() {
    this.setPageName('서명 입력');
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