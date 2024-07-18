import { authAxios } from '@/utils/axios';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      isLoggedIn: false
    }
  },
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    async logout() {
      await authAxios.post('auth/logout');
      this.isLoggedIn = false;
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
