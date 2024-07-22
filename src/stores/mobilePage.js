import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobilePage', {
  state() {
    return {
      pageName : ""
    }
  },
  actions: {
    setPageName(pageName) {
      this.pageName = pageName;
    }
  },
})