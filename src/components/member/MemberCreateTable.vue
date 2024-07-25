<template>
  <div class="table-box">
    <table class="member-table">
      <thead>
        <tr class="table-header">
          <th v-for="(value, key) in colums" :key="key">
            <div class="column-item">{{ value }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-row" v-for="(data, idx) in memberBulkStore.uploadData" :key="idx">
          <td class="table-column"><span>{{ data['이름'] }}</span></td>
          <td class="table-column"><span>{{ data['이메일'] }}</span></td>
          <td class="table-column"><span>{{ data['전화번호'] }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useMemberBulkStore } from '@/stores/memberBulk';

export default {
  name: 'MemberCreateTableVue',
  data() {
    return {
      colums: ['회원명', '이메일', '전화번호']
    }
  },
  computed: {
    ...mapStores(useMemberBulkStore),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.member-table {
  @include base-table();
}

.table-header {
  background: $theme-color;
  position: sticky;
  top: 0;
  z-index: 1;

  th {
    border-right: 1px solid #ccc; // Add border between columns
  }

  th:last-child {
    border-right: none; // Remove border from the last column
  }

  .column-item {
    @include white-text(16px);
    @include flex-box(row, start, 0px);
    padding: 5px 20px;

    i {
      @include base-icon;
    }
  }
}
</style>