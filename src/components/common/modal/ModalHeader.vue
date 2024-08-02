<template>
  <div class="modal-header">
    <span>{{title}}</span>
    <i class="bi bi-x-square-fill" @click="closeModal"></i>
  </div>
</template>

<script>
export default {
  name:'ModalHeaderVue',
  props: {
    title: String,
    closeModal: Function
  }
}
</script>

<style lang="scss" scoped>
.modal-header {
  @include flex-box(row, space-between, 0px);
  width: 100%;
  padding: 20px 0px;
  border-bottom: $theme-color solid 2px;
  span {
    font-size: 24px;
    font-weight: bold;
  }
  i {
    @include base-icon;
    color: $theme-color;
    font-size: 28px;
  }
}
</style>