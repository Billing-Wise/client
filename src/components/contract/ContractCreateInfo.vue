<template>
  <div class="contract-create">
    <div @click="contractCreateStore.setStep(0)"
    :class="{ 'info-box': true, 'active': contractCreateStore.step === 0 }">
      <span class="title">회원 정보</span>
      <div class="double-info">
        <TitleInfoVue title="이름" :info="contractCreateStore.member.name" />
        <TitleInfoVue title="전화번호" :info="contractCreateStore.member.phone" />
      </div>
      <TitleInfoVue title="이메일" :info="contractCreateStore.member.email" />
    </div>
    <div @click="contractCreateStore.setStep(1)"
    :class="{ 'info-box': true, 'active': contractCreateStore.step === 1 }">
      <span class="title">상품 정보</span>
      <TitleInfoVue title="이름" :info="contractCreateStore.item.name" />
      <div class="double-info">
        <TitleInfoVue title="금액" :info="`${contractCreateStore.item.price} 원`" />
        <TitleInfoVue title="수량" :info="`${contractCreateStore.item.count} 개`"  />
      </div>
      <TitleInfoVue title="총 금액" :info="`${contractCreateStore.item.price * contractCreateStore.item.count} 원`" />
    </div>
    <div @click="contractCreateStore.setStep(2)"
    :class="{ 'info-box': true, 'active': contractCreateStore.step === 2 }">
      <span class="title">계약 정보</span>
      <div class="double-info">
        <TitleInfoVue title="약정일" :info="`매월 ${contractCreateStore.contractCycle} 일`" />
        <TitleInfoVue title="납부 기한" :info="`${contractCreateStore.paymentDueCycle} 일`" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="구독 여부" :info="contractCreateStore.isSubscriptionName" />
        <TitleInfoVue title="청구 생성" :info="contractCreateStore.invoiceTypeName" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="결제 수단" :info="contractCreateStore.paymentTypeName" />
        <TitleInfoVue title="간편 동의" :info="contractCreateStore.isEasyConsentName" />
      </div>
    </div>
  </div>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';
import TitleInfoVue from '../common/info/TitleInfo.vue';

export default {
  name: 'ContractCreateInfoVue',
  components: {
    TitleInfoVue
  },
  computed: {
    ...mapStores(useContractCreateStore),
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

.active {
  box-shadow: 0 0 20px rgba($theme-color, 1);
}
</style>