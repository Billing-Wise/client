<template>
  <div class="payment-status-bar">
    <div :class="{ 'bar-item': true, 'waiting-bar': invoiceDetailStore.data.paymentStatus.id === 3 }">
      수납 대기
    </div>
    <div :class="{ 'bar-item': true, 'success-bar': invoiceDetailStore.data.paymentStatus.id === 2 }">
      수납 완료
    </div>
    <div :class="{ 'bar-item': true, 'warning-bar': invoiceDetailStore.data.paymentStatus.id === 1 }">
      미납
    </div>
  </div>
</template>

<script>
import { useInvoiceDetailStore } from '@/stores/invoice/invoiceDetail';
import { mapStores } from 'pinia';

export default {
  name: 'PaymentStatusBarVue',
  computed: {
    ...mapStores(useInvoiceDetailStore),
  },
}
</script>

<style lang="scss" scoped>
.payment-status-bar {
  @include flex-box(row, space-between, 0px);
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  border: 3px solid $theme-color;
  overflow: hidden;

  .bar-item {
    @include flex-box(row, center, 0px);
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }

  .bar-item:first-child {
    border-right: 3px solid $theme-color;
  }

  .bar-item:last-child {
    border-left: 3px solid $theme-color;
  }
}

.waiting-bar {
  background-color: $theme-color;
}

.success-bar {
  background-color: $theme-color;
}

.warning-bar {
  background-color: $warning-color;
}
</style>