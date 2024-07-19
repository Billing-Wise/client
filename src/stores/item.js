import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
  state() {
    return {
      page : 1,
      size : 10,
      maxPage: 1,
      itemList : [],
      currentItem: {}
    }
  },
  actions: {
    
  },
  persist: {
  }
})