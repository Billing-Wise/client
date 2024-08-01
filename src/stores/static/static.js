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
      prevMonthData: {
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
      prevYearData: {
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
      weekDataList: []
    }
  },
  actions: {
    setThisMonthData(data) {
      this.thisMonthData = data
    },
    setPrevMonthData(data) {
      this.prevMonthData = data
    },
    setPrevYearData(data) {
      this.prevYearData = data
    },
    setAllDataList(data) {
      this.allDataList = data
    },
    setMonthDataList(data) {
      this.monthDataList = data
    },
    setWeekDataList(data) {
      this.weekDataList = data
    }
  },
  getters: {
    collectedPercentage() {
      if (this.thisMonthData.totalInvoiced === 0) {
        return 0
      } else {
        return Math.floor(
          (this.thisMonthData.totalCollected / this.thisMonthData.totalInvoiced) * 100
        )
      }
    },
    invoicedPercentageIncreasePrevMonth() {
      if (this.prevMonthData.totalInvoiced === 0) {
        return 0
      } else {
        return Math.floor(
          ((this.thisMonthData.totalInvoiced - this.prevMonthData.totalInvoiced) /
            this.prevMonthData.totalInvoiced) *
            100
        )
      }
    },
    invoicedPercentageIncreasePrevYear() {
      if (this.prevYearData.totalInvoiced === 0) {
        return 0
      } else {
        return Math.floor(
          ((this.thisMonthData.totalInvoiced - this.prevYearData.totalInvoiced) /
            this.prevYearData.totalInvoiced) *
            100
        )
      }
    }
  }
})
