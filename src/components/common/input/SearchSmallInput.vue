<template>
  <div class="search-input" @keydown.enter="search">
    <input 
      type="text" 
      :placeholder="title"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)">
    <i class="bi bi-search" @click="search"></i>
  </div>
</template>

<script>
export default {
  name: 'SearchSmallInputtVue',
  props: {
    'title' : String,
    'modelValue': String,
    'search': Function
  },
  emits: ['update:modelValue']

}
</script>

<style lang='scss' scoped>
  .search-input {
    @include flex-box(row, center, 10px);
    background-color: white;
    // width: 100%;
    padding: 5px 15px;
    border-radius: 20px;
    border: $theme-color solid 2px;
    input {
      width: 100%;
      border: none;
      font-size: 13px;
      font-weight: bold;
      &:focus {
        outline: none;
      }
    }
    i {
      font-size: 14px;
      @include base-icon;
    }

  }
</style>