<template>
  <div class="agreement-container">
    <div class="agreement-header">
      <div class="agreement-header-title">이용약관</div>
      <div class="radio-container">
        <div class="radio-label">전체동의</div>
        <input type="checkbox" id="all-agree" v-model="allAgreed">
        <label for="all-agree" class="checkmark"></label>
      </div>
    </div>
    <div class="agreement-body">
      <div class="agreement-body-title">전자금융거래 이용약관</div>
      <div class="agreement-item">
        <div class="item-title">개인정보 수집 및 이용안내</div>
        <div class="radio-container">
          <div class="radio-label">동의</div>
          <input type="checkbox" id="privacy-agree" v-model="privacyAgreed">
          <label for="privacy-agree" class="checkmark"></label>
        </div>
      </div>
      <div class="agreement-item">
        <div class="item-title">개인정보 제공 및 위탁안내</div>
        <div class="radio-container">
          <div class="radio-label">동의</div>
          <input type="checkbox" id="terms-agree" v-model="termsAgreed">
          <label for="terms-agree" class="checkmark"></label>
        </div>
      </div>
    </div>
    <button class="view-terms-button">약관 보기</button>
  </div>
</template>

<script>
export default {
  name: 'AgreementBoxVue',
  data() {
    return {
      privacyAgreed: false,
      termsAgreed: false
    }
  },
  computed: {
    allAgreed: {
      get() {
        return this.privacyAgreed && this.termsAgreed;
      },
      set(value) {
        this.privacyAgreed = value;
        this.termsAgreed = value;
      }
    }
  },
  watch: {
    allAgreed(newVal) {
      this.$emit('agreement-changed', newVal);
    },
    privacyAgreed() {
      this.$emit('agreement-changed', this.allAgreed);
    },
    termsAgreed() {
      this.$emit('agreement-changed', this.allAgreed);
    }
  }
}
</script>

<style lang="scss" scoped>
.agreement-container {
  margin: 2rem 0;
  width: 100%;
}

.agreement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.agreement-header-title {
  font-weight: bold;
}

.radio-container {
  display: flex;
  align-items: center;
}

.radio-label {
  margin-right: 0.5rem;
}

input[type="radio"] {
  display: none;
}

.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid $input-color;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked + .checkmark:after {
  content: '';
  width: 12px;
  height: 12px;
  background-color: $theme-color;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.agreement-body {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 2px solid $input-color;
  border-bottom: 2px solid $input-color;
}

.agreement-body-title {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.agreement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;

}

.view-terms-button {
  width: 7rem;
  padding: 0.5rem;
  background-color: $theme-color;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + .checkmark {
  border-radius: 50%;
}

input[type="checkbox"]:checked + .checkmark:after {
  content: '';
  width: 12px;
  height: 12px;
  background-color: $theme-color;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>