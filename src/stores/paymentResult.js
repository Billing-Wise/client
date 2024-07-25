import { defineStore } from 'pinia';

export const usePaymentResultStore = defineStore('paymentResult', {
  state: () => ({
    resultMap: {}
  }),
  actions: {
    setResult(invoiceId, result) {
      this.resultMap[invoiceId] = result;
    },
    getResult(invoiceId) {
      return this.resultMap[invoiceId] || null;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['resultMap']
      }
    ]
  }
});