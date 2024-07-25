<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>결제 확인을 누르면 결제가 진행됩니다.</DescriptionBoxVue>
    <LoadingContainerVue v-if="loading" />
    <ErrorContainerVue v-else-if="error" :errorMessage="error" />
    <div v-else-if="paymentInfo" class="payment-info">
      <div class="member info">
        <ItemTitleVue>구매자</ItemTitleVue>
        <ItemContentVue>{{ paymentInfo.memberName }}</ItemContentVue>
      </div>
      <div class="item info">
        <ItemTitleVue>상품</ItemTitleVue>
        <ItemContentVue>
          <div class="item-name">{{ paymentInfo.itemName }}</div>
          <div class="item-count">{{ paymentInfo.itemAmount }}개</div>
        </ItemContentVue>
      </div>
      <div class="price info">
        <ItemTitleVue>총 금액</ItemTitleVue>
        <ItemContentVue>{{ formatPrice(paymentInfo.totalPrice) }}</ItemContentVue>
      </div>
      <div class="info">
        <ItemTitleVue>카드</ItemTitleVue>
        <ItemContentVue>{{ cardTypeValue }}</ItemContentVue>
      </div>
      <div class="date info">
        <ItemTitleVue>결제일</ItemTitleVue>
        <ItemContentVue>{{ todayDate }}</ItemContentVue>
      </div>
    </div>
    <NextPageButtonVue v-if="paymentInfo && !loading" @click="confirmPayment">결제 확인</NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { useCardInfoStore } from '@/stores/cardInfo';
import { usePaymentInfoStore } from '@/stores/paymentInfo';
import { usePaymentResultStore } from '@/stores/paymentResult';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import NextPageButtonVue from '@/components/payment/NextPageButton.vue'
import ItemTitleVue from '@/components/payment/ItemTitle.vue'
import ItemContentVue from '@/components/payment/ItemContent.vue'
import LoadingContainerVue from '@/components/payment/LoadingContainer.vue'
import ErrorContainerVue from '@/components/payment/ErrorContainer.vue'
import { memberAxios } from '@/utils/axios';

export default {
  name: 'CardPaymentConfirmView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    NextPageButtonVue,
    ItemTitleVue,
    ItemContentVue,
    LoadingContainerVue,
    ErrorContainerVue
  },
  computed: {
    ...mapStores(useMobileStore, useCardInfoStore, usePaymentInfoStore, usePaymentResultStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    },
    cardInfo() {
      return this.cardInfoStore.getInfo(this.invoiceId);
    },
    cardTypeValue() {
      return this.cardInfo ? this.cardInfo.cardType : '';
    },
    todayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}년 ${month}월 ${day}일`;
    }
  },
  data() {
    return {
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },
    async confirmPayment() {
      this.loading = true;
      this.error = null;
      let response = null;

      try {
        response = await memberAxios.post(`/payments/payer-pay/card?invoiceId=${this.invoiceId}`, {
          owner: this.paymentInfo.memberName,
          company: this.cardInfo.cardType,
          number: this.cardInfo.cardNumber.replace(/-/g, '')
        });
        this.paymentResultStore.setResult(this.invoiceId, response);
      } catch (error) {
        response = error.response;
        this.paymentResultStore.setResult(this.invoiceId, response);
      } finally {
        this.$router.push({
          name: 'paymentResult',
          params: { invoiceId: this.invoiceId }
        });
        this.loading = false;
      }
    },
    checkInfo() {
      if (!this.paymentInfo) {
        this.$router.push({
          name: 'paymentInfo',
          params: { invoiceId: this.invoiceId }
        });
      } else if (!this.cardInfo) {
        this.$router.push({
          name: 'cardInput',
          params: { invoiceId: this.invoiceId }
        });
      }
    }
  },
  mounted() {
    this.mobilePageStore.setPageName("결제 확인");
    this.checkInfo();
  }
}
</script>

<style lang="scss" scoped>
.payment-info-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 3rem;
}

.payment-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info {
  width: 70%;
  @media (max-width: 500px) {
    width: 100%;
  }
}

.item-count {
  position: absolute;
  right: 0;
  width: 3rem;
  height: 100%;
  font-weight: bold;
  color: $input-color;
  align-content: center;
}
</style>