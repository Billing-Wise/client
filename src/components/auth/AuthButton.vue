<template>
  <button class="auth-button" @click="clickFunc">{{title}}</button>
</template>

<script>
export default {
  name: 'AuthButtonVue',
  props: {
    title : String,
    clickFunc : Function
  },
}
</script>

<style lang="scss" scoped>
  .auth-button {
    @include base-button();
    padding: 10px;
    width: 100%;
    font-size: 18px;
    background-color: $theme-color;
    border: none;
    color : white;
  }
</style>