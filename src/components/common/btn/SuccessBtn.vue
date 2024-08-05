<template>
  <button class="theme-btn" @click="func">
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'SuccessBtnVue',
  props: {
    title: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .theme-btn {
    @include flex-box(row, center, 10px);
    @include base-button();
    padding: 10px 20px;
    background-color: $success-color;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
</style>