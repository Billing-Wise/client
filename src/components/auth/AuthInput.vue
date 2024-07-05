<template>
  <div class="auth-input">
    <p>{{title}}</p>
    <input :type="inputType">
  </div>
</template>

<script>
export default {
  name: 'AuthInputVue',
  props: {
    "title" : String,
    "inputType": String
  }
}
</script>

<style lang="scss" scoped>
  .auth-input {
    width: 100%;
    p {
      font-weight: bold;
      margin: 5px 0px
    };
    input {
      box-sizing: border-box;
      width: 100%;
      font-weight: bold;
      padding: 12px 20px;
      border: none ;
      border-radius: 5px;
      box-shadow: 0px 1px 4px 1px rgb(0, 0, 0, 0.20);
      transition: all 0.3s;
      &:focus {
        outline: none;
        box-shadow: 0px 1px 5px 1px rgb(0, 0, 0, 0.5);
      }
    }
  }
</style>