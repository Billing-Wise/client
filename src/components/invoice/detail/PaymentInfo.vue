<template>
  <div class="payment-info">
    <span class="title">납부 내역</span>
    <div class="info-text" v-show="!paymentStore.paid">
      납부 내역이 존재하지 않습니다.
    </div>
    <div class="info-box" v-show="paymentStore.paid">
      <div class="double-info">
        <TitleInfoVue title="납부일" :info="createAt"/>
        <TitleInfoVue title="납부 수단" :info="paymentMethod"/>
      </div>
      <TitleInfoVue title="납부금" :info="`${paymentStore.data.payAmount}원`"/>
    </div>
    <div class="info-box" v-show="paymentStore.data.paymentMethod === 'CARD'">
      <div class="double-info">
        <TitleInfoVue title="카드사" :info="paymentStore.data.company"/>
        <TitleInfoVue title="카드 소유주" :info="paymentStore.data.owner"/>
      </div>
      <TitleInfoVue title="카드 번호" :info="paymentStore.data.number"/>
    </div>
    <div class="info-box" v-show="paymentStore.data.paymentMethod === 'ACCOUNT'">
      <div class="double-info">
        <TitleInfoVue title="은행명" :info="paymentStore.data.bank"/>
        <TitleInfoVue title="계좌 소유주" :info="paymentStore.data.owner"/>
      </div>
      <TitleInfoVue title="계좌 번호" :info="paymentStore.data.number"/>
    </div>
  </div>
</template>

<script>
import { usePaymentStore } from '@/stores/invoice/payment';
import { getPayment } from '@/utils/payement';
import { mapStores } from 'pinia';
import TitleInfoVue from '../../common/info/TitleInfo.vue';
import { toDateFromDateTime } from '@/utils/formatter';

export default {
  name: 'PaymentInfoVue',
  components: {
    TitleInfoVue
  },
  computed: {
    ...mapStores(usePaymentStore),
    paymentMethod() {
      if (this.paymentStore.data.paymentMethod === 'CARD') {
        return '카드';
      } else if (this.paymentStore.data.paymentMethod === 'ACCOUNT') {
        return '계좌 이체';
      } else {
        return null;
      }
    },
    createAt() {
      return toDateFromDateTime(this.paymentStore.data.createAt)
    }
  },
  async created() {
    this.paymentStore.$reset();
    await getPayment(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
.payment-info {
  @include flex-box(column, center, 30px);
  width: 700px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .info-text {
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
    color: $input-color
  }
}

.info-box {
  @include flex-box(column, center, 10px);
  width: 100%;
  padding: 20px;
  border: $theme-color solid 2px;
  border-radius: 10px;

  .double-info {
    @include flex-box(row, center, 20px);
    width: 100%;
  }
}
</style>