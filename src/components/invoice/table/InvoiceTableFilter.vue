<template>
  <tr class="fileter-row">
    <td class="table-column"></td>
    <td class="table-column"></td>
    <td class="table-column">
      <SearchSmallInputVue title="상품명을 입력하세요" v-model="itemName" :search="searchItemName"/>
    </td>
    <td class="table-column">
      <SearchSmallInputVue title="회원명을 입력하세요" v-model="memberName" :search="searchMemberName"/>
    </td>
    <td class="table-column"></td>
    <td class="table-column">
      
    </td>
    <td class="table-column"></td>
    <td class="table-column"></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="paymentTypeIdx" :keywordArr="paymentTypeArr" :choiceFunc="searchPaymentType"/></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="paymentStatusIdx" :keywordArr="paymentStatusArr" :choiceFunc="searchPaymentStatus"/></td>
  </tr>
</template>

<script>
import SearchSmallInputVue from '@/components/common/input/SearchSmallInput.vue';
import SmallSelectVue from '@/components/common/select/SmallSelect.vue';
import { useInvoiceListStore } from '@/stores/invoice/invoiceList';
import { getInvoiceList } from '@/utils/invoice';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'InvoiceTableFilterVue',
  components: {
    SearchSmallInputVue,
    SmallSelectVue
  },
  data() {
    return {
      itemName:'',
      memberName:'',
      paymentTypeIdx: 0,
      paymentTypeArr: [
        {title: '전부', data: null},
        {title: '납부자 결제', data: 1},
        {title: '실시간 CMS', data: 2},
      ],
      paymentStatusIdx: 0,
      paymentStatusArr: [
        {title: '전부', data: null},
        {title: '미납', data: 1},
        {title: '완납', data: 2},
        {title: '대기', data: 2},
      ],
    }
  },
  watch: {
    itemName(newVal) {
      this.invoiceListStore.setFilter('itemName', newVal);
    },
    memberName(newVal) {
      this.invoiceListStore.setFilter('memberName', newVal);
    }
  },
  computed: {
    ...mapStores(useInvoiceListStore)
  },
  methods: {
    ...mapActions(useInvoiceListStore, 'setFilter'),
    async searchItemName() {
      await getInvoiceList();
    },
    async searchMemberName() {
      await getInvoiceList();
    },
    searchPaymentType(idx) {
      this.paymentTypeIdx = idx;
      this.invoiceListStore.setFilter('paymentTypeId', this.paymentTypeArr[this.paymentTypeIdx].data);
    },
    searchPaymentStatus(idx) {
      this.paymentStatusIdx = idx;
      this.invoiceListStore.setFilter('paymentStatusId', this.paymentStatusArr[this.paymentStatusIdx].data);
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
</style>