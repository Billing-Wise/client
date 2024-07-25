<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>이용약관 동의를 해주세요.</DescriptionBoxVue>
    <AgreementBoxVue></AgreementBoxVue>
    <NextPageButtonVue>다음</NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
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
  computed: {
    ...mapStores(useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName'])
  },
  mounted() {
    this.mobilePageStore.setPageName("계좌 이체")
  }
}
</script>

<style scoped>

</style>