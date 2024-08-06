<template>
  <div class="contract-create">
    <div @click="() => contractCreateStore.setSelectingMember(true)" class="info-box">
      <span class="title">회원 정보</span>
      <div class="double-info">
        <TitleInfoVue title="이름" :info="contractCreateStore.member.name" />
        <TitleInfoVue title="전화번호" :info="contractCreateStore.member.phone" />
      </div>
      <TitleInfoVue title="이메일" :info="contractCreateStore.member.email" />
    </div>
    <div @click="() => contractCreateStore.setSelectingItem(true)" class="info-box">
      <span class="title">상품 정보</span>
      <TitleInfoVue title="이름" :info="contractCreateStore.item.name" />
      <div class="double-info" @click.stop>
        <NumberInputVue title="가격" unit="원" v-model="item.price"/>
        <NumberInputVue title="수량" unit="개" v-model="item.count"/>
      </div>
      <TitleInfoVue title="총 금액" :info="`${currentTotalPrice} 원`" />
    </div>
    <div class="info-box">
      <span class="title">계약 정보</span>
      <div class="double-info">
        <NumberInputVue title="약정일" unit="일" v-model="contractCycle"/>
        <NumberInputVue title="납부 기한" unit="일" v-model="paymentDueCycle"/>
      </div>
      <div class="double-info">
        <TitleSelectVue title="구독 여부" 
            :selectedIdx="contractCreateStore.isSubscriptionIdx" 
            :keywordArr="contractCreateStore.isSubscription"
            :choiceFunc="setSubscription" />
          <TitleSelectVue title="청구 생성" 
            :selectedIdx="contractCreateStore.invoiceTypeIdx" 
            :keywordArr="contractCreateStore.invoiceType"
            :choiceFunc="setInvoiceType" />
      </div>
      <div class="double-info">
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
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';
import TitleInfoVue from '@/components/common/info/TitleInfo.vue';
import NumberInputVue from '@/components/common/input/NumberInput.vue';
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import { formatNumber } from '@/utils/formatter';

export default {
  name: 'ContractCreateInfoVue',
  components: {
    TitleInfoVue,
    NumberInputVue,
    TitleSelectVue
  },
  computed: {
    ...mapStores(useContractCreateStore),
    currentTotalPrice() {
      return formatNumber(this.contractCreateStore.item.price * this.contractCreateStore.item.count)
    },
    // 아이템 개수 및 가격 설정
    item: {
      get() {
        return this.contractCreateStore.item;
      },
      set(value) {
        this.contractCreateStore.item.price = value.price;
        this.contractCreateStore.item.count = value.count;
      }
    },
    // 약정일 설정
    contractCycle: {
      get() {
        return this.contractCreateStore.contractCycle;
      },
      set(value) {
        this.contractCreateStore.contractCycle = value;
      }
    },
    // 납부기한 설정
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
.contract-create {
  @include flex-box(column, center, 25px);
  width: 100%;
}

.info-box {
  @include flex-box(column, space-between, 20px);
  width: 100%;
  padding: 20px;
  border: $theme-color solid 2px;
  border-radius: 10px;
  transition: all 0.5s;
  cursor: pointer;

  &:hover{
    box-shadow: 0 0 20px rgba($theme-color, 1);
  }

  .title {
    font-size: 22px;
    font-weight: bold
  }

  .double-info {
    @include flex-box(row, space-between, 20px);
    width: 100%;
  }
}

.info-box:last-child {
  &:hover {
    box-shadow: none;
  }
  cursor: auto;
}

.active {
  box-shadow: 0 0 20px rgba($theme-color, 1);
}
</style>