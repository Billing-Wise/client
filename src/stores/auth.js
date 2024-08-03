import router from '@/router';
import { authAxios } from '@/utils/axios';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      isLoggedIn: false,
      clientName: '',
      userName: ''
    }
  },
  actions: {
    login() {
      this.$reset();
      this.isLoggedIn = true;
    },
    logout() {
      authAxios.post('auth/logout');
      this.isLoggedIn = false;
      router.push({name: 'login'})
    },
    setUserData(data) {
      this.clientName = data.clientName
      this.userName = data.userName
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
