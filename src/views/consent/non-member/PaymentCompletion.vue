<template>
  <div class="payment-completion">
    <div class="content">
      <p class="confirmation-message">계약이 완료되었습니다.</p>
      <div class="icon-container">
        <!-- <img src="@/assets/icons/contract-completed.png" alt="Contract Completed Icon" class="confirmation-icon" /> -->
      </div>
      <div class="details">
        <p class="product-name">"{{ productInfo.name }}"</p>
        <p>서비스를 {{ contractInfo.isSubscription ? '정기' : '일회성' }} 구매하셨습니다.</p>
        <p class="amount">
          {{ contractInfo.isSubscription ? `매월 ${contractInfo.contractCycle}일 마다` : '' }}<br />
          {{ paymentInfo.totalAmount.toLocaleString() }}원의 금액이<br />
          ({{ paymentInfo.accountBank }}){{ paymentInfo.accountNumber }}에서<br />
          청구됩니다.
        </p>
        <p class="thank-you">이용해주셔서 감사합니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useContractStore } from '@/stores/consent/non-member/contract';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'PaymentCompletion',
  components: {
    ThmemBtnVue
  },
  computed: {
    ...mapStores(useContractStore),
    productInfo() {
      return this.contractStore.productInfo;
    },
    paymentInfo() {
      return this.contractStore.paymentInfo;
    },
    contractInfo() {
      return this.contractStore.contractInfo;
    }
  },
  methods: {
    goHome() {
      this.contractStore.resetStore();
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
<style lang="scss" scoped>
.payment-completion {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 90vh;
  padding: 20px;

  header {
    text-align: center;
    background-color: #8a70d6;
    color: white;
    width: 100%;
    padding: 10px 0;

    h1 {
      margin: 0;
      font-size: 24px;
    }

    h2 {
      margin: 0;
      font-size: 18px;
    }
  }

  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .confirmation-message {
      font-size: 18px;
      margin: 20px 0;
    }

    .icon-container {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 20px 0;

      .confirmation-icon {
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
    }

    .details {
      background-color: white;
      border: 1px solid #8a70d6;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      width: 100%;

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

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;

    .confirm-button {
      width: 100px;
    }
  }
}
</style>