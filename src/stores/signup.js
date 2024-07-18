import { defineStore } from 'pinia'

export const useAuthStore = defineStore('signup', {
  state() {
    return {
      email: '',
      phone: '',
      password: '',
      name: '',
      authCode: '',
    }
  },
  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['isLoggedIn']
      }
    ]
  }
})