import { defineStore } from 'pinia'

export const useStaticStore = defineStore('static', {
  state() {
    return {
      thisMonthData: {
        id: 0,
        date: new Date(),
        totalInvoiced: 0,
        totalCollected: 0,
        outstanding: 0,
        year: 0,
        month: 0,
        week: 0,
        type: 0
      },
      allDataList: [],
      monthDataList: [],
      weekDataList: [],
    }
  },
  actions: {
    setThisMonthData(data) {
      this.thisMonthData = data;
    },
    setAllDataList(data) {
      this.allDataList = data;
    },
    setMonthDataList(data) {
      this.monthDataList = data;
    },
    setWeekDataList(data) {
      this.weekDataList = data;
    },
  },
})