<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>결제 정보를 확인해주세요.</DescriptionBoxVue>
    <LoadingContainerVue v-if="loading" />
    <ErrorContainerVue v-else-if="error" :errorMessage="error" />
    <div v-else-if="paymentInfo" class="payment-info">
      <div class="member info">
        <ItemTitleVue>회원 정보</ItemTitleVue>
        <ItemContentVue>{{ paymentInfo.memberName }}</ItemContentVue>
        <ItemContentVue>{{ paymentInfo.memberEmail }}</ItemContentVue>
        <ItemContentVue>{{ formatPhoneNumber(paymentInfo.memberPhone) }}</ItemContentVue>
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
      <div class="date info">
        <ItemTitleVue>약정일</ItemTitleVue>
        <ItemContentVue>{{ formatDate(paymentInfo.contractDate) }}</ItemContentVue>
      </div>
      <div class="date info">
        <ItemTitleVue>결제 기한</ItemTitleVue>
        <ItemContentVue>{{ formatDate(paymentInfo.dueDate) }}</ItemContentVue>
      </div>
    </div>
    <NextPageButtonVue v-if="paymentInfo && !error" @click="goToPaymentMethod">다음</NextPageButtonVue>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { usePaymentInfoStore } from '@/stores/paymentInfo';
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
  name: 'PaymentInfoView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    NextPageButtonVue,
    ItemTitleVue,
    ItemContentVue,
    LoadingContainerVue,
    ErrorContainerVue
  },
  data() {
    return {
      loading: false,
      error: null,
    }
  },
  computed: {
    ...mapStores(useMobileStore),
    ...mapStores(usePaymentInfoStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    ...mapActions(usePaymentInfoStore, ['setInfo']),
    async fetchPaymentInfo() {
      this.loading = true;
      this.error = null;
      try {
        const response = await memberAxios.get(`/payments/payer-pay/invoices/${this.invoiceId}`);
        this.setInfo(this.invoiceId, response.data.data);
      } catch (error) {
        this.error = error.response.data.message || '결제 정보를 불러오는데 실패했습니다.';
      } finally {
        this.loading = false;
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    },
    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
      return phoneNumber;  // 형식에 맞지 않으면 원래 번호를 반환
    },
    goToPaymentMethod() {
      this.$router.push({
        name: 'paymentMethod',
        params: { invoiceId: this.invoiceId }
      });
    }
  },
  mounted() {
    this.mobilePageStore.setPageName("납부자 결제");
    this.fetchPaymentInfo();
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