<template>
  <tr class="fileter-row">
    <td class="table-column"></td>
    <td class="table-column"><SearchSmallInputVue title="상품명을 입력하세요" v-model="itemName" :search="searchItemName"/></td>
    <td class="table-column"><SearchSmallInputVue title="회원명을 입력하세요" v-model="memberName" :search="searchMemberName"/></td>
    <td class="table-column"></td>
    <td class="table-column"></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="subscribeIdx" :keywordArr="subscribeArr" :choiceFunc="searchSubscribe"/></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="invoiceTypeIdx" :keywordArr="invoiceTypeArr" :choiceFunc="searchInvoiceType"/></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="contractStatusIdx" :keywordArr="contractStatusArr" :choiceFunc="searchContractStatus"/></td>
    <td class="table-column"><SmallSelectVue :selectedIdx="paymentTypeIdx" :keywordArr="paymentTypeArr" :choiceFunc="searchPaymentType"/></td>
    <td class="table-column"></td>
  </tr>
</template>

<script>
import SearchSmallInputVue from '@/components/common/input/SearchSmallInput.vue';
import SmallSelectVue from '@/components/common/select/SmallSelect.vue';
import { useContractStore } from '@/stores/contract';
import { getContractList } from '@/utils/contract';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'ContractTableFilterVue',
  components: {
    SearchSmallInputVue,
    SmallSelectVue
  },
  data() {
    return {
      itemName:'',
      memberName:'',
      subscribeIdx: 0,
      subscribeArr: [
        {title: '전부', data: null},
        {title: '구독', data: true},
        {title: '단기', data: false},
      ],
      invoiceTypeIdx: 0,
      invoiceTypeArr: [
        {title: '전부', data: null},
        {title: '자동', data: 1},
        {title: '수동', data: 2},
      ],
      contractStatusIdx: 0,
      contractStatusArr: [
        {title: '전부', data: null},
        {title: '대기', data: 1},
        {title: '진행', data: 2},
        {title: '종료', data: 3},
      ],
      paymentTypeIdx: 0,
      paymentTypeArr: [
        {title: '전부', data: null},
        {title: '납부자 결제', data: 1},
        {title: '실시간 CMS', data: 2},
      ],
    }
  },
  watch: {
    itemName(newVal) {
      this.contractStore.setFilter('itemName', newVal);
    },
    memberName(newVal) {
      this.contractStore.setFilter('memberName', newVal);
    }
  },
  computed: {
    ...mapStores(useContractStore)
  },
  methods: {
    ...mapActions(useContractStore, 'setFilter'),
    async searchItemName() {
      await getContractList();
    },
    async searchMemberName() {
      await getContractList();
    },
    searchSubscribe(idx) {
      this.subscribeIdx = idx;
      this.contractStore.setFilter('isSubscription', this.subscribeArr[this.subscribeIdx].data);
    },
    searchInvoiceType(idx) {
      this.invoiceTypeIdx = idx;
      this.contractStore.setFilter('invoiceTypeId', this.invoiceTypeArr[this.invoiceTypeIdx].data);
    },
    searchContractStatus(idx) {
      this.contractStatusIdx = idx;
      this.contractStore.setFilter('contractStatusId', this.contractStatusArr[this.contractStatusIdx].data);
    },
    searchPaymentType(idx) {
      this.paymentTypeIdx = idx;
      this.contractStore.setFilter('paymentTypeId', this.paymentTypeArr[this.paymentTypeIdx].data);
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
    border-right: 1px solid #ccc; // Add border between columns
  }

  td:last-child {
    border-right: none; // Remove border from the last column
  }
}
</style>