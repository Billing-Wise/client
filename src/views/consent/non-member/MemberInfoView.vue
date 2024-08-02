<template>

  <div class="member-info-view">
    <div class="content">
      <p class="instruction">계약을 위한 정보를 입력해주세요.</p>
      <form class="input-info" @submit.prevent="submitForm">
        <div class="input-field">
          <InfoInputVue title="이름" v-model="name" @blur="validateName" />
          <p v-if="nameError" class="error-message">{{ nameError }}</p>
        </div>
        <div class="input-field">
          <InfoInputVue title="이메일" v-model="email" @blur="validateEmail" />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>

        


        <div class="input-field">
          <InfoInputVue title="전화번호" v-model="phone" @blur="validatePhone" />
          <label class="phone-guide">'-' 없이 010xxxxxxxx 형식으로 입력해주세요</label>
          <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
        </div>
      </form>
    </div>
    <div class="button-container">
      <ThmemBtnVue title="이전" :func="goBack" />
      <ThmemBtnVue title="다음" :func="goNext" />
    </div>
  </div>

</template>

<script>

import { useContractStore } from '@/stores/consent/non-member/contract';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'MemberInfoView',
  components: {
    InfoInputVue,
    ThmemBtnVue
  },

  data() {
    return {
      name: '',
      email: '',
      phone: '',
      nameError: '',
      emailError: '',
      phoneError: ''
    };
  },

  computed: {
    isFormValid() {
      return (
        this.name.trim() !== '' &&
        this.email.trim() !== '' &&
        this.phone.trim() !== '' &&
        this.nameError === '' &&
        this.emailError === '' &&
        this.phoneError === ''
      );
    }
  },

  mounted() {
    const contractStore = useContractStore();
    const { name, email, phone } = contractStore.memberInfo;
    this.name = name || '';
    this.email = email || '';
    this.phone = phone || '';
  },

  methods: {

    validateName() {
      this.nameError = this.name.trim() === '' ? '이름을 입력해주세요.' : '';
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email) ? '유효한 이메일 주소를 입력해주세요.' : '';
    },

    validatePhone() {
      const phoneRegex = /^010\d{8}$/;
      this.phoneError = !phoneRegex.test(this.phone) ? '유효한 전화번호를 입력해주세요.(형식: 010xxxxxxxx)' : '';
    },

    goBack() {
      this.$router.push({ name: 'consentExplanation' });
    },
    

    goNext() {
      this.validateName();
      this.validateEmail();
      this.validatePhone();
      if (this.isFormValid) {
        const contractStore = useContractStore();
        contractStore.setMemberInfo({
          name: this.name,
          email: this.email,
          phone: this.phone.replace(/-/g, '')
        });
        this.$router.push({ name: 'contractInfoConfirmation', 
        
        });
      }
    },

    submitForm() {
      this.goToNext();
    }
  }
};

</script>

<style lang="scss" scoped>
.member-info-view {
  @include flex-box(column, space-between, 20px);
  height: 100%;
  background-color: white;

  .content {
    flex: 1;
    @include flex-box(column, flex-start, 20px);
    width: 100%;
    padding: 0 20px;

    .instruction {
      padding: 50px 20px;
      border-radius: 5px;
      text-align: center;
      height: 15%;
      width: 100%;
      text-decoration: underline;
      text-underline-offset: 5px;
      font-size: large;
      font-weight: bold;
      margin: 10px auto;
    }

    .input-info {
      @include flex-box(column, flex-start, 30px);
      width: 90%;
      margin: 10px auto; 
    }

    form {
      @include flex-box(column, flex-start, 15px);
      width: 100%;
    }

    .input-field {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .error-message {
      align-content: center;
      font-size: large;
      font-weight: bold;
      color: tomato;
      font-size: 12px;
      position: absolute;
      top: 50%;
      transform: translateY(120%);
      margin-top: 5px;

      
    }
  }

  .phone-guide {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  margin-bottom: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    padding: 20px;
  }
}
</style>