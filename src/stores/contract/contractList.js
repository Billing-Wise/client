import { defineStore } from 'pinia'

export const useContractListStore = defineStore('contractList', {
  state() {
    return {
      page: 0,
      size: 10,
      maxPage: 0,
      contractList: [],
      currentContract: {},
      columns: [
        { data: 'id', name: '계약번호', sort:'desc'},
        { data: 'itemName', name: '상품명', },
        { data: 'memberName', name: '회원명',  },
        { data: 'chargeAmount', name: '금액',},
        { data: 'contractCycle', name: '약정일',},
        { data: 'isSubscription', name: '구독 여부',},
        { data: 'invoiceType', name: '청구 생성',},
        { data: 'contractStatus', name: '계약 상태',},
        { data: 'paymentType', name: '결제 수단',},
        { data: 'totalUnpaidCount', name: '미납 건수',}
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
      this.maxPage = number;
      if (number < this.page) {
        this.page = number;
      }
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
