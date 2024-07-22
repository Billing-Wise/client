<template>
  <Button class="theme-btn" @click="func">
    <span>{{ title }}</span>
  </Button>
</template>

<script>
export default {
  name: 'ThmemBtnVue',
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
    background-color: $theme-color;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
</style>