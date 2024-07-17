<template>
  <h1>사용자 등록</h1>
  <div class="signup-form">
    <div class="signup-grid">
      <div class="input-box">
        <div class="input-item">
          <auth-input-vue title="이메일" inputType="text" v-model="email.value" />
          <span class="warning-msg" v-show="email.isInValid">{{ email.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-input-vue title="전화번호" inputType="text" v-model="phone.value" />
          <span class="warning-msg" v-show="phone.isInValid">{{ phone.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-input-vue title="비밀번호" inputType="password" v-model="password.value" />
          <span class="warning-msg" v-show="password.isInValid">{{ password.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-input-vue title="이름" inputType="text" v-model="name.value" />
          <span class="warning-msg" v-show="name.isInValid">{{ name.errorMsg }}</span>
        </div>
      </div>
      <div class="input-box">
        <div class="input-item">
          <auth-btn-input-vue title="이메일 인증 코드" inputType="text" buttonTitle="인증" v-model="emailCode.value" />
          <span class="warning-msg" v-show="emailCode.isInValid">{{ emailCode.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-btn-input-vue title="전화번호 인증 코드" inputType="text" buttonTitle="인증" v-model="phoneCode.value" />
          <span class="warning-msg" v-show="phoneCode.isInValid">{{ phoneCode.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-input-vue title="비밀번호 확인" inputType="password" v-model="passwordCheck.value" />
          <span class="warning-msg" v-show="passwordCheck.isInValid">{{ passwordCheck.errorMsg }}</span>
        </div>
        <div class="input-item">
          <auth-input-vue title="회사 코드" inputType="text" v-model="clientCode.value" />
          <span class="warning-msg" v-show="clientCode.isInValid">{{ clientCode.errorMsg }}</span>
        </div>
      </div>
    </div>
    <div class="button-box">
      <auth-button-vue title="완료" :clickFunc="signup" />
      <div class="guide-line">
        <span></span>
        <span @click="cancel">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
import AuthBtnInputVue from '@/components/auth/AuthBtnInput.vue';
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'

class inputValue {
  constructor(value = '', isInValid = false, errorMsg = '') {
    this.value = value;
    this.isInValid = isInValid;
    this.errorMsg = errorMsg;
  }
}

export default {
  name: 'LoginView',
  components: {
    AuthButtonVue,
    AuthInputVue,
    AuthBtnInputVue
  },
  data() {
    return {
      email: new inputValue(),
      emailCode: new inputValue(),
      phone: new inputValue(),
      phoneCode: new inputValue(),
      password: new inputValue(),
      passwordCheck: new inputValue(),
      name: new inputValue(),
      clientCode: new inputValue(),
      isEmailUnique: false,
      emailCodeCheck: false,
      phoneCodeCheck: false
    }
  },
  methods: {
    // 이메일 검증
    emailCheck() {
      let result = true;
      const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

      if (this.email.value.trim() === '') {
        this.email.errorMsg = '이메일을 입력하세요';
        result = false;
      } else if (!email_regex.test(this.email.value)) {
        this.email.errorMsg = '유효하지 않은 이메일 형식입니다.';
        result = false;
      } else if (!this.isEmailUnique) {
        this.email.errorMsg = '이메일 중복 검사를 통과하세요';
        result = false;
      }

      this.email.isInValid=!result;

      return result
    },
    // 이메일 중복 검사
    
    // 회원가입
    signup() {
      let totalValidation = true;
      totalValidation = this.emailCheck();
      console.log(totalValidation)
    },
    // 회원가입 취소
    cancel() {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/auth/auth.scss');
</style>