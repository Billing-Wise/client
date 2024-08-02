<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>확인을 누르면 결제가 진행됩니다.</DescriptionBoxVue>
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
        <ItemTitleVue>출금은행</ItemTitleVue>
        <ItemContentVue>{{ accountInfo.bank }}</ItemContentVue>
      </div>
      <div class="info">
        <ItemTitleVue>예금주</ItemTitleVue>
        <ItemContentVue>{{ accountInfo.accountHolder }}</ItemContentVue>
      </div>
      <div class="date info">
        <ItemTitleVue>결제일</ItemTitleVue>
        <ItemContentVue>{{ todayDate }}</ItemContentVue>
      </div>
    </div>
    <ButtonContainer 
      v-if="paymentInfo && !loading"
      @back-click="goBack" 
      @next-click="confirmPayment"
      :isFixedBottom="isFixedBottom"
    >
      <template #back-text>뒤로</template>
      <template #next-text>확인</template>
    </ButtonContainer>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { useAccountInfoStore } from '@/stores/payment/accountInfo';
import { usePaymentInfoStore } from '@/stores/payment/paymentInfo';
import { usePaymentResultStore } from '@/stores/payment/paymentResult';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import ButtonContainer from '@/components/payment/ButtonContainer.vue'
import ItemTitleVue from '@/components/payment/ItemTitle.vue'
import ItemContentVue from '@/components/payment/ItemContent.vue'
import LoadingContainerVue from '@/components/payment/LoadingContainer.vue'
import ErrorContainerVue from '@/components/payment/ErrorContainer.vue'
import { memberAxios } from '@/utils/axios';

export default {
  name: 'AccountPaymentConfirmView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    ButtonContainer,
    ItemTitleVue,
    ItemContentVue,
    LoadingContainerVue,
    ErrorContainerVue
  },
  computed: {
    ...mapStores(useMobileStore, useAccountInfoStore, usePaymentInfoStore, usePaymentResultStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    },
    accountInfo() {
      return this.accountInfoStore.getInfo(this.invoiceId);
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
      error: null,
      isFixedBottom: false
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
        response = await memberAxios.post(`/payments/payer-pay/account?invoiceId=${this.invoiceId}`, {
          owner: this.accountInfo.accountHolder,
          bank: this.accountInfo.bank,
          number: this.accountInfo.accountNumber
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
    goBack() {
      this.$router.push({
        name: 'accountInput',
        params: { invoiceId: this.invoiceId }
      });
    },
    checkInfo() {
      if (!this.paymentInfo) {
        this.$router.push({
          name: 'paymentInfo',
          params: { invoiceId: this.invoiceId }
        });
      } else if (!this.accountInfo) {
        this.$router.push({
          name: 'accountInput',
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
    this.mobilePageStore.setPageName("결제 확인");
    this.checkInfo();
    this.checkPosition();
    window.addEventListener('resize', this.checkPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkPosition);
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