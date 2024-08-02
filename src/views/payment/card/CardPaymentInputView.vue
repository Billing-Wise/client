<template>
  <PaymentContainerVue>
    <DescriptionBoxVue>카드 정보를 입력해주세요.</DescriptionBoxVue>
    <div class="title">카드 결제</div>
    <div class="card-payment-form">
      <div class="form-row">
        <label>카드사</label>
        <select v-model="cardType">
          <option v-for="card in cardTypes" :key="card.value" :value="card.value">
            {{ card.name }}
          </option>
        </select>
      </div>
      <div class="form-row">
        <label>카드번호</label>
        <div class="input-group">
          <input type="text" v-model="cardNumber1" maxlength="4" @input="onlyNumbers($event, 'cardNumber1')">
          <input type="text" v-model="cardNumber2" maxlength="4" @input="onlyNumbers($event, 'cardNumber2')">
          <input type="text" v-model="cardNumber3" maxlength="4" @input="onlyNumbers($event, 'cardNumber3')">
          <input type="text" v-model="cardNumber4" maxlength="4" @input="onlyNumbers($event, 'cardNumber4')">
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <div class="input-subgroup">
            <label>유효기간</label>
            <div class="expiry-inputs">
              <select v-model="expiryMonth">
                <option value="" disabled selected>월</option>
                <option v-for="month in 12" :key="month" :value="month.toString().padStart(2, '0')">
                  {{ month.toString().padStart(2, '0') }}
                </option>
              </select>
              <select v-model="expiryYear">
                <option value="" disabled selected>년</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year.toString().substr(2) }}
                </option>
              </select>
            </div>
          </div>
          <div class="input-subgroup">
            <label>카드구분</label>
            <div class="radio-group">
              <input type="radio" id="personal" value="personal" v-model="cardOwnership">
              <label for="personal">개인</label>
              <input type="radio" id="business" value="business" v-model="cardOwnership">
              <label for="business">법인</label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <div class="input-subgroup">
            <label>비밀번호(앞 2자리)</label>
            <input v-model="password" maxlength="2" @input="onlyNumbers($event, 'password')" class="locked-input">
          </div>
          <div class="input-subgroup">
            <label>CVC</label>
            <input type="text" v-model="cvc" maxlength="3" @input="onlyNumbers($event, 'cvc')">
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
import { useCardInfoStore } from '@/stores/payment/cardInfo';
import { usePaymentInfoStore } from '@/stores/payment/paymentInfo';
import { mapActions, mapStores } from 'pinia';
import PaymentContainerVue from '@/components/payment/PaymentContainer.vue'
import DescriptionBoxVue from '@/components/payment/DescriptionBox.vue';
import ButtonContainer from '@/components/payment/ButtonContainer.vue'

export default {
  name: 'CardPaymentInputView',
  components: {
    PaymentContainerVue,
    DescriptionBoxVue,
    ButtonContainer,
  },
  data() {
    return {
      cardType: '',
      cardTypes: [
        { name: '신한카드', value: '신한카드' },
        { name: '삼성카드', value: '삼성카드' },
        { name: 'KB국민카드', value: 'KB국민카드' },
        { name: '현대카드', value: '현대카드' },
        { name: '롯데카드', value: '롯데카드' },
        { name: '우리카드', value: '우리카드' },
        { name: 'NH농협카드', value: 'NH농협카드' },
        { name: '하나카드', value: '하나카드' },
        { name: 'BC바로카드', value: 'BC바로카드' },
        { name: 'IBK기업은행', value: 'IBK기업은행' }
      ],
      cardNumber1: '', cardNumber2: '', cardNumber3: '', cardNumber4: '',
      expiryMonth: '', 
      expiryYear: '',
      years: [],
      cardOwnership: 'personal',
      password: '', cvc: '', ssn1: '', ssn2: '',
      isFixedBottom: false
    }
  },
  computed: {
    ...mapStores(useMobileStore, usePaymentInfoStore, useCardInfoStore),
    invoiceId() {
      return this.$route.params.invoiceId;
    },
    paymentInfo() {
      return this.paymentInfoStore.getInfo(this.invoiceId);
    },
    cardInfo() {
      return this.cardInfoStore.getInfo(this.invoiceId);
    },
    isFormValid() {
      return this.cardType &&
             this.cardNumber1.length === 4 && 
             this.cardNumber2.length === 4 && 
             this.cardNumber3.length === 4 && 
             this.cardNumber4.length === 4 &&
             this.expiryMonth &&
             this.expiryYear &&
             this.cardOwnership &&
             this.password.length === 2 && 
             this.cvc.length === 3 &&
             this.ssn1.length === 6 && 
             this.ssn2.length === 7;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    onlyNumbers(event, field) {
      this[field] = event.target.value.replace(/[^0-9]/g, '');
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 10; i++) {
        this.years.push(currentYear + i);
      }
    },
    goToNextPage() {
      if (this.isFormValid) {
        const cardInfo = {
          cardType: this.cardType,
          cardNumber: `${this.cardNumber1}-${this.cardNumber2}-${this.cardNumber3}-${this.cardNumber4}`,
          expiryMonth: this.expiryMonth,
          expiryYear: this.expiryYear,
          cardOwnership: this.cardOwnership,
          password: this.password,
          cvc: this.cvc,
          ssn: `${this.ssn1}-${this.ssn2}`
        };
        this.cardInfoStore.setInfo(this.invoiceId, cardInfo);
        
        this.$router.push({
          name: 'cardConfirm',
          params: { invoiceId: this.invoiceId }
        });
      }
    },
    goBack() {
      this.$router.push({
        name: 'cardAgreement',
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
    loadCardInfo() {
      const savedCardInfo = this.cardInfo;
      if (savedCardInfo) {
        this.cardType = savedCardInfo.cardType;
        [this.cardNumber1, this.cardNumber2, this.cardNumber3, this.cardNumber4] = savedCardInfo.cardNumber.split('-');
        this.expiryMonth = savedCardInfo.expiryMonth;
        this.expiryYear = savedCardInfo.expiryYear;
        this.cardOwnership = savedCardInfo.cardOwnership;
        this.password = savedCardInfo.password;
        this.cvc = savedCardInfo.cvc;
        [this.ssn1, this.ssn2] = savedCardInfo.ssn.split('-');
      }
    },
    checkPosition() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      this.isFixedBottom = windowHeight >= documentHeight;
    }
  },
  mounted() {
    this.mobilePageStore.setPageName("카드 결제");
    this.generateYears();
    this.checkPaymentInfo();
    this.loadCardInfo();
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

.card-payment-form {
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

    input, select {
      flex: 1;
      min-width: 0;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }

    .radio-group {
      display: flex;
      align-items: center;

      label {
        width: auto;
        margin-right: 10px;
        margin-top : 5px;
        margin-bottom: 0; 
      }

      input {
        margin-right: 0;
      }
    }
  }

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

    input {
      width: 100%;
    }
  }
}

input, select {
  border: 1px solid $theme-color;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
  width: 50%;
}

select {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 10px auto;
  padding-right: 30px;
}

.expiry-inputs {
  display: flex;
  
  select {
    width: 45%;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
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