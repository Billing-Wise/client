<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>이용약관 동의를 해주세요.</DescriptionBoxVue>
    <AgreementBoxVue @agreement-changed="updateAgreementStatus"></AgreementBoxVue>
    <NextPageButtonVue :disabled="!allAgreed" @click="goToNextPage">다음</NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { usePaymentInfoStore } from '@/stores/paymentInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import AgreementBoxVue from '@/components/payment/AgreementBox.vue';
import NextPageButtonVue from '@/components/payment/NextPageButton.vue'

export default {
  name: 'AccountPaymentAgreementView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    NextPageButtonVue,
    AgreementBoxVue
  },
  data() {
    return {
      allAgreed: false
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
    updateAgreementStatus(status) {
      this.allAgreed = status;
    },
    goToNextPage() {
      if (this.allAgreed) {
        this.$router.push({
          name: 'accountInput',
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
    this.mobilePageStore.setPageName("계좌 이체");
    this.checkPaymentInfo();
  }
}
</script>

<style scoped>
</style>