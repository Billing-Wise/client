import { defineStore } from 'pinia'

export const useMemberBulkStore = defineStore('memberBulk', {
  state() {
    return {
      exampleImg: 'example_member.png',
      download: '회원등록.xlsx',
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
