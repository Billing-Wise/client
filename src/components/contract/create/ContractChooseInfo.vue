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
          <TitleSelectVue title="구독 여부" 
            :selectedIdx="contractCreateStore.isSubscriptionIdx" 
            :keywordArr="contractCreateStore.isSubscription"
            :choiceFunc="setSubscription" />
          <TitleSelectVue title="청구 생성" 
            :selectedIdx="contractCreateStore.invoiceTypeIdx" 
            :keywordArr="contractCreateStore.invoiceType"
            :choiceFunc="setInvoiceType" />
        </div>
        <div class="info-part-row">
          <TitleSelectVue title="결제 수단" 
            :selectedIdx="contractCreateStore.paymentTypeIdx" 
            :keywordArr="contractCreateStore.paymentType"
            :choiceFunc="setPaymentType" />
          <TitleSelectVue title="간편 동의" 
            :selectedIdx="contractCreateStore.isEasyConsentIdx" 
            :keywordArr="contractCreateStore.isEasyConsent"
            :choiceFunc="setEasyConsent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';

export default {
  name: 'ContractChooseInfoVue',
  components: {
    TitleSelectVue,
    InfoInputVue,
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
  },
  methods: {
    setSubscription(idx) {
      this.contractCreateStore.setIsSubscription(idx);
    },
    setInvoiceType(idx) {
      this.contractCreateStore.setInvoiceType(idx);
    },
    setPaymentType(idx) {
      this.contractCreateStore.setPaymentType(idx);
    },
    setEasyConsent(idx) {
      this.contractCreateStore.setIsEasyConsent(idx);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/contract/choose-box.scss';

.right-side {
  background-color: white;
  max-width: 800px;
  padding: 50px;
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
