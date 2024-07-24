import { defineStore } from 'pinia'

export const useMemberBulkStore = defineStore('memberBulk', {
  state() {
    return {
      exampleImg: 'example_member.png',
      download: '회원등록.xlsx',
      file: null,
      isValid: false,
      uploadData: null,
      errorList: null,
    }
  },
  actions: {
    setFile(file) {
      this.file = file;
    },
    setIsValid(isValid) {
      this.isValid = isValid;
    },
    setUploadData(uploadData) {
      this.uploadData = uploadData;
    },
    setErrorList(errorList) {
      this.errorList = errorList;
    }
  }
})
