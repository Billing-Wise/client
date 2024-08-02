<template>
  <div class="contract-info-confirmation">
    <ErrorContainerVue v-if="errorMessage" :errorMessage="errorMessage" />
    <div v-else class="info-container">
      <h2 class="section-title">회원 정보</h2>
      <div class="info-field">
        <input type="text" :value="contractData.memberName" readonly>
      </div>
      <div class="info-field">
        <input type="text" :value="contractData.memberEmail" readonly>
      </div>
      <div class="info-field">
        <input type="text" :value="formatPhoneNumber(contractData.memberPhone)" readonly>
      </div>

      <h2 class="section-title">상품 (수량)</h2>
      <div class="info-field">
        <input type="text" :value="contractData.itemName + '('+ contractData.itemAmount +')'" readonly>
      </div>
      
      <h2 class="section-title">총 금액</h2>
      <div class="info-field">
        <input type="text" :value="formatPrice(contractData.totalPrice)" readonly>
      </div>

      <h2 class="section-title">결제일 주기</h2>
      <div class="info-field">
        <input 
          type="text" 
          :value="formatPaymentCycle(contractData.contractCycle)"
          readonly
        >
      </div>
    </div>
    <div v-if="!errorMessage" class="button-container">
      <ThmemBtnVue title="이전" :func="goBack" :disabled="true" />
      <ThmemBtnVue title="다음" :func="goNext" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useConsentContractInfoStore } from '@/stores/consent/member/consentContractInfo';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';
import { memberAxios } from '@/utils/axios';
import ErrorContainerVue from '@/components/payment/ErrorContainer.vue';

export default {
  name: 'ContractInfoConfirmation',
  components: {
    ThmemBtnVue,
    ErrorContainerVue
  },
  
  data() {
    return {
      errorMessage: ''
    };
  },

  computed: {
    ...mapStores(useMobileStore, useConsentContractInfoStore),
    contractId() {
      return this.$route.params.contractId;
    },
    contractData() {
      return this.consentContractInfoStore.getInfo(this.contractId) || {};
    }
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']),
    ...mapActions(useConsentContractInfoStore, ['setInfo']),

    async fetchContractData() {
      try {
        const response = await memberAxios.get(`/easy-consent/member/contracts/${this.contractId}`);
        if (response.data.code === 200) {
          this.setInfo(this.contractId, response.data.data);
        } else {
          this.handleError(response);
        }
      } catch (error) {
        this.handleError(error.response);
      }
    },

    handleError(response) {
      if (response && response.data && response.data.message) {
        this.errorMessage = response.data.message;
      } else {
        this.errorMessage = '내부 서버 오류입니다';
      }
      console.error('Error fetching contract data:', this.errorMessage);
    },

    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
      return phoneNumber;
    },

    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price) + '원';
    },

    formatPaymentCycle(cycle) {
      return `매월 ${cycle}일`;
    },

    getTodayDate() {
      const today = new Date();
      return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
    },

    goBack() {
      // 비활성화된 버튼이므로 아무 동작도 하지 않습니다.
    },

    goNext() {
      this.$router.push({ 
        name: 'memberAccountInfo', 
        params: { contractId: this.contractId }
      });
    }
  },

  mounted() {
    this.setPageName('계약 정보 확인');
    this.fetchContractData();
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

    :deep(.theme-btn) {
      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>