<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>{{ isPaymentSuccessful ? '결제가 완료되었습니다.' : '결제가 실패하였습니다.' }}</DescriptionBoxVue>
    <ErrorContainerVue v-if="errorMessage" :errorMessage="errorMessage" />

    <div v-if="isPaymentSuccessful" class="success-container">
      <img src="@/assets/images/success.png" alt="결제 성공" class="success-icon">
      <p class="success-message">결제가 완료되었습니다.</p>
    </div>

    <NextPageButtonVue 
      v-if="!isPaymentSuccessful" 
      @click="retryPayment"
      :isFixedBottom="isFixedBottom"
    >
      다시 시도
    </NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { usePaymentResultStore } from '@/stores/paymentResult';
import { useAccountInfoStore } from '@/stores/accountInfo';
import { useCardInfoStore } from '@/stores/cardInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import ErrorContainerVue from '@/components/payment/ErrorContainer.vue'
import NextPageButtonVue from '@/components/payment/NextPageButton.vue'

export default {
  name: 'PaymentResultView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    ErrorContainerVue,
    NextPageButtonVue,
  },
  data() {
    return {
      isFixedBottom: false
    }
  },
  computed: {
    ...mapStores(useMobileStore, usePaymentResultStore, useAccountInfoStore, useCardInfoStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentResult() {
      return this.paymentResultStore.getResult(this.invoiceId);
    },
    isPaymentSuccessful() {
      return this.paymentResult?.data?.code === 200;
    },
    errorMessage() {
      if (!this.isPaymentSuccessful) {
        return this.paymentResult?.data?.message || '결제 처리 중 오류가 발생했습니다.';
      }
      return null;
    },
    accountInfo() {
      return this.accountInfoStore.getInfo(this.invoiceId);
    },
    cardInfo() {
      return this.cardInfoStore.getInfo(this.invoiceId);
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    retryPayment() {
      if (this.accountInfo) {
        this.$router.push({
          name: 'accountInput',
          params: { invoiceId: this.invoiceId }
        });
      } else if (this.cardInfo) {
        this.$router.push({
          name: 'cardInput',
          params: { invoiceId: this.invoiceId }
        });
      } else {
        this.$router.push({
          name: 'paymentInfo',
          params: { invoiceId: this.invoiceId }
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
    this.mobilePageStore.setPageName(this.isPaymentSuccessful ? "결제 완료" : "결제 실패");
    if (!this.paymentResult) {
      this.$router.push({
        name: 'paymentMethod',
        params: { invoiceId: this.invoiceId }
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
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25vh;
}

.success-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
</style>