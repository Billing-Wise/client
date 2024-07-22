<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot></slot>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    closeModal: Function
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';


</style>