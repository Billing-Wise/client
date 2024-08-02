import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
  state() {
    return {
      paid: false,
      data: {
        "invoiceId": null,
        "payAmount": null,
        "paymentMethod": null,
        "createAt": null,
        "number": null,
        "owner": null
    }
    }
  },
  actions: {
    setPaid(value) {
      this.paid = value
    },
    setData(data) {
      this.data = data
    }
  }
})
