import router from '@/router';
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
    logout() {
      authAxios.post('auth/logout');
      this.isLoggedIn = false;
      router.push({name: 'login'})
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
