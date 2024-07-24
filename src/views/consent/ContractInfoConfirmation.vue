<template>
  <div class="contract-info-confirmation">

    <div class="info-container">
      <h2 class="section-title">회원 정보</h2>
      <div class="info-field">
        <input type="text" :value="memberInfo.name" readonly>
      </div>
      <div class="info-field">
        <input type="text" :value="memberInfo.email" readonly>
      </div>
      <div class="info-field">
        <input type="text" :value="memberInfo.phone" readonly>
      </div>

      <h2 class="section-title">상품 (수량)</h2>
      <div class="info-field">
        <input type="text" :value="productInfo.name + '('+ productInfo.amount +')'" readonly>
      </div>
      
      <h2 class="section-title">총 금액</h2>
      <div class="info-field">
        <input type="text" :value="productInfo.amount * productInfo.price" readonly>
      </div>

      <h2 class="section-title">결제일</h2>
      <div class="info-field">
        <input 
          type="number" 
          v-model="paymentInfo.paymentDate"
          @input="validatePaymentDate"
          @blur="validatePaymentDate(true)"
        >
        <p v-if="paymentDateError" class="error-message">{{ paymentDateError }}</p>
      </div>
    </div>
    <div class="button-container">
      <ThmemBtnVue title="이전" :func="goBack" />
      <ThmemBtnVue title="다음" :func="goNext" />
    </div>
  </div>

</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useContractStore } from '@/stores/contract';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';


export default {
  name: 'ContractInfoConfirmation',
  components: {
    ThmemBtnVue
  },
  
  data() {
    return {
      memberInfo: {},
      productInfo: {},
      paymentInfo: {
        paymentDate: this.getTodayDay()
      },
      paymentDateError: '', 
      isSubmitAttempted: false  
    };
  },

  computed: {
    ...mapStores(useMobileStore, useContractStore),
    totalPrice() {
      const selectedItem = this.items.find(item => item.id === this.selectedItemId);
      return selectedItem ? selectedItem.price * this.itemAmount : 0;
    }
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']),

    validatePaymentDate(isBlur = false) {  
      const date = Number(this.paymentInfo.paymentDate);
      if (isNaN(date) || date < 1 || date > 28) {
        if (isBlur || this.isSubmitAttempted) {  
          this.paymentDateError = '유효한 날짜를 입력해주세요. (1-28)';
        }
        return false;
      }
      this.paymentDateError = '';
      return true;
    },
    getTodayDay() {
      const today = new Date();
      return today.getDate();
    },
    formatPrice(price) {
      return price != null ? `${price.toLocaleString()}` : '-';
    },
    goBack() {
      this.$router.push({ name: 'memberInfo' });
    },
    goNext() {
      this.isSubmitAttempted = true;
      if (this.validatePaymentDate(true)) {
        const contractStore = useContractStore();
        contractStore.setPaymentInfo({
          ...this.paymentInfo,
          paymentDate: this.paymentInfo.paymentDate
        });
        this.$router.push({ name: 'accountInfo' }); // 
      } 
    },
  },
  mounted() {
    this.setPageName('계약 정보 확인');
    const contractStore = useContractStore();
    this.memberInfo = contractStore.memberInfo || {};
    this.productInfo = contractStore.productInfo || {};
    this.paymentInfo = { 
      ...contractStore.paymentInfo, 
      paymentDate: contractStore.paymentInfo.paymentDate || this.getTodayDay()
    };
  },
  watch: {
    'paymentInfo.paymentDate': {
      handler() {
        this.validatePaymentDate();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-info-confirmation {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $back-color;
  padding: 20px;

  .info-container {
    flex: 1;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0 10px 0;
    text-align: center;
  
  }

  .info-field {
    margin-bottom: 10px;

    input {
      width: 100%;
      padding: 9px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: white;
      font-size: 15px;
      text-align: center;
      font-weight:500;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .error-message {
    color: tomato;
    font-size: 12px;
    margin-bottom: 0px;
  }
}
</style>