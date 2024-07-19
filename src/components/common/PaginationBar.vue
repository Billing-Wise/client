<template>
  <div class="pagination-bar">
    <div class="spacer"></div>
    <PageChoiceVue :store="store"/>
    <SizeChoice :store="store"/>
  </div>

</template>

<script>
import PageChoiceVue from './pagination/PageChoice.vue'
import SizeChoice from './pagination/SizeChoice.vue';

export default {
  name: 'PaginationBarVue',
  components:{
    SizeChoice,
    PageChoiceVue
  },
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    page: 1,
    size: 10
  }},
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .pagination-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
  }
</style>