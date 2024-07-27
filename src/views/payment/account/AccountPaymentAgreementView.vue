<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>이용약관 동의를 해주세요.</DescriptionBoxVue>
    <AgreementBoxVue @agreement-changed="updateAgreementStatus"></AgreementBoxVue>
    <ButtonContainer 
      @back-click="goBack" 
      @next-click="goToNextPage"
      :nextDisabled="!allAgreed"
      :isFixedBottom="isFixedBottom"
    >
      <template #back-text>뒤로</template>
      <template #next-text>다음</template>
    </ButtonContainer>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { usePaymentInfoStore } from '@/stores/paymentInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import AgreementBoxVue from '@/components/payment/AgreementBox.vue';
import ButtonContainer from '@/components/payment/ButtonContainer.vue'

export default {
  name: 'AccountPaymentAgreementView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    AgreementBoxVue,
    ButtonContainer
  },
  data() {
    return {
      allAgreed: false,
      isFixedBottom: false
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
    goBack() {
      this.$router.push({
        name: 'paymentMethod',
        params: { invoiceId: this.invoiceId }
      });
    },
    checkPaymentInfo() {
      if (!this.paymentInfo) {
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
    this.mobilePageStore.setPageName("계좌 이체");
    this.checkPaymentInfo();
    this.checkPosition();
    window.addEventListener('resize', this.checkPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkPosition);
  }
}
</script>

<style scoped>
</style>