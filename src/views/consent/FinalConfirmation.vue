<template>
  <div class="contract-confirmation">
   
    
    <div class="content">
      <p class="instruction">계약 정보를 확인해주세요.</p>
      
      <div class="info-section">
        <h3>회원 정보</h3>
        <div class="info-box">
          <p><span>이름</span><span class="value">{{ memberInfo.name }}</span></p>
          <p><span>이메일</span><span class="value">{{ memberInfo.email }}</span></p>
          <p><span>휴대폰번호</span><span class="value">{{ memberInfo.phone }}</span></p>
        </div>
      </div>
      
      <div class="info-section">
        <h3>상품</h3>
        <div class="info-box">
          <p><span>이름</span><span class="value">{{ productInfo.name }}</span></p>
        </div>
      </div>
      
      <div class="info-section">
        <h3>총 금액</h3>
        <div class="info-box">
          <p><span>금액</span><span class="value">{{ paymentInfo.totalAmount }} 원</span></p>
        </div>
      </div>
      
      <div class="info-section">
        <h3>결제일</h3>
        <div class="info-box">
          <p><span>날짜</span> <span class="value">매월 {{ contractInfo.contractCycle }} 일</span></p>
        </div>
      </div>
      
      <div class="info-section">
        <h3>은행</h3>
        <div class="info-box">
          <p><span>은행명</span><span class="value">{{ paymentInfo.accountBank }}</span></p>
          <p><span>계좌번호</span><span class="value">{{ paymentInfo.accountNumber }}</span></p>
          <p><span>예금주명</span><span class="value">{{ paymentInfo.accountOwner }}</span></p>
        </div>
      </div>
    </div>
    
    <div class="button-container">
      <ThmemBtnVue title="이전" :func="goBack" />
      <ThmemBtnVue title="다음" :func="goNext" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractStore } from '@/stores/contract';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'finalConfirmation',

  components: {
    ThmemBtnVue
  },

  computed: {
    ...mapStores(useContractStore, useMobileStore),
    memberInfo() {
      return this.contractStore.memberInfo;
    },
    productInfo() {
      return this.contractStore.productInfo;
    },
    paymentInfo() {
      return this.contractStore.paymentInfo;
    },
    contractInfo() {
      return this.contractStore.contractInfo;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),

    goBack() {
      this.$router.push({ name: 'accountInfo' });
    },
    goNext() {
      this.$router.push({ name: 'signatureInput' });
    },
  },
  mounted() {
      this.setPageName('최종 확인');
  }
}
</script>

<style lang="scss" scoped>
.contract-confirmation {
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 90vh;
  justify-content: space-between;

  .header {
    background-color: #8a70d6;
    color: white;
    padding: 20px;
    position: relative;

    .battery-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 25px;
      height: 12px;
      border: 2px solid white;
      border-radius: 3px;
      
      &::before {
        content: '';
        position: absolute;
        right: -5px;
        top: 3px;
        width: 3px;
        height: 6px;
        background-color: white;
        border-radius: 0 2px 2px 0;
      }
    }

    .title {
      font-size: 24px;
      margin-bottom: 5px;
    }

    .subtitle {
      font-size: 18px;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 0px 20px 20px;

    .instruction {
      padding: 50px 20px;
      border-radius: 5px;
      text-align: center;
      height: 15%;
      width: 100%;
      text-decoration: underline;
      text-underline-offset: 5px;
      font-size: large;
      font-weight: bold;
      margin: 10px auto;
      margin-bottom: 0px;
  }
    .info-section {
      margin-bottom: 15px;

      h3 {
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 16px;
      }

      .info-box {
        background-color: white;
        border-radius: 5px;
        padding: 6px;
        border: 1px solid #ddd;

         p {
           display: grid;
           grid-template-columns: 40% 60%;
           align-items: center;
           margin: 5px 0;
           font-size: 14px;
           font-weight: 550;
           padding: 0px 20px;

           span:first-child {
              color: #666;
          }
            .value {
               justify-self: start; 
      }  
    }
  }
}
}

  .button-container {
    display: flex;
    justify-content: space-between;
    padding: 20px;

     
    ::v-deep .btn {
      width: 48%;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      color: white;
      font-weight: bold;

      &-previous {
        background-color: #8a70d6;
      }

      &-next {
        background-color: #8a70d6;
      }
    }
  }
}
</style>