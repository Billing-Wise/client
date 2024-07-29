<template>
  <div class="right-side">
    <div class="info-part-box">
      <span class="part-title">계약 상세 정보 입력</span>
      <div class="info-part">
        <div class="info-part-row">
          <InfoInputVue title="납부일" type="number" v-model="contractCycle"/>
          <InfoInputVue title="납부 기한" type="number" v-model="paymentDueCycle"/>
        </div>
        <div class="info-part-row">
          <TitleSelectVue title="구독 여부" :selectedIdx="isSubscriptionIdx" :keywordArr="isSubscription"
            :choiceFunc="setSubscription" />
          <TitleSelectVue title="청구 생성" :selectedIdx="invoiceTypeIdx" :keywordArr="invoiceType"
            :choiceFunc="setInvoiceType" />
        </div>
        <div class="info-part-row">
          <TitleSelectVue title="결제 수단" :selectedIdx="paymentTypeIdx" :keywordArr="paymentType"
            :choiceFunc="setPaymentType" />
          <TitleSelectVue title="간편 동의" :selectedIdx="isEasyConsentIdx" :keywordArr="isEasyConsent"
            :choiceFunc="setEasyConsent" aria-disabled="true"/>
        </div>
      </div>
    </div>
    <div class="info-part-box">
      <span class="part-title">실시간 CMS 계좌 정보 입력</span>
      <span class="info-guide" v-if="paymentTypeIdx === 0" >※ 실시간 CMS 결제를 사용하지 않는 계약입니다.</span>
      <span class="info-guide" v-if="paymentTypeIdx === 1 && isEasyConsentIdx === 1">※ 간편동의를 사용 중입니다.</span>
      <div class="info-part" v-if="paymentTypeIdx === 1 && isEasyConsentIdx === 0">
        <div class="info-part-row">
          <InfoInputVue title="계좌주" v-model="consentOwner"/>
          <InfoInputVue title="은행명" v-model="consentBank"/>
        </div>
        <InfoInputVue title="계좌 번호" v-model="consentNumber"/>
      </div>
    </div>
    <div class="info-part-box">
      <span class="part-title">자동 결제 동의서 등록</span>
      <span class="info-guide" v-if="paymentTypeIdx === 0" >※ 실시간 CMS 결제를 사용하지 않는 계약입니다.</span>
      <span class="info-guide" v-if="paymentTypeIdx === 1 && isEasyConsentIdx === 1">※ 간편동의를 사용 중입니다.</span>
      <div class="info-part" v-if="paymentTypeIdx === 1 && isEasyConsentIdx === 0">
        <span class="info-guide">※ 서명 정보가 포함된 동의서를 등록해주세요 (서명 이미지 파일만 등록 가능)</span>
      </div>
    </div>
  </div>
</template>

<script>
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';
import { useConsentStore } from '@/stores/contract/consent';

export default {
  name: 'ContractChooseInfoVue',
  components: {
    TitleSelectVue,
    InfoInputVue
  },
  data() {
    return {
      isSubscriptionIdx: 0,
      isSubscription: [
        { name: '정기', value: 'true' },
        { name: '단기', value: 'false' },
      ],
      invoiceTypeIdx: 0,
      invoiceType: [
        { name: '자동 청구', value: 1 },
        { name: '수동 청구', value: 2 },
      ],
      paymentTypeIdx: 0,
      paymentType: [
        { name: '납부자 결제', value: 1 },
        { name: '실시간 CMS', value: 2 },
      ],
      isEasyConsentIdx: 0,
      isEasyConsent: [
        { name: '미사용', value: false },
        { name: '사용', value: true },
      ]
    }
  },
  computed: {
    ...mapStores(useContractCreateStore),
    ...mapStores(useConsentStore),
    contractCycle: {
      get() {
        return this.contractCreateStore.contractCycle;
      },
      set(value) {
        this.contractCreateStore.contractCycle = value;
      }
    },
    paymentDueCycle: {
      get() {
        return this.contractCreateStore.paymentDueCycle;
      },
      set(value) {
        this.contractCreateStore.paymentDueCycle = value;
      }
    },
    consentOwner: {
      get() {
        return this.consentStore.owner;
      },
      set(value) {
        this.consentStore.owner = value;
      }
    },
    consentBank: {
      get() {
        return this.consentStore.bank;
      },
      set(value) {
        this.consentStore.bank = value;
      }
    },
    consentNumber: {
      get() {
        return this.consentStore.number;
      },
      set(value) {
        this.consentStore.number = value;
      }
    }
  },
  methods: {
    setSubscription(idx) {
      this.isSubscriptionIdx = idx;
      this.contractCreateStore.setIsSubscription(this.isSubscription[this.isSubscriptionIdx]);
    },
    setInvoiceType(idx) {
      this.invoiceTypeIdx = idx;
      this.contractCreateStore.setInvoiceType(this.invoiceType[this.invoiceTypeIdx]);
    },
    setPaymentType(idx) {
      this.paymentTypeIdx = idx;
      this.contractCreateStore.setPaymentType(this.paymentType[this.paymentTypeIdx]);
      if (this.paymentTypeIdx === 0) {
        this.isEasyConsentIdx = 0;
        this.isEasyConsent = [
          { name: '미사용', value: false },
        ]
      } else if (this.paymentTypeIdx === 1) {
        this.isEasyConsentIdx = 1;
        this.isEasyConsent = [
          { name: '직접 등록', value: false },
          { name: '사용', value: true },
        ]
      }
    },
    setEasyConsent(idx) {
      this.isEasyConsentIdx = idx;
      this.contractCreateStore.setIsEasyConsent(this.isEasyConsent[this.isEasyConsentIdx]);
    }
  },
  mounted() {
    this.setSubscription(0);
    this.setInvoiceType(0);
    this.setPaymentType(0);
    this.setEasyConsent(0);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/contract/choose-box.scss';

.right-side {
  background-color: white;
  padding: 80px;
  border-radius: 10px;
  box-shadow: $base-shadow;
}

.info-part-box {
  @include flex-box(column, center, 20px);
  width: 100%;

  .info-guide {
    font-weight: bold;
    color: $input-color
  }

  .part-title {
    font-size: 24px;
    font-weight: bold;
  }

  .info-part {
    @include flex-box(column, center, 30px);
    width: 100%;
    padding: 30px;
    border-radius: 10px;
    border: $theme-color solid 3px;

    .info-part-row {
      @include flex-box(row, center, 20px);
      width: 100%;
    }
  }
}
</style>
