<template>
  <div class="invoice-info">
    <div class="info-box">
      <span class="title">회원 정보</span>
      <div class="double-info">
        <TitleInfoVue title="이름" :info="invoiceDetailStore.data.member.name" />
        <TitleInfoVue title="전화번호" :info="invoiceDetailStore.data.member.phone" />
      </div>
      <TitleInfoVue title="이메일" :info="invoiceDetailStore.data.member.email" />
    </div>
    <div class="info-box">
      <span class="title">상품 정보</span>
      <TitleInfoVue title="이름" :info="invoiceDetailStore.data.item.name" />
      <div class="double-info">
        <TitleInfoVue title="금액" :info="`${invoiceDetailStore.data.item.price}원`" />
        <TitleInfoVue title="수량" :info="`${invoiceDetailStore.data.item.amount} 개`"  />
      </div>
    </div>
    <div class="info-box">
      <span class="title">계약 정보</span>

      <div class="double-info">
        <TitleInfoVue title="계약ID" :info="String(invoiceDetailStore.data.contractId)" />
        <TitleInfoVue title="청구ID" :info="String(invoiceDetailStore.data.invoiceId)" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="청구 생성" :info="invoiceDetailStore.data.invoiceType.name" />
        <TitleInfoVue title="결제 수단" :info="invoiceDetailStore.data.paymentType.name" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="구독 여부" :info="subscription" />
        <TitleInfoVue title="청구액" :info="`${invoiceDetailStore.data.chargeAmount} 원`" />
      </div>
      <div class="double-info">
        <TitleInfoVue title="약정일" :info="contractDate" />
        <TitleInfoVue title="납부 기한" :info="dueDate" />
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
import { toDateFromDateTime } from '@/utils/date';
import { getInvoice } from '@/utils/invoice';
import TitleInfoVue from '../../common/info/TitleInfo.vue';
import { useInvoiceDetailStore } from '@/stores/invoice/invoiceDetail';

export default {
  name: 'ContractInfoVue',
  components: {
    TitleInfoVue
  },
  computed: {
    ...mapStores(useInvoiceDetailStore),
    subscription() {
      return this.invoiceDetailStore.data.isSubscription? '정기': '단기';
    },
    contractDate() {
      return toDateFromDateTime(this.invoiceDetailStore.data.contractDate);
    },
    dueDate() {
      return toDateFromDateTime(this.invoiceDetailStore.data.dueDate);
    },
    createdAt() {
      return toDateFromDateTime(this.invoiceDetailStore.data.createdAt);
    },
    updatedAt() {
      return toDateFromDateTime(this.invoiceDetailStore.data.updatedAt);
    },
  },
  async created() {
    const result = await getInvoice(this.$route.params.id);

    if (result.code !== 200) {
      // 예외 처리
    }
  }

}
</script>

<style lang="scss" scoped>
.invoice-info {
  @include flex-box(column, space-between, 20px);
  width: 100%;
  height: 100%;
}

.info-box {
  @include flex-box(column, center, 10px);
  width: 100%;
  padding: 20px;
  border: $theme-color solid 2px;
  border-radius: 10px;

  .title {
    font-size: 22px;
    font-weight: bold
  }

  .double-info {
    @include flex-box(row, center, 20px);
    width: 100%;
  }
}
</style>