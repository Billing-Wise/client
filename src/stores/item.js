import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state() {
    return {
      page : 0,
      size : 10,
      maxPage: 10,
      itemList : [],
      currentItem: {}
    }
  },
  actions: {
    setSize(number) {
      this.size = number;
    },
    setPage(number) {
      if (number <= this.maxPage && number >= 0) {
        this.page = number;
      }
    }
  },
})