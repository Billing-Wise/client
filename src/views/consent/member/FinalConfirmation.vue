<template>
  <div class="contract-confirmation">
    <div class="content">
      <p class="instruction">계약 정보를 확인해주세요.</p>
      
      <div v-if="contractInfo && accountInfo">
        <div class="info-section">
          <h3>회원 정보</h3>
          <div class="info-box">
            <p><span>이름</span><span class="value">{{ contractInfo.memberName }}</span></p>
            <p><span>이메일</span><span class="value">{{ contractInfo.memberEmail }}</span></p>
            <p><span>휴대폰번호</span><span class="value">{{ formatPhoneNumber(contractInfo.memberPhone) }}</span></p>
          </div>
        </div>
        
        <div class="info-section">
          <h3>상품</h3>
          <div class="info-box">
            <p><span>이름</span><span class="value">{{ contractInfo.itemName }}</span></p>
          </div>
        </div>
        
        <div class="info-section">
          <h3>총 금액</h3>
          <div class="info-box">
            <p><span>금액</span><span class="value">{{ formatPrice(contractInfo.totalPrice) }} 원</span></p>
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
            <p><span>은행명</span><span class="value">{{ accountInfo.bankName }}</span></p>
            <p><span>계좌번호</span><span class="value">{{ accountInfo.accountNumber }}</span></p>
            <p><span>예금주명</span><span class="value">{{ accountInfo.accountHolder }}</span></p>
          </div>
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
import { useConsentContractInfoStore } from '@/stores/consent/member/consentContractInfo';
import { useConsentAccountInfoStore } from '@/stores/consent/member/consentAccountInfo';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'memberFinalConfirmation',

  components: {
    ThmemBtnVue
  },

  data() {
    return {
      contractInfo: null,
      accountInfo: null
    };
  },

  computed: {
    ...mapStores(useConsentContractInfoStore, useConsentAccountInfoStore, useMobileStore),
    contractId() {
      return this.$route.params.contractId;
    }
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']),

    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
      return phoneNumber;
    },

    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },

    goBack() {
      this.$router.push({ 
        name: 'memberAccountInfo', 
        params: { contractId: this.contractId } 
      });
    },
    
    goNext() {
      this.$router.push({ 
        name: 'memberSignatureInput', 
        params: { contractId: this.contractId }
      });
    },

    checkAndLoadData() {
      this.contractInfo = this.consentContractInfoStore.getInfo(this.contractId);
      this.accountInfo = this.consentAccountInfoStore.getInfo(this.contractId);

      if (!this.contractInfo) {
        this.$router.push({ 
          name: 'memberContractInfoConfirmation', 
          params: { contractId: this.contractId } 
        });
      } else if (!this.accountInfo) {
        this.$router.push({ 
          name: 'memberAccountInfo', 
          params: { contractId: this.contractId } 
        });
      }
    }
  },

  mounted() {
    this.setPageName('최종 확인');
    this.checkAndLoadData();
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