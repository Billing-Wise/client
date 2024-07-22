<template>
    <div class="auth-input">
      <p class="title">{{title}}</p>
      <div class="main-box">
        <input :type="inputType" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <button @click="clickFunc">{{buttonTitle}}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthBtnInputVue',
    props: {
      'title' : String,
      'inputType': String,
      'buttonTitle': String,
      'modelValue': String,
      'clickFunc' : Function
    },
    emits: ['update:modelValue']
  
  }
  </script>
  
  <style lang='scss' scoped>
    .auth-input {
      width: 100%;
      margin-bottom: 5px;
      .title {
        font-weight: bold;
        margin: 5px 0px
      };
      .main-box {
        @include flex-box(row, space-between, 0px);
      }
    }

    .main-box {
      input {
        @include base-input(70%, 16px);
      }
      button {
        @include base-button();
        padding: 10px;
        width: 25%;
        font-size: 16px;
        background-color: $theme-color;
        border: none;
        color : white;
      }
    }
  </style>