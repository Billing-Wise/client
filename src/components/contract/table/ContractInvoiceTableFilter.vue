<template>
  <tr class="fileter-row">
    <td class="table-column"></td>
    <td class="table-column"></td>
    <td class="table-column">
      <div class="calendar-row">
        <CalendarDateInputVue v-model="startContractDate" />
        <span>~</span>
        <CalendarDateInputVue v-model="endContractDate" />
        <i class="bi bi-arrow-clockwise reset-btn" @click="resetContractDate"></i>
      </div>
    </td>
    <td class="table-column">
      <div class="calendar-row">
        <CalendarDateInputVue v-model="startDueDate"/>
        <span>~</span>
        <CalendarDateInputVue v-model="endDueDate"/>
        <i class="bi bi-arrow-clockwise reset-btn" @click="resetDueDate"></i>
      </div>
    </td>
    <td class="table-column"><SmallSelectVue :selectedIdx="paymentStatusIdx" :keywordArr="paymentStatusArr" :choiceFunc="searchPaymentStatus"/></td>
  </tr>
</template>

<script>
import SmallSelectVue from '@/components/common/select/SmallSelect.vue';
import CalendarDateInputVue from '@/components/common/input/CalendarDateInput.vue';
import { useInvoiceListStore } from '@/stores/invoice/invoiceList';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'ContractInvoiceTableFilterVue',
  components: {
    SmallSelectVue,
    CalendarDateInputVue
  },
  data() {
    return {
      startContractDate: '',
      endContractDate: '',
      startDueDate: '',
      endDueDate: '',
      paymentStatusIdx: 0,
      paymentStatusArr: [
        {title: '전부', data: null},
        {title: '미납', data: 1},
        {title: '완납', data: 2},
        {title: '대기', data: 3},
      ],
    }
  },
  watch: {
    startContractDate(value) {
      this.invoiceListStore.setFilter('startContractDate', value);
    },
    endContractDate(newVal) {
      this.invoiceListStore.setFilter('endContractDate', newVal);
    },
    startDueDate(newVal) {
      this.invoiceListStore.setFilter('startDueDate', newVal);
    },
    endDueDate(newVal) {
      this.invoiceListStore.setFilter('endDueDate', newVal);
    },
  },
  computed: {
    ...mapStores(useInvoiceListStore)
  },
  methods: {
    ...mapActions(useInvoiceListStore, 'setFilter'),
    searchPaymentStatus(idx) {
      this.paymentStatusIdx = idx;
      this.invoiceListStore.setFilter('paymentStatusId', this.paymentStatusArr[this.paymentStatusIdx].data);
    },
    resetContractDate() {
      this.startContractDate = null;
      this.endContractDate = null;
    },
    resetDueDate() {
      this.startDueDate = null;
      this.endDueDate = null;
    },
  }
}
</script>

<style lang="scss" scoped>
.fileter-row {
  border-bottom: 1px solid #ccc;
  background-color: $theme-color;
  .table-column {
    padding: 0px 10px 10px 10px;
  }
  td {
    border-right: 1px solid #ccc;
  }

  td:last-child {
    border-right: none;
  }
}

.calendar-row {
  @include flex-box(row, space-between, 0px);
  padding: 0px 5px;
  span {
    font-size: 24px;
    font-weight: bold;
    color:white
  }
  .reset-btn {
    @include base-icon;
    font-size: 18px;
    color: white
  }
}
</style>