<template>
  <h1>로그인</h1>
  <div class="login-form">
    <div class="input-box">
      <auth-input-vue title="이메일" inputType="text" v-model="email" @keydown.enter="login"/>
      <auth-input-vue title="비밀번호" inputType="password" v-model="password" @keydown.enter="login"/>
    </div>
    <div class="button-box">
      <span class="warning-msg" v-show="invalidInput">{{ invalidMsg }}</span>
      <auth-button-vue title="로그인" :clickFunc="login" />
      <div class="guide-line">
        <span>아이디 / 비밀번호 찾기</span>
        <span @click="signup">사용자 등록</span>
      </div>
    </div>
  </div>
</template>

<script>
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authAxios } from '@/utils/axios';

export default {
  name: 'LoginView',
  components: {
    AuthButtonVue,
    AuthInputVue,
  },
  data() {
    return {
      email: '',
      password: '',
      invalidMsg: '',
      invalidInput: false
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    async login() {
      const data = {
        "email": this.email,
        "password": this.password
      };

      const result = await authAxios.post('auth/login', data)

      if (result.code == 200) {
        this.authStore.login();
        this.$router.push({ name: 'home' });
      } else {
        this.invalidMsg = result.message;
        this.invalidInput = true;
      }
    },
    signup() {
      this.$router.push({ name: 'signup' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/auth/auth.scss');
</style>