<template>
  <div class="info-input">
    <div class="title-box">
      {{ title }}
    </div>
    <input 
      type= "number"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)">
    <span>{{ unit }}</span>
  </div>
</template>

<script>
export default {
  name: 'NumberInputVue',
  props: {
    'title' : String,
    'unit': String,
    'modelValue': Number,
  },
  emits: ['update:modelValue']

}
</script>

<style lang='scss' scoped>
  .info-input {
    @include flex-box(row, center, 0px);
    background-color: white;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: $theme-color solid;

    .title-box {
      @include flex-box(row, center, 0px);
      @include white-text(16px);
      background: $theme-color;
      width: 140px;
      height: 100%;
    }

    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      font-weight: bold;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }

    span {
      padding-right: 10px;
      font-weight: bold;
    }

  }
</style>