<template>
  <div class="payment-content">
    <div class="payment-card" :class="{ 'selected': isCmsSelected }">
      <div class="card-header">실시간 CMS</div>
      <div class="card-body">
        <p>회원의 계좌 번호를 바탕으로<br>자동 이체 수납을 도와 줍니다.</p>
        <div class="divider"></div>
        <div class="image-container">
          <img src="@/assets/images/cms-image.png" alt="CMS 이미지">
        </div>
        <button 
          class="select-button"
          :class="{ 'outline': !isCmsSelected }"
          @click="toggleCms" 
          :disabled="isCmsSelected && !isCardSelected"
        >
          {{ isCmsSelected ? '선택 취소' : '선택하기' }}
        </button>
      </div>
    </div>
    <div class="payment-card" :class="{ 'selected': isCardSelected }">
      <div class="card-header">카드결제</div>
      <div class="card-body">
        <p>회원의 카드 정보를 바탕으로<br>자동 이체 수납을 도와 줍니다.</p>
        <div class="divider"></div>
        <div class="image-container">
          <img src="@/assets/images/card-image.png" alt="카드 이미지">
        </div>
        <button 
          class="select-button" 
          :class="{ 'outline': !isCardSelected }"
          @click="toggleCard"
          :disabled="isCardSelected && !isCmsSelected"
        >
          {{ isCardSelected ? '선택 취소' : '선택하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPaymentContent',
  data() {
    return {
      isCmsSelected: true,
      isCardSelected: false
    }
  },
  methods: {
    toggleCms() {
      if (this.isCmsSelected && !this.isCardSelected) return;
      this.isCmsSelected = !this.isCmsSelected;
    },
    toggleCard() {
      if (this.isCardSelected && !this.isCmsSelected) return;
      this.isCardSelected = !this.isCardSelected;
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-content {
  display: flex;
  align-items: center;    
  gap: 10rem;
  height: 100%;
}

.payment-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  .card-header {
    background-color: $theme-color;
    color: white;
    padding: 0.75rem;
    font-weight: bold;
    text-align: center;
  }

  .card-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      text-align: center;
      font-weight: bold;
      color: $input-color;
      margin-bottom: 0.5rem;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: $input-color;
      margin: 1rem 0;
    }

    .image-container {
      margin-bottom: 1rem;
      img {
        max-width: 100%;
        height: auto
      }
    }
  }  

  .select-button {
    border: 1px solid $theme-color;
    font-weight: bold;
    background-color: $theme-color;
    color: white;
    padding: 0.75rem 0;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: darken($theme-color, 10%);
    }

    &.outline {
      border: 1px solid $theme-color;
      background-color: white;
      color: $theme-color;

      &:hover {
        background-color: $theme-color;
        color: white;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        background-color: $theme-color;
      }
    }
  }
}
</style>