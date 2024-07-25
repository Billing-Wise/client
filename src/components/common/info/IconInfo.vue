<template>
  <div class="icon-info">
    <div class="icon-box">
      <i :class="icon"></i>
    </div>
    <span>{{ info }}</span>
  </div>
</template>

<script>
export default {
  name: 'IconInfoVue',
  props: {
    'icon' : String,
    'info': String,
  },
}
</script>

<style lang='scss' scoped>
.icon-info {
  @include flex-box(row, start, 20px);
  width: 100%;

  .icon-box {
    @include flex-box(row, center, 0px);
    background-color: $theme-color;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color : white;
    border-radius: 10px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
}



</style>