import { toInputDateFromDateTime } from '@/utils/formatter'
import { defineStore } from 'pinia'

const today = toInputDateFromDateTime(new Date());

export const useInvoiceCreateStore = defineStore('invoiceCreate', {
  state() {
    return {
      paymentTypeIdx: 0,
      paymentType: [
        { name: '납부자 결제', value: 1 },
        { name: '실시간 CMS', value: 2 },
      ],
      data: {
        contractId : null,
        paymentTypeId: 1,
        chargeAmount : 1,
        contractDate : today,
        dueDate : today
      }
    }
  },
  actions: {
    setContract(data) {
      this.data.contractId = data.id;
      this.data.chargeAmount = data.chargeAmount;
      this.data.paymentTypeId = data.paymentType.id;
      this.paymentTypeIdx = this.paymentType.findIndex((i) => i.value === data.paymentType.id);
    },
    setPaymentTypeIdx(idx) {
      this.paymentTypeIdx = idx;
      this.data.paymentTypeId = this.paymentType[this.paymentTypeIdx].value;
    }
  }
})
