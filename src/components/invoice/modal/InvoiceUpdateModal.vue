<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal" />
        <div class="modal-main">
          <TitleSelectVue title="결제 수단" :selectedIdx="paymentTypeIdx" :keywordArr="paymentType"
            :choiceFunc="setPaymentType" />
          <InfoInputVue title="청구금" v-model="chargeAmount" type="number" />
          <InfoInputVue title="결제일" type="date" v-model="contractDate" />
          <InfoInputVue title="납부기한" type="date" v-model="dueDate" />
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="() => updateInvoice()" />
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import { mapStores } from 'pinia';
import { useInvoiceDetailStore } from '@/stores/invoice/invoiceDetail';
import { toInputDateFromDateTime } from '@/utils/formatter';
import { editInvoice } from '@/utils/invoice';

export default {
  name: 'InvoiceUpdateModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue,
    InfoInputVue,
    TitleSelectVue
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '청구 수정',
      errorMsg: '',
      name: '',
      paymentTypeIdx: 0,
      paymentType: [
        { name: '납부자 결제', value: 1 },
        { name: '실시간 CMS', value: 2 },
      ],
      chargeAmount: null,
      contractDate: null,
      dueDate: null,
    }
  },
  computed: {
    ...mapStores(useInvoiceDetailStore),
  },
  watch: {
    isVisible(newVal) {
      if (newVal) this.showData();
    },
  },
  methods: {
    // 현재 데이터 표시
    async showData() {
      this.chargeAmount = this.invoiceDetailStore.data.chargeAmount;
      this.paymentTypeIdx = this.paymentType.findIndex((i) => i.value === this.invoiceDetailStore.data.paymentType.id);
      this.contractDate = toInputDateFromDateTime(this.invoiceDetailStore.data.contractDate);
      this.dueDate = toInputDateFromDateTime(this.invoiceDetailStore.data.dueDate);
    },
    setPaymentType(idx) {
      this.paymentTypeIdx = idx;
    },
    // 청구 수정
    async updateInvoice() {
      let editSuccess = true;

      // 상품 정보 수정
      const data = {
        "paymentTypeId": this.paymentType[this.paymentTypeIdx].value,
        "chargeAmount": this.chargeAmount,
        "contractDate": this.contractDate,
        "dueDate": this.dueDate
      };

      const result = await editInvoice(this.invoiceDetailStore.data.invoiceId, data);

      if (result.code !== 200) {
        this.errorMsg = result.message;
        editSuccess = false;
      }

      // 모달창 종료
      if (editSuccess) this.closeModal();
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';
</style>