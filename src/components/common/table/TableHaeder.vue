<template>
  <tr class="table-header">
    <th v-for="(column, key) in showColumns" :key="key">
      <div class="column-item">
        <span>{{ column.name }}</span>
        <i :class="column.sort ? sortIcon[column.sort] : nonSortIcon" @click="changeSort(column)"></i>
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
    },
    excludeColumnArr : Array
  },
  data() {
    return {
      nonSortIcon: 'bi bi-arrow-down-up',
      sortIcon: {
        'asc': 'bi bi-sort-numeric-down sort-active',
        'desc': 'bi bi-sort-numeric-down-alt sort-active'
      }
    }
  },
  computed: {
    showColumns() {
      if (!this.excludeColumnArr) {
        return this.store.columns;
      } else {
        const newArr = [];
        this.store.columns.forEach((column) => {
          if (!this.excludeColumnArr.includes(column.data)) newArr.push(column);
        })
        return newArr
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
.table-header {
  width: 100%;
  background: $theme-color;

  th {
    border-right: 1px solid #ccc; // Add border between columns
  }

  th:last-child {
    border-right: none; // Remove border from the last column
  }
}

.column-item {
  @include white-text(16px);
  @include flex-box(row, space-between, 0px);
  padding: 10px 20px;

  i {
    @include base-icon;
  }
}
</style>