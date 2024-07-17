<template>
    <h1>사용자 등록</h1>
    <div class="login-form">
      <div class="input-box">
        <auth-input-vue title="업체 코드" inputType="password"/>
      </div>
      <div class="button-box">
        <auth-button-vue title="업체 인증" :clickFunc="cetificate"/>
        <div class="guide-line">
          <span>아이디 / 비밀번호 찾기</span>
          <span @click="goLogin">로그인</span>
        </div>
      </div>
    </div>
</template>

<script>
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'

export default {
  name: 'EmailCertifyView',
  components: {
    AuthButtonVue,
    AuthInputVue,
  },
  methods: {
    goLogin() {
      this.$router.push({name: 'login'})
    },
    cetificate() {
      this.$router.push({name: 'signup'})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('@/assets/scss/auth/auth.scss');
</style>