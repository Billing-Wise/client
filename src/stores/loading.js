import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state() {
    return {
      isLoading: false,
    }
  },
  actions: {
    setIsLoading(value) {
      this.isLoading = value;
    }
  },
})