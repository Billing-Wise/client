import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state() {
    return {
      page : 0,
      size : 10,
      maxPage: 0,
      itemList : [],
      currentItem: {},
      columns: [
        {data: 'id', name:'상품번호', sort:null},
        {data:'imageUrl', name:'상품 이미지', sort:null},
        {data: 'name', name:'상품명', sort:null},
        {data: 'price', name:'가격', sort:null},
        {data: 'contractCount', name:'계약 건수', sort:null},
        {data: 'createdAt', name:'생성일', sort:null},
        {data: 'updatedAt', name:'수정일', sort:null}
      ],
      search: {keyword: 'name', value: null}
    }
  },
  actions: {
    setSize(number) {
      this.size = number;
    },
    setMaxPage(number) {
      this.maxPage = number;
    },
    setPage(number) {
      if (number <= this.maxPage && number >= 0) {
        this.page = number;
      }
    },
    setItemList(itemList) {
      this.itemList = itemList;
    },
    setColumnSort(columnData, sortValue) {
      const column = this.columns.find(col => col.data === columnData);
      if (column) {
        column.sort = sortValue;
      }
    },
    setCurrentItem(info) {
      this.currentItem = info;
    },
    setSearchValue(value) {
      this.search.value = value;
    }
  },
})