<template>
  <div class="root-container">
    <div class="left-side">
      <InvoiceInfoVue/>
    </div>
    <div class="right-side">
      <PaymentStatusBarVue/>
      <PaymentInfoVue/>
      <div class="btn-box" v-if="invoiceDetailStore.data.paymentStatus.id !== 2">
        <ThemeWideBtnVue title="청구서 발송" 
        v-if="invoiceDetailStore.data.paymentType.id === 1"
          :func="sendInvoice" />
        <SuccessWideBtnVue title="수정" :func="() => operateEditModal(true)"/>
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)"/>
      </div>
      <ThemeWideBtnVue title="결제 취소" 
        v-if="invoiceDetailStore.data.paymentStatus.id === 2"
        :func="() => operateDeletePaymentModal(true)"/>
    </div>
  </div>
  <InvoiceUpdateModalVue :isVisible="editModalVisible" :closeModal="() => operateEditModal(false)" />
  <InvoiceDeleteModalVue :isVisible="deleteModalVisible" :closeModal="() => operateDeleteModal(false)" />
  <PaymentDeleteModalVue :isVisible="deletePaymentModalVisible" :closeModal="() => operateDeletePaymentModal(false)" />
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue'
import InvoiceInfoVue from '@/components/invoice/detail/InvoiceInfo.vue'
import PaymentInfoVue from '@/components/invoice/detail/PaymentInfo.vue'
import PaymentStatusBarVue from '@/components/invoice/detail/PaymentStatusBar.vue'
import InvoiceUpdateModalVue from '@/components/invoice/modal/InvoiceUpdateModal.vue'
import InvoiceDeleteModalVue from '@/components/invoice/modal/InvoiceDeleteModal.vue'
import PaymentDeleteModalVue from '@/components/invoice/modal/PaymentDeleteModal .vue'
import { mapStores } from 'pinia'
import { usePaymentStore } from '@/stores/invoice/payment'
import { sendInvoice } from '@/utils/invoice'
import { useInvoiceDetailStore } from '@/stores/invoice/invoiceDetail'
import { getInvoice } from '@/utils/invoice';


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    SuccessWideBtnVue,
    InvoiceInfoVue,
    PaymentInfoVue,
    PaymentStatusBarVue,
    InvoiceUpdateModalVue,
    InvoiceDeleteModalVue,
    PaymentDeleteModalVue
  },
  data() {
    return {
      deleteModalVisible: false,
      editModalVisible: false,
      deletePaymentModalVisible: false,
    }
  },  
  computed: {
    ...mapStores(useInvoiceDetailStore),
    ...mapStores(usePaymentStore),
  },
  methods: {
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    operateEditModal(value) {
      this.editModalVisible = value;
    },
    operateDeletePaymentModal(value) {
      this.deletePaymentModalVisible = value;
    },
    async sendInvoice() {
      const result = await sendInvoice(this.$route.params.id);
      if (result.code !== 200) {
        // 예외 처리
      }
    },
  },
  async created() {
    this.invoiceDetailStore.$reset();
    const result = await getInvoice(this.$route.params.id);
    if (result.code === 404) {
      this.$router.push({ name: 'noData' });
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";
.root-container {
  @include flex-box(row, center, 100px);
  @include root-container;
  padding: 60px 50px;
}

.left-side {
  @include flex-box(column, center, 20px);
  box-sizing: border-box;
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
  width: 700px;
  height: 100%;
  min-height: 700px;
  padding: 30px 0;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}
</style>