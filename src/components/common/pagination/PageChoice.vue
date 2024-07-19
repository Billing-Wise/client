<template>
  <div class="page-choice">
    <span>{{ store.page }}</span>
  </div>
</template>

<script>
export default {
  name : "PageChoiceVue",
  props: {
    store: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>