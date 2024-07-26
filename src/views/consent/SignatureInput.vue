<template>
  <div class="signature-input">
    <p>이미지를 업로드 또는 직접 입력 중 선택하세요.</p>
    <br>
    <div class="signature-options">
      <div class="upload-option">
        <div class="title">
          <h3>[ 방법 1 ]</h3>
        </div>
        <p>아래와 같은 양식의 사인 이미지를 업로드 하는 방식입니다.</p>
        
        <div class="signature-images">
          <img src="@/assets/images/sign.png" alt="Signature Example 1">
          <img src="@/assets/images/도장.png" alt="Signature Example 1">
        </div>
        <div class="button-container">
          <ThmemBtnVue class="click" title="선택" @click="selectUploadOption"/>
        </div>
      </div>
      <div class="draw-option">
        <div class="title">
          <h3>[ 방법 2 ]</h3>
        </div>
        <p>화면에 직접 서명을 입력하고 제출하는 방식입니다.</p>
        <img class="gif" src="@/assets/images/sign0.gif" width="500" height="250">
        <div class="button-container">
          <ThmemBtnVue class="click" title="선택" @click="selectUploadOption"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractStore } from '@/stores/contract';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'SignatureInput',
  components: {
    ThmemBtnVue
  },
  data() {
    return {
      isDrawing: false,  
      context: null      
    };
  },
  computed: {
    ...mapStores(useContractStore, useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
  },
  mounted() {
    this.setPageName('서명 입력');
  }
}
</script>

<style lang="scss" scoped>
.signature-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  min-height: 90vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background-color: #8a4baf;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    margin: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  h2 {
    font-size: 20px;
    margin-top: 10px;
    color: #8a4baf;
  }

  p {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
  }

  .signature-options {
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
    width: 100%;
      .title {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: 10px;
        h3 {
          font-size: 14px;
          color: $base-shadow;
          margin: 0;
        }
      }
    
     .upload-option{
      background: white;
      width: 100%;
      padding: 10px;
      text-align: center;
      margin-bottom: 15px;
     }

     .draw-option {
      background: white;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      
      }

      h3 {
        font-size: 18px;
        color: #8a4baf;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }

      .signature-images {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2px;
        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border: 0px solid #ccc;
          border-radius: 5px;
          margin: 10px;
        }
      }

      .gif {
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        height: 150px;
      }

      .button-container {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        padding: 0px;
       

      }
    }
  }

  .click{
    font-size: 14px;
  }

</style>