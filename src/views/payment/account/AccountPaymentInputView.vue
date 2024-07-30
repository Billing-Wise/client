<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>계좌 정보를 입력해주세요.</DescriptionBoxVue>
    <div class="title">계좌 이체</div>
    <div class="account-payment-form">
      <div class="form-row">
        <div class="input-group">
          <div class="input-subgroup">
            <label>출금은행</label>
            <select v-model="bank">
              <option v-for="bank in banks" :key="bank.value" :value="bank.value">
                {{ bank.name }}
              </option>
            </select>
          </div>
          <div class="input-subgroup">
            <label>예금주</label>
            <input type="text" v-model="accountHolder" @input="onlyLetters" maxlength="20">
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>주민등록번호</label>
        <div class="input-group">
          <input type="text" v-model="ssn1" maxlength="6" @input="onlyNumbers($event, 'ssn1')">
          <input v-model="ssn2" maxlength="7" @input="onlyNumbers($event, 'ssn2')" class="locked-input">
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <div class="input-subgroup">
            <label>계좌번호(-제외)</label>
            <input type="text" v-model="accountNumber" @input="validateAccountNumber">
          </div>
          <div class="input-subgroup">
            <label>계좌 비밀번호</label>
            <input v-model="accountPassword" maxlength="4" @input="onlyNumbers($event, 'accountPassword')" class="locked-input">
          </div>
        </div>
      </div>
    </div>
    <ButtonContainer 
      @back-click="goBack" 
      @next-click="goToNextPage"
      :nextDisabled="!isFormValid"
      :isFixedBottom="isFixedBottom"
    >
      <template #back-text>뒤로</template>
      <template #next-text>다음</template>
    </ButtonContainer>
  </PaymentContainerVue>
</template>

<script>
import { useMobileStore } from '@/stores/mobilePage';
import { useAccountInfoStore } from '@/stores/payment/accountInfo';
import { usePaymentInfoStore } from '@/stores/payment/paymentInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import ButtonContainer from '@/components/payment/ButtonContainer.vue'

export default {
  name: 'AccountPaymentInputView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    ButtonContainer,
  },
  data() {
    return {
      bank: '',
      banks: [
        { name: '신한은행', value: '신한은행' },
        { name: '국민은행', value: '국민은행' },
        { name: '우리은행', value: '우리은행' },
        { name: '하나은행', value: '하나은행' },
        { name: '농협은행', value: '농협은행' },
        { name: '기업은행', value: '기업은행' },
        { name: '수협은행', value: '수협은행' },
        { name: '카카오뱅크', value: '카카오뱅크' },
        { name: '토스뱅크', value: '토스뱅크' },
      ],
      accountHolder: '',
      ssn1: '', 
      ssn2: '',
      accountNumber: '',
      accountPassword: '',
      isFixedBottom: false
    }
  },
  computed: {
    ...mapStores(useMobileStore, usePaymentInfoStore, useAccountInfoStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    },
    accountInfo() {
      return this.accountInfoStore.getInfo(this.invoiceId);
    },
    isFormValid() {
      return this.bank &&
             this.accountHolder &&
             this.ssn1.length === 6 && 
             this.ssn2.length === 7 &&
             this.accountNumber.length >= 10 &&
             this.accountNumber.length <= 20 &&
             this.accountPassword.length === 4;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    onlyNumbers(event, field) {
      this[field] = event.target.value.replace(/[^0-9]/g, '');
    },
    onlyLetters(event) {
      this.accountHolder = event.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, '');
    },
    validateAccountNumber(event) {
      let value = event.target.value.replace(/[^0-9]/g, '');
      if (value.length > 20) {
        value = value.slice(0, 20);
      }
      this.accountNumber = value;
    },
    goToNextPage() {
      if (this.isFormValid) {
        const accountInfo = {
          bank: this.bank,
          accountHolder: this.accountHolder,
          ssn: `${this.ssn1}-${this.ssn2}`,
          accountNumber: this.accountNumber,
          accountPassword: this.accountPassword
        };
        this.accountInfoStore.setInfo(this.invoiceId, accountInfo);
        
        this.$router.push({
          name: 'accountConfirm',
          params: { invoiceId: this.invoiceId }
        });
      }
    },
    goBack() {
      this.$router.push({
        name: 'accountAgreement',
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
    loadAccountInfo() {
      const savedAccountInfo = this.accountInfo;
      if (savedAccountInfo) {
        this.bank = savedAccountInfo.bank;
        this.accountHolder = savedAccountInfo.accountHolder;
        [this.ssn1, this.ssn2] = savedAccountInfo.ssn.split('-');
        this.accountNumber = savedAccountInfo.accountNumber;
        this.accountPassword = savedAccountInfo.accountPassword;
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
    this.loadAccountInfo();
    this.checkPosition();
    window.addEventListener('resize', this.checkPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkPosition);
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.account-payment-form {
  width: 500px;
  max-width: 100%;
  border: 2px solid $theme-color;
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;

}

.form-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;

  label {
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .input-group {
    display: flex;
    align-items: flex-start;
    width: 100%;

    .input-subgroup {
      flex: 1;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      label {
        display: block;
        margin-bottom: 5px;
      }

      input, select {
        width: 100%;
      }
    }

    input {
      flex: 1;
      min-width: 0;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

input, select {
  border: 1px solid $theme-color;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
  width: 100%;
}

select {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px auto;
  padding-right: 30px;
}

.locked-input {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  font-family: text-security-disc;
  -webkit-text-security: disc;
}
</style>