<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItemTitleVue'
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}
</style>