<template>
  <button class="success-btn" @click="func">
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'SuccessWideBtnVue',
  props: {
    title: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .success-btn {
    @include flex-box(row, center, 0px);
    @include base-button();
    width: 100%;
    padding: 10px 0px;
    background-color: #2C80CE;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
</style>