<template>
  <div class="description">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DescriptionBoxVue'
}
</script>

<style lang="scss" scoped>
.description {
  width: 100%;
  font-weight: bold;
  color: $input-color;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid $input-color;
  font-size: 1.1rem;
}
</style>