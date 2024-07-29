import { defineStore } from 'pinia'

export const useConsentAccountInfoStore = defineStore('consentAccountInfo', {
  state: () => ({
    infoMap: {}
  }),
  actions: {
    setInfo(contractId, info) {
      this.infoMap[contractId] = info
    },
    getInfo(contractId) {
      return this.infoMap[contractId] || null
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