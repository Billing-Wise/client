<template>
    <h1>사용자 등록</h1>
    <div class="login-form">
      <div class="input-box">
        <auth-input-vue title="이메일" inputType="text"/>
        <auth-input-vue title="이메일 인증 코드" inputType="text"/>
        <auth-input-vue title="비밀번호" inputType="password"/>
        <auth-input-vue title="비밀번호 확인" inputType="password"/>
        <auth-input-vue title="이름" inputType="text"/>
        <auth-input-vue title="전화번호" inputType="text"/>
      </div>
      <div class="button-box">
        <auth-button-vue title="사용자 등록" :clickFunc="goLogin"/>
        <div class="guide-line">
          <span></span>
          <span @click="goLogin">취소</span>
        </div>
      </div>
    </div>
</template>

<script>
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'

export default {
  name: 'LoginView',
  components: {
    AuthButtonVue,
    AuthInputVue,
  },
    methods: {
    goLogin() {
      this.$router.push({name: 'login'})
    },
  }
}
</script>

<style lang="scss" scoped>
  @import url('@/assets/scss/auth/auth.scss');
</style>