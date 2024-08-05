<template>
  <div class="info-input">
    <div class="title-box">
      {{ title }}
    </div>
    <div class="info-box">{{ info }}</div>
  </div>
</template>

<script>
export default {
  name: 'TitleInfoVue',
  props: {
    'title' : String,
    'info': [String, Number],
  },
}
</script>

<style lang='scss' scoped>
  .info-input {
    @include flex-box(row, center, 0px);
    width: 100%;
    height: 40px;

    .title-box {
      @include flex-box(row, center, 0px);
      @include white-text(16px);
      background: $theme-color;
      width: 110px;
      height: 100%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .info-box {
      @include flex-box(row, start, 0px);
      flex-grow: 1;
      height: 100%;
      padding: 0px 10px;
      font-weight: bold;
      border: $theme-color solid;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: white;
    }
  }
</style>