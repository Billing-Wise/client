<template>
  <div class="account-info-input">
    <div class="info-container">
      <p class="instruction">계좌 정보를 입력해주세요.</p>
      <h2 class="section-title">은행명</h2>
      <div class="info-field">
        <select v-model="accountInfo.bankName" @change="validateBankName">
          <option value="">은행을 선택하세요</option>
          <option v-for="bank in bankList" :key="bank.code" :value="bank.name">
            {{ bank.name }}
          </option>
        </select>
        <p v-if="bankNameError" class="error-message">{{ bankNameError }}</p>
      </div>

      <h2 class="section-title">계좌번호</h2>
      <div class="info-field">
        <input 
          type="text" 
          v-model="accountInfo.accountNumber"
          @input="validateAccountNumber"
          @blur="validateAccountNumber(true)"
          placeholder="'-' 없이 숫자만 입력해주세요"
        >
        <p v-if="accountNumberError" class="error-message">{{ accountNumberError }}</p>
      </div>

      <h2 class="section-title">예금주</h2>
      <div class="info-field">
        <input 
          type="text" 
          v-model="accountInfo.accountHolder"
          @input="validateAccountHolder"
          @blur="validateAccountHolder(true)"
        >
        <p v-if="accountHolderError" class="error-message">{{ accountHolderError }}</p>
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
import { useMobileStore } from '@/stores/mobilePage';
import { useContractStore } from '@/stores/contract';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'AccountInfoInput',
  components: {
    ThmemBtnVue
  },
  data() {
    return {
      accountInfo: {
        bankName: '',
        accountNumber: '',
        accountHolder: ''
      },
      bankNameError: '',
      accountNumberError: '',
      accountHolderError: '',
      isSubmitAttempted: false,
      bankList: [
        { code: 'KB', name: '국민은행' },
        { code: 'SH', name: '신한은행' },
        { code: 'WR', name: '우리은행' },
        { code: 'HN', name: '하나은행' },
        { code: 'NH', name: '농협은행' },
        { code: 'IBK', name: '기업은행' },
        
      ]
    };
  },

  computed: {
    ...mapStores(useMobileStore, useContractStore)
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']),

    validateBankName() {
      if (!this.accountInfo.bankName) {
        this.bankNameError = '은행을 선택해주세요.';
        return false;
      }
      this.bankNameError = '';
      return true;
    },
    validateAccountNumber(isBlur = false) {
      const accountNumber = this.accountInfo.accountNumber.replace(/-/g, '');
      if (!/^\d{10,14}$/.test(accountNumber)) {
        if (isBlur || this.isSubmitAttempted) {
          this.accountNumberError = '유효한 계좌번호를 입력해주세요.';
        }
        return false;
      }
      this.accountNumberError = '';
      return true;
    },
    validateAccountHolder(isBlur = false) {
      if (!this.accountInfo.accountHolder.trim()) {
        if (isBlur || this.isSubmitAttempted) {
          this.accountHolderError = '예금주 이름을 입력해주세요.';
        }
        return false;
      }
      this.accountHolderError = '';
      return true;
    },
    goBack() {
      this.$router.push({ name: 'contractInfoConfirmation' });
    },
    goNext() {
      this.isSubmitAttempted = true;
      if (this.validateBankName() && 
          this.validateAccountNumber(true) && 
          this.validateAccountHolder(true)) {
        const contractStore = useContractStore();
        contractStore.setPaymentInfo({
          ...contractStore.paymentInfo,
          ...this.accountInfo
        });
        this.$router.push({ name: 'finalConfirmation' });
      }
    },
  },
  mounted() {
    this.setPageName('계좌 정보 입력');

    const contractStore = useContractStore();
    if (contractStore.paymentInfo) {
      this.accountInfo = {
        bankName: contractStore.paymentInfo.bankName || '',
        accountNumber: contractStore.paymentInfo.accountNumber || '',
        accountHolder: contractStore.paymentInfo.accountHolder || ''
      };
    }
  },
  watch: {
    'accountInfo.bankName': 'validateBankName',
    'accountInfo.accountNumber': 'validateAccountNumber',
    'accountInfo.accountHolder': 'validateAccountHolder'
  }
}
</script>

<style lang="scss" scoped>
.account-info-input {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  padding: 0px 20px 20px;

  .title {
    text-align: center;
    color: white;
    background-color: $theme-color;
    padding: 20px;
    margin: -20px -20px 20px -20px;
  }

  .instruction {
      padding: 50px 20px;
      border-radius: 5px;
      text-align: center;
      height: 15%;
      width: 100%;
      text-decoration: underline;
      text-underline-offset: 5px;
      font-size: large;
      font-weight: bold;
      margin: 10px auto;
  }

  .info-container {
    flex: 1;
    overflow-y: auto;
  }

  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0 5px 0;
  }

  .info-field {
    margin-bottom: 10px;
    

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: white;
      font-size: 14px;
      font-weight: 550;
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      padding-right: 30px;
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
    margin-top: 5px;
  }
}
</style>