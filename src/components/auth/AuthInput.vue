<template>
  <div class="auth-input">
    <p>{{title}}</p>
    <input :type="inputType" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'AuthInputVue',
  props: {
    'title' : String,
    'inputType': String,
    'modelValue': String
  },
  emits: ['update:modelValue']

}
</script>

<style lang='scss' scoped>
  .auth-input {
    width: 100%;
    margin-bottom: 5px;
    p {
      font-weight: bold;
      margin: 5px 0px
    };
    input {
      @include base-input(100%, 16px)
    }
  }
</style>