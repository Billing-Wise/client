<template>
  <div class="payment-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PaymentContainerVue'
}
</script>

<style lang="scss" scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 3rem;

}
</style>