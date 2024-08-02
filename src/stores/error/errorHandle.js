import { defineStore } from 'pinia'

export const useErrorHandleStore = defineStore('errorHandle', {
  state() {
    return {
      notFound: false,
      notAuthorized: false,
      serverError: false,
    }
  },
  actions: {
    // 404 에러 상태를 설정하는 액션
    setNotFound(value) {
      this.notFound = value;
    },
    // 권한 없음 에러 상태를 설정하는 액션
    setNotAuthorized(value) {
      this.notAuthorized = value;
    },
    // 서버 에러 상태를 설정하는 액션
    setServerError(value) {
      this.serverError = value;
    },
  },
})