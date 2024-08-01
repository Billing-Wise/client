<template>
  <div class="contract-create">
    <div class="info-box">
      <span class="title">회원 정보</span>
      <div class="double-info">
        <TitleInfoVue title="이름" :info="contractDetailStore.data.member.name" />
        <TitleInfoVue title="전화번호" :info="contractDetailStore.data.member.phone" />
      </div>
      <TitleInfoVue title="이메일" :info="contractDetailStore.data.member.email" />
    </div>
    <div class="info-box">
      <span class="title">상품 정보</span>
      <TitleInfoVue title="이름" :info="contractDetailStore.data.item.name" />
      <div class="double-info">
        <TitleInfoVue title="금액" :info="`${contractDetailStore.data.item.price}원`" />
        <TitleInfoVue title="수량" :info="`${contractDetailStore.data.item.amount} 개`"  />
      </div>
    </div>
    <div class="info-box">
      <span class="title">계약 정보</span>
      <div class="double-info">
        <TitleInfoVue title="계약ID" :info="String(contractDetailStore.data.id)" />
        <TitleInfoVue title="총 금액" :info="`${contractDetailStore.data.chargeAmount} 원`" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="약정일" :info="`매월 ${contractDetailStore.data.contractCycle} 일`" />
        <TitleInfoVue title="납부 기한" :info="`${contractDetailStore.data.paymentDueCycle} 일`" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="총 청구금" :info="`${contractDetailStore.data.totalChargeAmount}원`" />
        <TitleInfoVue title="총 미납금" :info="`${contractDetailStore.data.totalUnpaidAmount}원`" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="청구 생성" :info="contractDetailStore.data.invoiceType.name" />
        <TitleInfoVue title="결제 수단" :info="contractDetailStore.data.paymentType.name" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="구독 여부" :info="subscription" />
        <TitleInfoVue title="간편 동의" :info="easyConsent" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="생성일" :info="createdAt" />
        <TitleInfoVue title="수정일" :info="updatedAt" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useContractDetailStore } from '@/stores/contract/contractDetail';
import { toDateFromDateTime } from '@/utils/formatter';
import TitleInfoVue from '../common/info/TitleInfo.vue';

export default {
  name: 'ContractInfoVue',
  components: {
    TitleInfoVue
  },
  computed: {
    ...mapStores(useContractDetailStore),
    subscription() {
      return this.contractDetailStore.data.subscription? '정기': '단기';
    },
    easyConsent() {
      return this.contractDetailStore.data.easyConsent? '사용': '미사용';
    },
    createdAt() {
      return toDateFromDateTime(this.contractDetailStore.data.createdAt);
    },
    updatedAt() {
      return toDateFromDateTime(this.contractDetailStore.data.updatedAt);
    },
  },
}
</script>

<style lang="scss" scoped>
.contract-create {
  @include flex-box(column, center, 20px);
  width: 100%;
}

.info-box {
  @include flex-box(column, space-between, 10px);
  width: 100%;
  padding: 20px;
  border: $theme-color solid 2px;
  border-radius: 10px;
  transition: all 0.5s;

  .title {
    font-size: 22px;
    font-weight: bold
  }

  .double-info {
    @include flex-box(row, space-between, 20px);
    width: 100%;
  }
}
</style>