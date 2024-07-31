import { defineStore } from 'pinia'

export const useConsentDetailStore = defineStore('consentDetail', {
  state() {
    return {
      isExist: false,
      data: {
        memberId: null,
        owner: null,
        bank: null,
        number: null,
        signUrl: null,
        createdAt: null,
        updatedAt: null
    }
    }
  },
  actions: {
    setIsExist(value) {
      this.isExist = value;
    },
    setData(data) {
      this.data = data;
    },
  }
})