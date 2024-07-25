<template>
  <button class="warning-btn" @click="func">
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'WarningWideBtnVue',
  props: {
    title: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .warning-btn {
    @include flex-box(row, center, 0px);
    @include base-button();
    width: 100%;
    padding: 10px 0px;
    background-color: tomato;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
</style>