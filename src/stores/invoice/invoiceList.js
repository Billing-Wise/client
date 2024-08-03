import { defineStore } from 'pinia'

export const useInvoiceListStore = defineStore('invoiceList', {
  state() {
    return {
      page: 0,
      size: 10,
      maxPage: 0,
      invoiceList: [],
      currentInvoice: {},
      columns: [
        { data: 'id', name: '청구번호',},
        { data: 'contractId', name: '계약번호',},
        { data: 'itemName', name: '상품명', notSortable: true},
        { data: 'memberName', name: '회원명', notSortable: true},
        { data: 'chargeAmount', name: '금액',},
        { data: 'contractDate', name: '결제일',},
        { data: 'dueDate', name: '납부 기한',},
        { data: 'createdAt', name: '생성일',},
        { data: 'paymentType', name: '결제 수단',},
        { data: 'paymentStatus', name: '결제 상태',}
      ],
      filters: [
        {data: 'contractId', value: null},
        {data: 'itemName', value: null},
        {data: 'memberName', value: null},
        {data: 'startContractDate', value: null},
        {data: 'endContractDate', value: null},
        {data: 'startDueDate', value: null},
        {data: 'endDueDate', value: null},
        {data: 'startCreatedAt', value: null},
        {data: 'endCreatedAt', value: null},
        {data: 'paymentTypeId', value: null},
        {data: 'paymentStatusId', value: null},
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
    setInvoiceList(invoiceList) {
      this.invoiceList = invoiceList
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
    setCurrentInvoice(info) {
      this.currentInvoice = info
    }
  }
})
