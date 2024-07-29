<template>
  <tr class="table-row" @click="routeInvoiceDetail">
    <td class="table-column"><span>{{ invoiceData.invoiceId }}</span></td>
    <td class="table-column"><span>{{ invoiceData.contractId }}</span></td>
    <td class="table-column"><span>{{ invoiceData.itemName }}</span></td>
    <td class="table-column"><span>{{ invoiceData.memberName }}</span></td>
    <td class="table-column"><span>{{ invoiceData.chargeAmount }} 원</span></td>
    <td class="table-column"><span>{{ contractDate }}</span></td>
    <td class="table-column"><span>{{ dueDate }}</span></td>
    <td class="table-column"><span>{{ createdAt }}</span></td>
    <td class="table-column"><span>{{ invoiceData.paymentType.name }}</span></td>
    <td class="table-column">
      <div class="status-sticker" :class="paymentStatusClass[invoiceData.paymentStatus.id - 1]">
        {{ invoiceData.paymentStatus.name }}
      </div>
    </td>
  </tr>
</template>

<script>
import { toDateFromDateTime } from '@/utils/date';

export default {
  name: 'InvoiceTableRowVue',
  props: {
    invoiceData: Object
  },
  data() {
    return {
      paymentStatusClass: ['warning', 'success', 'waiting']
    }
  },
  computed: {
    contractDate() {
      return toDateFromDateTime(this.invoiceData.contractDate)
    },
    dueDate() {
      return toDateFromDateTime(this.invoiceData.dueDate)
    },
    createdAt() {
      return toDateFromDateTime(this.invoiceData.createdAt)
    },
  },
  methods: {
    routeInvoiceDetail() {
      // this.$router.push(`/invoice/${this.invoiceData.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.waiting {
  background-color: $waiting-color;
}

.success {
  background-color: $success-color;
}

.warning {
  background-color: $warning-color;
}
</style>