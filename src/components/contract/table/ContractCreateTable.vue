<template>
  <div class="table-box">
    <table class="contract-table">
      <thead>
        <tr class="table-header">
          <th v-for="(value, key) in colums" :key="key">
            <div class="column-item">{{ value }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-row" v-for="(data, idx) in contractBulkStore.uploadData" :key="idx">
          <td class="table-column"><span>{{ data['회원ID'] }}</span></td>
          <td class="table-column"><span>{{ data['상품ID'] }}</span></td>
          <td class="table-column"><span>{{ data['상품 가격'] }}원</span></td>
          <td class="table-column"><span>{{ data['상품 수량'] }}</span></td>
          <td class="table-column"><span>{{ data['구독 여부']? '정기' : '단기' }}</span></td>
          <td class="table-column"><span>{{ invoiceType[data['청구 타입']] }}</span></td>
          <td class="table-column"><span>{{ paymentType[data['결제 수단']] }}</span></td>
          <td class="table-column"><span>{{ data['약정일'] }}일</span></td>
          <td class="table-column"><span>{{ data['납부 기한'] }}일</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useContractBulkStore } from '@/stores/contract/contractBulk';

export default {
  name: 'ContractCreateTableVue',
  data() {
    return {
      colums: ['회원ID', '상품ID', '상품 가격', '수량', '구독 여부', '청구 타입', '결제 수단', '약정일', '납부 기한'],
      invoiceType: {1: '자동', 2:'수동'},
      paymentType: {1: '납부자결제', 2:'실시간CMS'},
    }
  },
  computed: {
    ...mapStores(useContractBulkStore),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.contract-table {
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

.wide-column {
  width: 150px;
}
</style>