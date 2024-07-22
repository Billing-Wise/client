<template>
  <textarea 
    class="text-area-input"
    :rows="rows" 
    :placeholder="title"
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)">
  ></textarea>
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    'title': String,
    'modelValue': String,
    'rows': String,
  }
}
</script>

<style lang="scss" scoped>
  .text-area-input {
    width: 100%;
    padding: 10px;
    font-weight: bold;
    border : $theme-color 3px solid;
    border-radius: 10px;
  }
</style>