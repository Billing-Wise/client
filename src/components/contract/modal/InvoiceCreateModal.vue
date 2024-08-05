<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal" />
        <div class="modal-main">
          <TitleSelectVue title="결제 수단" :selectedIdx="invoiceCreateStore.paymentTypeIdx"
            :keywordArr="invoiceCreateStore.paymentType" :choiceFunc="setPaymentType" />
          <InfoInputVue title="청구금" v-model="chargeAmount" type="number" />
          <InfoInputVue title="결제일" type="date" v-model="contractDate" />
          <InfoInputVue title="납부기한" type="date" v-model="dueDate" />
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="createInvoice" />
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../../common/modal/ModalHeader.vue';
import ModalFooterVue from '../../common/modal/ModalFooter.vue';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import TitleSelectVue from '@/components/common/select/TitleSelect.vue';
import { useInvoiceCreateStore } from '@/stores/invoice/invoiceCreate';
import { useContractDetailStore } from '@/stores/contract/contractDetail';
import { mapStores } from 'pinia';
import { createInvoice } from '@/utils/invoice';

export default {
  name: 'InvoiceCreateModalVue',
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
      title: '청구 생성',
      errorMsg: '',
    }
  },
  computed: {
    ...mapStores(useInvoiceCreateStore),
    ...mapStores(useContractDetailStore),
    chargeAmount: {
      get() {
        return this.invoiceCreateStore.data.chargeAmount;
      },
      set(value) {
        this.invoiceCreateStore.data.chargeAmount = value;
      }
    },
    contractDate: {
      get() {
        return this.invoiceCreateStore.data.contractDate;
      },
      set(value) {
        this.invoiceCreateStore.data.contractDate = value;
      }
    },
    dueDate: {
      get() {
        return this.invoiceCreateStore.data.dueDate;
      },
      set(value) {
        this.invoiceCreateStore.data.dueDate = value;
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) this.selectContact();
    },
  },
  methods: {
    // 현재 데이터 표시
    selectContact() {
      this.invoiceCreateStore.$reset();
      this.invoiceCreateStore.setContract(this.contractDetailStore.data)
    },
    setPaymentType(idx) {
      this.invoiceCreateStore.setPaymentTypeIdx(idx)
    },
    async createInvoice() {
      const result = await createInvoice();

      if (result.code === 200) {
        this.$router.push(`/invoice/${result.data}`);
      } else {
        this.errorMsg = result.message;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';
</style>