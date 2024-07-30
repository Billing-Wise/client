<template>
  <tr class="table-row" @click="selectContact">
    <td class="table-column"><span>{{ contractData.id }}</span></td>
    <td class="table-column"><span>{{ contractData.itemName }}</span></td>
    <td class="table-column"><span>{{ contractData.memberName }}</span></td>
    <td class="table-column"><span>{{ contractData.chargeAmount }} 원</span></td>
    <td class="table-column"><span>매월 {{ contractData.contractCycle }}일</span></td>
    <td class="table-column"><span>{{ contractData.subscription ? '구독' : '단기' }}</span></td>
    <td class="table-column"><span>{{ contractData.invoiceType.name }}</span></td>
    <td class="table-column"><span>{{ contractData.paymentType.name }}</span></td>
    <td class="table-column">
      <div class="status-sticker" :class="upPaidStatusClass">{{ upPaidStatus }}</div>
    </td>
  </tr>
</template>

<script>
import { mapStores } from 'pinia';
import { useInvoiceCreateStore } from '@/stores/invoice/invoiceCreate';

export default {
  name: 'InvoiceCreateTableRowVue',
  props: {
    contractData: Object
  },
  data() {
    return {
      contractStatusClass: ['pending', 'progress', 'end']
    }
  },
  computed: {
    ...mapStores(useInvoiceCreateStore),
    upPaidStatusClass() {
      const count = this.contractData.totalUnpaidCount;
      return count > 0 ? 'warning' : 'success';
    },
    upPaidStatus() {
      const count = this.contractData.totalUnpaidCount;
      return count > 0 ? `미납 ${count}건` : '완납';
    },
  },
  methods: {
    selectContact() {
      this.invoiceCreateStore.setContract(this.contractData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.success {
  background-color: $success-color;
}

.warning {
  background-color: $warning-color;
}
</style>