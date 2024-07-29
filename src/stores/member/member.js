import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
  state() {
    return {
      page: 0,
      size: 10,
      maxPage: 0,
      memberList: [],
      currentMember: {},
      columns: [
        { data: 'id', name: '회원번호', sort: null },
        { data: 'name', name: '이름', sort: null },
        { data: 'email', name: '이메일', sort: null },
        { data: 'phone', name: '전화번호', sort: null },
        { data: 'contractCount', name: '계약 건수', sort: null },
        { data: 'createdAt', name: '생성일', sort: null },
        { data: 'updatedAt', name: '수정일', sort: null }
      ],
      search : {keyword: 'name', value: null},
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
    setMemberList(memberList) {
      this.memberList = memberList;
    },
    setColumnSort(columnData, sortValue) {
      const column = this.columns.find((col) => col.data === columnData);
      if (column) {
        column.sort = sortValue;
      }
    },
    setCurrentMember(info) {
      this.currentMember = info;
    },
    setKeyword(keyword) {
      this.search.keyword = keyword;
    },
    setSearchValue(value) {
      this.search.value = value
    }
  }
})
