<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItemContentVue'
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 3px solid $theme-color;
  border-radius: 6px;
  margin: 0.5rem 0;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: $input-color;
}
</style>