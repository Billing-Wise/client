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

      <h2 class="section-title">결제일 주기 (입력해주세요)</h2>
      <div class="info-field">
        <input 
          type="number" 
          v-model="contractInfo.contractCycle"
          @input="validateContractCycle"
          @blur="validateContractCycle(true)"
          placeholder="1-28"
        >
        <p v-if="contractCycleError" class="error-message">{{ contractCycleError }}</p>
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
import { useContractStore } from '@/stores/consent/non-member/contract';
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
      contractInfo: {
        contractCycle: null
      },
      contractCycleError: '',
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

    validateContractCycle(isBlur = false) {
      const cycle = Number(this.contractInfo.contractCycle);
      if (isNaN(cycle) || cycle < 1 || cycle > 28) {
        if (isBlur || this.isSubmitAttempted) {
          this.contractCycleError = '유효한 날짜를 입력해주세요. (1-28)';
        }
        return false;
      }
      this.contractCycleError = '';
      return true;
    },

    getTodayDate() {
      const today = new Date();
      return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
    },

    goBack() {
      this.$router.push({ name: 'memberInfo' });
    },

    goNext() {
      this.isSubmitAttempted = true;
      if (this.validateContractCycle(true)) {
        const contractStore = useContractStore();
        contractStore.setContractInfo({
          contractCycle: this.contractInfo.contractCycle,
          isSubscription: this.contractInfo.isSubscription
        });
        contractStore.setPaymentInfo({
          paymentDate: this.getTodayDate()
        });
        this.$router.push({ name: 'accountInfo' });
      }
    }
  },

  mounted() {
    this.setPageName('계약 정보 확인');

    if (!this.$route.params.clientId) {
      this.$router.push({ name: 'consent' });
      return;
    }

    const contractStore = useContractStore();
    this.memberInfo = contractStore.memberInfo || {};
    this.productInfo = contractStore.productInfo || {};
    this.contractInfo = { 
      ...contractStore.contractInfo, 
      contractCycle: contractStore.contractInfo.contractCycle || null
    };
  },

  watch: {
    'contractInfo.contractCycle': {
      handler() {
        this.validateContractCycle();
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
  background-color: white;
  padding: 20px;

  .info-container {
    flex: 1;
  }

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0 10px 0;
  }

  .info-field {
    margin-bottom: 9px;

    input {
      width: 100%;
      padding: 9px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: white;
      font-size: 13px;
      font-weight: 800;

      &[readonly] {
        background-color: white;
      }
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
    margin-bottom: 5px;
  }
}
</style>