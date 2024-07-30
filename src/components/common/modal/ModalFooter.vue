<template>
  <div class="modal-footer">
    <ThemeWideBtnVue :title="title" :func="func"/>
    <p>{{ errorMsg }}</p>
  </div>
</template>

<script>
import ThemeWideBtnVue from '../btn/ThemeWideBtn.vue'

export default {
  name:'ModalFooterVue',
  components: {
    ThemeWideBtnVue
  },
  props: {
    title: String,
    errorMsg: String,
    func: Function
  }
}
</script>

<style lang="scss" scoped>
.modal-footer {
  @include flex-box(row, center, 10px);
  width: 100%;
  padding: 20px 0px;
  border-top: $theme-color solid 2px;
  p {
    color: tomato;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>