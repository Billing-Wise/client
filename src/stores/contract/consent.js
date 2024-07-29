import { defineStore } from 'pinia'

export const useConsentStore = defineStore('consent', {
  state() {
    return {
      owner: '',
      bank: '',
      number: ''
    }
  },
  actions: {
    setStep(info) {
      this.owner = info.owner;
      this.bank = info.bank;
      this.number = info.number;
    },
  }
})