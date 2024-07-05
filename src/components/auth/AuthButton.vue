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
    @include base-button;
    background-color: $theme-color;
    border: none;
    color : white;
  }
</style>