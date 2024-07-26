<template>
  <div class="btn-box">
    <KeywordSelectVue :selectedIdx="selectedIdx" :keywordArr="keywordArr" :choiceFunc="keywordSelect"/>
    <SearchInputVue title="검색어 입력" v-model="searchInput" :search="getMemberList"/>
  </div>
</template>

<script>
import SearchInputVue from '@/components/common/input/SearchInput.vue'
import KeywordSelectVue from '../common/select/KeywordSelect.vue';
import { useMemberStore } from '@/stores/member';
import { getMemberList } from '@/utils/member';
import { mapStores } from 'pinia';

export default {
  name: 'MemberSearch',
  components: {
    SearchInputVue,
    KeywordSelectVue
  },
  data() {
    return {
      searchInput: '',
      keywordArr: [
        {title: '이름', data: 'name'},
        {title: '이메일', data: 'email'},
        {title: '전화번호', data: 'phone'},
      ],
      selectedIdx: 0,
    }
  },
  watch: {
    selectedIdx() {
      this.searchInput = '';
    },
  },  
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    keywordSelect(idx) {
      this.selectedIdx = idx
    },
    async getMemberList() {
      const result = await getMemberList(this.keywordArr[this.selectedIdx].data, this.searchInput);
      if (result.code !== 200) {
        // 예외 처리
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  @include flex-box(row, space-between, 20px);
}
</style>