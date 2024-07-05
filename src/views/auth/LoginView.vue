<template>
  <div class="left-layout">
    <h1>로그인</h1>
    <div class="login-form">
      <div class="input-box">
        <auth-input-vue title="이메일" inputType="text"/>
        <auth-input-vue title="비밀번호" inputType="password"/>
      </div>
      <div class="button-box">
        <auth-button-vue title="로그인" :clickFunc="login"/>
        <div class="guide-line">
          <span>아이디 / 비밀번호 찾기</span>
          <span @click="goCertify">사용자 등록</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginView',
  components: {
    AuthButtonVue,
    AuthInputVue,
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    login() {
      this.authStore.login();
      this.$router.replace({ name: 'home' });
    },
    goCertify() {
      this.$router.push({ name : 'certify' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('@/assets/scss/auth.scss');
</style>