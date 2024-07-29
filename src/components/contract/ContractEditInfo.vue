<template>
  <div class="contract-create">
    <div class="info-box">
      <span class="title">회원 정보</span>
      <div class="double-info">
        <TitleInfoVue title="이름" :info="contractCreateStore.member.name" />
        <TitleInfoVue title="전화번호" :info="contractCreateStore.member.phone" />
      </div>
      <TitleInfoVue title="이메일" :info="contractCreateStore.member.email" />
    </div>
    <div class="info-box">
      <span class="title">상품 정보</span>
      <TitleInfoVue title="이름" :info="contractCreateStore.item.name" />
      <div class="double-info">
        <InfoInputVue title="금액" type="number" v-model="item.price"/>
        <InfoInputVue title="수량" type="number" v-model="item.count"/>
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
        <TitleInfoVue title="구독 여부" :info="contractCreateStore.isSubscription.name" />
        <TitleInfoVue title="청구 생성" :info="contractCreateStore.invoiceType.name" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="결제 수단" :info="contractCreateStore.paymentType.name" />
        <TitleInfoVue title="간편 동의" :info="contractCreateStore.isEasyConsent.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapStores } from 'pinia';
import TitleInfoVue from '../common/info/TitleInfo.vue';
import InfoInputVue from '../common/input/InfoInput.vue';

export default {
  name: 'ContractEditInfoVue',
  components: {
    TitleInfoVue,
    InfoInputVue
  },
  computed: {
    ...mapStores(useContractCreateStore),
    item: {
      get() {
        return this.contractCreateStore.item;
      },
      set(value) {
        this.contractCreateStore.item.price = value.price;
        this.contractCreateStore.item.count = value.count;
      }
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