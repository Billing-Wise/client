<template>
  <div class="root-container">
    <div class="top-btn-box">
      <div class="tab-container">
        <button 
          class="tab-button" 
          :class="{ active: $route.name === 'settingItem' }"
          @click="$router.push({ name: 'settingItem' })"
        >
          상품 설정
        </button>
        <button 
          class="tab-button"
          :class="{ active: $route.name === 'settingPayment' }"
          @click="$router.push({ name: 'settingPayment' })"
        >
          결제수단 설정
        </button>
      </div>
    </div>
    <SettingPaymentContent/>
  </div>
</template>

<script>

import SettingPaymentContent from '@/components/setting/SettingPaymentContent.vue';

export default {
  name: 'SettingPaymentView',
  components: {
    SettingPaymentContent,
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 30px 40px
}

.top-btn-box {
  @include flex-box(row, space-between, 20px);
  width: 100%;
}

.tab-container {
  @include flex-box(row, flex-start, 0);
  width: 20rem;
  background: white;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-button {
  flex: 1;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  color: $input-color;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background-color: $theme-color;
    color: white;
  }
}

.right-buttons {
  @include flex-box(row, center, 10px);
}
</style>