import { defineStore } from 'pinia'

export const useContractBulkStore = defineStore('contractBulk', {
  state() {
    return {
      exampleImg: 'https://t5-bucket.s3.ap-northeast-2.amazonaws.com/excel/%EA%B3%84%EC%95%BD_%EC%97%91%EC%85%80_%EC%98%88%EC%8B%9C.png',
      download: 'https://t5-bucket.s3.ap-northeast-2.amazonaws.com/excel/%EA%B3%84%EC%95%BD%EB%93%B1%EB%A1%9D.xlsx',
      fileName: '계약등록.xlsx',
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
