<template>
  <button class="excel-btn" @click="func">
    <span>{{ title }}</span>
    <img src="@/assets/images/icon_excel.png" alt="excel_icon">
  </button>
</template>

<script>
export default {
  name: 'ExcelBtnVue',
  props: {
    title: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
  .excel-btn {
    @include flex-box(row, center, 10px);
    @include base-button();
    padding: 7px 15px;
    border: $theme-color solid 3px;
    background-color: white;
    img {
      width: 30px;
    }
  }
</style>