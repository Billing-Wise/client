import { defineStore } from 'pinia'

export const useInvoiceDetailStore = defineStore('invoiceDetail', {
  state() {
    return {
      data: {
        contractId: null,
        invoiceId: null,
        paymentType: {
          id: null,
          name: null
        },
        invoiceType: {
          id: null,
          name: null
        },
        paymentStatus: {
          id: null,
          name: null
        },
        item: {
          itemId: null,
          name: null,
          price: null,
          amount: null
        },
        member: {
          memberId: null,
          name: null,
          email: null,
          phone: null
        },
        chargeAmount: null,
        isSubscription: null,
        contractDate: null,
        dueDate: null,
        createdAt: null,
        updatedAt: null
      }
    }
  },
  actions: {
    setData(data) {
      this.data = data
    }
  }
})
