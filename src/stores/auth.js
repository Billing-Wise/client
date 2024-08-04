import router from '@/router';
import { authAxios } from '@/utils/axios';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      isLoggedIn: false,
      data: {
        clientId: 0,
        clientName : '',
        clientPhone : '',
        userEmail : '',
        userId : 0,
        userName : '홍길동',
        userPhone : '01011111111'
      },
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
      this.data = data
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
