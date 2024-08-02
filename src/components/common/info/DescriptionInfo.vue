<template>
  <div class="description-input">
    {{ infoValue }}
  </div>
</template>

<script>
export default {
  name: 'DescriptionInfoVue',
  props: {
    infoValue: String,
  }
}
</script>

<style lang="scss" scoped>
  .description-input {
    @include flex-box(row, start, 0px);
    width: 100%;
    height: 120px;
    overflow-y: auto;
    padding: 10px 20px;
    border-radius: 5px;
    border: $theme-color solid 3px;
    font-size: 16px;
    font-weight: bold;
    white-space: pre-wrap;
  }
</style>
