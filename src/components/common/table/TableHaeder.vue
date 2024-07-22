<template>
  <tr class="table-header">
    <th v-for="(column, key) in store.columns" :key="key">
      <div class="column-item">
        <span>{{column.name}}</span>
        <i :class="column.sort? sortIcon[column.sort] : nonSortIcon" @click="changeSort(column)"></i>
      </div>
    </th> 
  </tr>
</template>

<script>
export default {
  name: 'TableHaederVue',
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      nonSortIcon : 'bi bi-arrow-down-up',
      sortIcon : {
        'asc' : 'bi bi-sort-numeric-down sort-active',
        'desc' : 'bi bi-sort-numeric-down-alt sort-active'
      }
    }
  },
  methods: {
    changeSort(column) {
      if (column.sort == 'asc') {
        this.store.setColumnSort(column.data, 'desc');
      } else if (column.sort == 'desc') {
        this.store.setColumnSort(column.data, null);
      } else {
        this.store.setColumnSort(column.data, 'asc');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .column-item {
    @include white-text(16px);
    @include flex-box(row, space-between, 0px);
    background: $theme-color;
    padding: 5px 20px;
    i {
      @include base-icon;
    }
  }
</style>