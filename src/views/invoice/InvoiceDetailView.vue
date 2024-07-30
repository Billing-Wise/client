<template>
  <div class="root-container">
    <div class="left-side">
      <InvoiceInfoVue/>
    </div>
    <div class="right-side">
      <PaymentStatusBarVue/>
      <PaymentInfoVue/>
      <div class="btn-box" v-if="!paymentStore.paid">
        <ThemeWideBtnVue title="청구서 발송"/>
        <SuccessWideBtnVue title="수정"/>
        <WarningWideBtnVue title="삭제"/>
      </div>
      <ThemeWideBtnVue title="청구서 발송 취소" v-if="paymentStore.paid"/>
    </div>
  </div>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue'
import InvoiceInfoVue from '@/components/invoice/detail/InvoiceInfo.vue'
import PaymentInfoVue from '@/components/invoice/detail/PaymentInfo.vue'
import PaymentStatusBarVue from '@/components/invoice/detail/PaymentStatusBar.vue'
import { mapStores } from 'pinia'
import { useInvoiceListStore } from '@/stores/invoice/invoiceList'
import { usePaymentStore } from '@/stores/invoice/payment'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    SuccessWideBtnVue,
    InvoiceInfoVue,
    PaymentInfoVue,
    PaymentStatusBarVue
  },
  data() {
    return {
      deleteModalVisible: false,
      editModalVisable: false,
    }
  },  
  computed: {
    ...mapStores(useInvoiceListStore),
    ...mapStores(usePaymentStore),
  },
  methods: {
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    operateEditModal(value) {
      this.editModalVisable = value;
    },
    sendPayment() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";
.root-container {
  @include flex-box(row, space-between, 100px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 60px 130px;
}

.left-side {
  @include flex-box(column, center, 20px);
  min-width: 700px;
  width: 40%;
  min-height: 100%;
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

}

.right-side {
  @include flex-box(column, space-between, 20px);
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px 0;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}
</style>