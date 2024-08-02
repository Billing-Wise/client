<template>
  <button class="icon-btn" @click="func">
    <span>{{ title }}</span>
    <i :class="icon"></i>
  </button>
</template>

<script>
export default {
  name: 'ColorIconBtnVue',
  props: {
    title: String,
    icon: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .icon-btn {
    @include flex-box(row, center, 10px);
    @include base-button();
    padding: 7px 15px;
    background-color: white;
    border: none;
    i {
      font-size: 22px
    }
  }
</style>