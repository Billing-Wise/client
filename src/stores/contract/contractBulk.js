import { defineStore } from 'pinia'

export const useContractBulkStore = defineStore('contractBulk', {
  state() {
    return {
      exampleImg: 'example_contract.png',
      download: '계약등록.xlsx',
      file: null,
      uploadData: null,
      errorList: [],
    }
  },
  actions: {
    setFile(file) {
      this.file = file;
    },
    setUploadData(uploadData) {
      this.uploadData = uploadData;
    },
    setErrorList(errorList) {
      this.errorList = errorList;
    }
  }
})
