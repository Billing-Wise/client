<template>
  <button class="theme-btn" @click="func">
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'ThmemWideBtnVue',
  props: {
    title: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .theme-btn {
    @include flex-box(row, center, 0px);
    @include base-button();
    width: 100%;
    padding: 10px 0px;
    background-color: $theme-color;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
</style>