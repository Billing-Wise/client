import { defineStore } from 'pinia'

export const usePaymentInfoStore = defineStore('paymentInfo', {
  state: () => ({
    infoMap: {}
  }),
  
  actions: {
    setInfo(invoiceId, info) {
      this.infoMap[invoiceId] = info
    },
    getInfo(invoiceId) {
      return this.infoMap[invoiceId] || null
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['infoMap']
      }
    ]
  }
})