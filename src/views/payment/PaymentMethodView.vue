<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>결제 수단을 선택해주세요.</DescriptionBoxVue>
    <div class="payment-options">
      <label class="radio-button">
        <input type="radio" name="payment" value="account" :checked="paymentMethod === 'account'" @change="setPaymentMethod('account')">
        <span class="radio-custom"></span>
        <span class="radio-label">계좌 이체</span>
      </label>
      <label class="radio-button">
        <input type="radio" name="payment" value="card" :checked="paymentMethod === 'card'" @change="setPaymentMethod('card')">
        <span class="radio-custom"></span>
        <span class="radio-label">카드 결제</span>
      </label>
    </div>
    <NextPageButtonVue @click="goToNextPage">다음</NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { usePaymentInfoStore } from '@/stores/paymentInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import NextPageButtonVue from '@/components/payment/NextPageButton.vue'

export default {
  name: 'PaymentMethodView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    NextPageButtonVue,
  },
  data() {
    return {
      paymentMethod: 'account' 
    }
  },
  computed: {
    ...mapStores(useMobileStore, usePaymentInfoStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    setPaymentMethod(method) {
      this.paymentMethod = method;
    },
    goToNextPage() {
      if (this.paymentMethod === 'card') {
        this.$router.push({
          name: 'cardAgreement',
          params: { invoiceId: this.invoiceId }
        });
      } else if (this.paymentMethod === 'account') {
        this.$router.push({
          name: 'accountAgreement',
          params: { invoiceId: this.invoiceId }
        });
      }
    },
    checkPaymentInfo() {
      if (!this.paymentInfo) {
        this.$router.push({
          name: 'paymentInfo',
          params: { invoiceId: this.invoiceId }
        });
      }
    }
  },
  mounted() {
    this.mobilePageStore.setPageName("납부자 결제");
    this.checkPaymentInfo();
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0;
}

h2 {
  font-size: 18px;
  margin: 5px 0 0;
}

.payment-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5rem 0 5rem 0;
}

.radio-button {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  padding-left: 45px;
  min-height: 30px;
}

.radio-button input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-custom {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  width: 30px;
  background-color: $back-color;
  border-radius: 50%;
  border: 3px solid $light-theme-color;
}

.radio-button:hover input ~ .radio-custom {
  background-color: $back-color;
}

.radio-button input:checked ~ .radio-custom {
  background-color: $theme-color;
}

.radio-custom:after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
}

.radio-button input:checked ~ .radio-custom:after {
  display: block;
}

.radio-label {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1; 
}
</style>