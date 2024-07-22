<template>
  <h1>사용자 등록</h1>
  <div class="signup-form">
    <div class="signup-grid">
      <div class="input-left">
        <div class="input-item">
          <auth-btn-input-vue title="이메일" inputType="text" buttonTitle="중복검사" :clickFunc="emailDuplicationCheck"
            v-model="email.value" />
          <div :class="{ 'warning-msg': !email.isValid, 'valid-msg': email.isValid }">{{ email.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-input-vue title="전화번호" inputType="text" v-model="phone.value" />
          <div class="warning-msg">{{ phone.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-input-vue title="비밀번호" inputType="password" v-model="password.value" />
          <div class="warning-msg">{{ password.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-input-vue title="비밀번호 확인" inputType="password" v-model="passwordCheck.value" />
          <div class="warning-msg">{{ passwordCheck.errorMsg }}</div>
        </div>
      </div>
      <div class="input-right">
        <div class="input-item">
          <auth-btn-input-vue title="이메일 인증 코드" 
            :buttonTitle="emailCodeSend ? '인증' : '전송'"
            :clickFunc="emailCodeCheck"
            inputType="text" 
            v-model="emailCode.value" />
          <div :class="{ 'warning-msg': !emailCode.isValid, 'valid-msg': emailCode.isValid }">{{ emailCode.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-btn-input-vue 
            :buttonTitle="phoneCodeSend ? '인증' : '전송'"
            :clickFunc="phoneCodeCheck"
            title="전화번호 인증 코드" 
            inputType="text" 
            v-model="phoneCode.value" />
          <div :class="{ 'warning-msg': !phoneCode.isValid, 'valid-msg': phoneCode.isValid }">{{ phoneCode.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-input-vue title="이름" inputType="text" v-model="name.value" />
          <div class="warning-msg">{{ name.errorMsg }}</div>
        </div>
        <div class="input-item">
          <auth-input-vue title="회사 코드" inputType="text" v-model="clientCode.value" />
          <div class="warning-msg">{{ clientCode.errorMsg }}</div>
        </div>
      </div>
    </div>
    <div class="button-box">
      <auth-button-vue title="완료" :clickFunc="signup" />
      <div class="guide-line">
        <div></div>
        <span @click="cancel">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
import AuthBtnInputVue from '@/components/auth/AuthBtnInput.vue';
import AuthButtonVue from '@/components/auth/AuthButton.vue'
import AuthInputVue from '@/components/auth/AuthInput.vue'
import { InputValue, ValidationTimer } from '@/utils/auth';
import { authAxios } from '@/utils/axios';

export default {
  name: 'LoginView',
  components: {
    AuthButtonVue,
    AuthInputVue,
    AuthBtnInputVue
  },
  data() {
    return {
      email: new InputValue(),
      emailCode: new InputValue(),
      phone: new InputValue(),
      phoneCode: new InputValue(),
      password: new InputValue(),
      passwordCheck: new InputValue(),
      name: new InputValue(),
      clientCode: new InputValue(),
      emailCodeSend: false,
      emailCodeTimer : null,
      phoneCodeSend: false,
      phoneCodeTimer : null,
    }
  },
  watch: {
    'email.value': function () {
      this.email.isValid = false;
      this.email.errorMsg = '';
      this.emailCode.isValid = false;
      this.emailCode.errorMsg = '';
      this.emailCodeSend = false;
      if (this.emailCodeTimer !== null) {
        clearInterval(this.emailCodeTimer.interval)
      }
    },
    'phone.value': function () {
      this.phone.errorMsg = '';
      this.phoneCode.isValid = false;
      this.phoneCode.errorMsg = '';
      this.phoneCodeSend = false;
      if (this.phoneCodeTimer !== null) {
        clearInterval(this.phoneCodeTimer.interval)
      }
    },
    'password.value': function () {
      this.password.errorMsg = '';
    },
    'passwordCheck.value': function () {
      this.passwordCheck.errorMsg = '';
    },
    'name.value': function () {
      this.name.errorMsg = '';
    },
    'clientCode.value': function () {
      this.clientCode.errorMsg = '';
    }
  },
  methods: {
    // 메서드 : 이메일 중복 검사
    async emailDuplicationCheck() {
      const data = { "email": this.email.value };
      const result = await authAxios.post('auth/email/duplication', data);
      this.email.isValid = result.code === 200
      this.email.errorMsg = result.message;
    },
    // 메서드 : 이메일 인증
    async emailCodeCheck() {
      // 이메일 중복 검사 체크
      if (!this.email.isValid) {
        this.emailCode.isValid=false;
        this.emailCode.errorMsg='이메일 중복 검사를 실시해야합니다.';
        return;
      }
      // 전송 로직
      if (!this.emailCodeSend) {
        const data = { "email": this.email.value };
        const result = await authAxios.post('auth/email/code', data);
        if (result.code === 200) {
          this.emailCodeSend = true;
          this.emailCodeTimer = new ValidationTimer(this.emailCode);
          this.emailCodeTimer.startTimer(() => {this.emailCodeSend = false});
        }
      // 인증 로직
      } else if (this.emailCodeSend) {
        const data = {
          'email' : this.email.value,
          'code' : this.emailCode.value
        };
        const result = await authAxios.put('auth/email/code', data);
        if (result.code === 200) {
          clearInterval(this.emailCodeTimer.interval);
          this.emailCode.isValid = true;
          this.emailCode.errorMsg = result.message;
        }
      }
    },
    // 메서드 : 전화번호 인증
    async phoneCodeCheck() {
      // 전송 로직
      if (!this.phoneCodeSend) {
      const data = { 'phone': this.phone.value };
      const result = await authAxios.post('auth/phone/code', data);
      if (result.code === 200) {
        this.phoneCodeSend = true;
        this.phoneCodeTimer = new ValidationTimer(this.phoneCode);
        this.phoneCodeTimer.startTimer(() => {this.phoneCodeSend = false});
      } else {
        this.phone.errorMsg = result.message;
      }
      // 인증 로직
      } else if (this.phoneCodeSend) {
        const data = {
          'phone' : this.phone.value,
          'code' : this.phoneCode.value
        };
        const result = await authAxios.put('auth/phone/code', data);
        if (result.code === 200) {
          clearInterval(this.phoneCodeTimer.interval);
          this.phoneCode.isValid = true;
          this.phoneCode.errorMsg = result.message;
        }
      }
    },
    // 메서드 : 회원가입
    async signup() {
      // 이메일 인증 검사
      if (!this.emailCode.isValid) {
        this.emailCode.errorMsg = '이메일 인증이 완료되지 않았습니다.';
        return;
      }
      // 전화번호 인증 검사
      if (!this.phoneCode.isValid) {
        this.phoneCode.errorMsg = '전화번호 인증이 완료되지 않았습니다.';
        return;
      }
      // 비밀번호 검사
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
      if (!passwordRegex.test(this.password.value)) {
        console.log(this.password.value)
        this.password.errorMsg = '알파벳, 숫자, 특수문자를 모두 포함하여 8자리 이상';
        return;
      }
      // 비밀번호 확인 검사
      if (this.password.value !== this.passwordCheck.value) {
        this.passwordCheck.errorMsg = '비밀번호가 일치하지 않습니다.';
        return;
      }
      // 이름 검사
      if (this.name.value.trim() === '') {
        this.name.errorMsg = '이름을 입력하세요';
        return;
      }
      // 고객 코드 검사
      if (this.clientCode.value.trim() === '') {
        this.clientCode.errorMsg = '고객 코드를 입력하세요';
        return;
      }
      // 회원가입 요청
      const data = {
        "authCode" : this.clientCode.value,
        "email" : this.email.value,
        "password" : this.password.value,
        "name" : this.name.value,
        "phone" : this.phone.value
      }
      const result = await authAxios.post('auth/register', data);

      if (result.code === 200) {
        // --- 회원가입 성공 모달 출력 ---
        this.$router.push({name: 'login'});
      } else if (result.code === 401) {
        this.clientCode.errorMsg = result.message;
      }
    },
    // 메서드 : 회원가입 취소
    cancel() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/auth/auth.scss');
</style>