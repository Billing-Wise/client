import { defineStore } from 'pinia'

export const useContractStore = defineStore('contract', {
  state() {
    return {
      page: 0,
      size: 10,
      maxPage: 0,
      contractList: [],
      currentContract: {},
      columns: [
        { data: 'id', name: '계약번호', sort: null, searchable: false, filterable: false},
        { data: 'itemName', name: '상품명', sort: null, searchable: true, filterable: false},
        { data: 'memberName', name: '회원명', sort: null, searchable: true, filterable: false },
        { data: 'chargeAmount', name: '금액', sort: null, searchable: false, filterable: false},
        { data: 'contractCycle', name: '약정일', sort: null, searchable: false, filterable: false},
        { data: 'isSubscription', name: '구독 여부', sort: null, searchable: false, filterable: true},
        { data: 'invoiceType', name: '청구 생성', sort: null, searchable: false, filterable: true},
        { data: 'contractStatus', name: '계약 상태', sort: null, searchable: false, filterable: true},
        { data: 'paymentType', name: '결제 수단', sort: null, searchable: false, filterable: true},
        { data: 'totalUnpaidCount', name: '미납 여부', sort: null, searchable: false, filterable: false}
      ],
      filters: [
        {data: 'itemId', value: null},
        {data: 'memberId', value: null},
        {data: 'itemName', value: null},
        {data: 'memberName', value: null},
        {data: 'isSubscription', value: null},
        {data: 'invoiceTypeId', value: null},
        {data: 'contractStatusId', value: null},
        {data: 'paymentTypeId', value: null},
      ]
    }
  },
  actions: {
    setSize(number) {
      this.size = number
    },
    setMaxPage(number) {
      this.maxPage = number
    },
    setPage(number) {
      if (number <= this.maxPage && number >= 0) {
        this.page = number
      }
    },
    setContractList(contractList) {
      this.contractList = contractList
    },
    setColumnSort(columnData, sortValue) {
      const column = this.columns.find((col) => col.data === columnData)
      if (column) {
        column.sort = sortValue
      }
    },
    setFilter(name, value) {
      const filterData = this.filters.find((filter) => filter.data === name)
      if (filterData) {
        filterData.value = value
      }
    },
    setCurrentContract(info) {
      this.currentContract = info
    }
  }
})
