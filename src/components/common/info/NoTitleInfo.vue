<template>
  <div class="no-title-input">
    {{ infoValue }}
  </div>
</template>

<script>
export default {
  name: 'NoTitleInfoVue',
  props: {
    infoValue: String,
  }
}
</script>

<style lang="scss" scoped>
  .no-title-input {
    @include flex-box(row, center, 0px);
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: $theme-color solid 3px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
