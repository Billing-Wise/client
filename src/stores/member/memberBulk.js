import { defineStore } from 'pinia'

export const useMemberBulkStore = defineStore('memberBulk', {
  state() {
    return {
      exampleImg: 'example_member.png',
      download: 'https://t5-bucket.s3.ap-northeast-2.amazonaws.com/excel/%ED%9A%8C%EC%9B%90%EB%93%B1%EB%A1%9D.xlsx',
      fileName: '회원등록.xlsx',
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
