<template>
  <div class="payment-completion">
    <ErrorContainerVue v-if="!isSuccess" :errorMessage="errorMessage" />
    
    <div v-if="isSuccess && contractInfo && accountInfo" class="success-container">
      <p class="confirmation-message">계약이 완료되었습니다.</p>
      <div class="details">
        <p class="product-name">"{{ contractInfo.itemName }}"</p>
        <p>서비스를 {{ contractInfo.isSubscription ? '정기' : '일회성' }} 구매하셨습니다.</p>
        <p class="amount">
          {{ contractInfo.isSubscription ? `매월 ${contractInfo.contractCycle}일 마다` : '' }}<br />
          {{ formatPrice(contractInfo.totalPrice) }}원의 금액이<br />
          ({{ accountInfo.bankName }}){{ accountInfo.accountNumber }}에서<br />
          청구됩니다.
        </p>
        <p class="thank-you">이용해주셔서 감사합니다.</p>
      </div>
    </div>

    <NextPageButtonVue v-if="!isSuccess" @click="retryContract" :isFixedBottom="isFixedBottom">
      다시 시도
    </NextPageButtonVue>
  </div>
</template>

<script>
import { mapStores, mapActions } from 'pinia';
import { useConsentContractInfoStore } from '@/stores/consent/member/consentContractInfo';
import { useConsentAccountInfoStore } from '@/stores/consent/member/consentAccountInfo';
import { useConsentResultStore } from '@/stores/consent/member/consentResult';
import { useMobileStore } from '@/stores/mobilePage';
import ErrorContainerVue from '@/components/payment/ErrorContainer.vue'
import NextPageButtonVue from '@/components/payment/NextPageButton.vue'

export default {
  name: 'PaymentCompletion',
  components: {
    ErrorContainerVue,
    NextPageButtonVue
  },
  data() {
    return {
      isFixedBottom: false
    }
  },
  computed: {
    ...mapStores(useConsentContractInfoStore, useConsentAccountInfoStore, useMobileStore, useConsentResultStore),
    contractId() {
      return this.$route.params.contractId;
    },
    contractInfo() {
      return this.consentContractInfoStore.getInfo(this.contractId);
    },
    accountInfo() {
      return this.consentAccountInfoStore.getInfo(this.contractId);
    },
    resultInfo() {
      return this.consentResultStore.getInfo(this.contractId);
    },
    isSuccess() {
      return this.resultInfo && this.resultInfo.data && this.resultInfo.data.code === 200;
    },
    errorMessage() {
      if (!this.isSuccess) {
        return this.resultInfo?.data?.message || '계약 처리 중 오류가 발생했습니다.';
      }
      return null;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },
    retryContract() {
      if (this.accountInfo) {
        this.$router.push({ 
          name: 'memberAccountInfo', 
          params: { contractId: this.contractId } 
        });
      } else {
        this.$router.push({ 
          name: 'memberContractInfoConfirmation', 
          params: { contractId: this.contractId } 
        });
      }
    },
    checkPosition() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      this.isFixedBottom = windowHeight >= documentHeight;
    }
  },
  mounted() {
    this.setPageName(this.isSuccess ? '계약 완료' : '계약 실패');
    if (!this.resultInfo) {
      this.$router.push({ 
        name: 'memberContractInfoConfirmation', 
        params: { contractId: this.contractId } 
      });
    }
    this.checkPosition();
    window.addEventListener('resize', this.checkPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkPosition);
  }
}
</script>

<style lang="scss" scoped>
.payment-completion {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .success-container {
    text-align: center;
    width: 100%;

    .confirmation-message {
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }

    .details {
      background-color: white;
      border: 1px solid #8a70d6;
      border-radius: 10px;
      padding: 20px;
      margin-top: 20px;

      .product-name {
        font-weight: bold;
        margin-bottom: 10px;
      }

      .amount {
        margin: 10px 0;
      }

      .thank-you {
        margin-top: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>