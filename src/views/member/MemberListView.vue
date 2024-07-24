<template>
  <div class="root-container">
    <div class="top-btn-box">
      <div class="btn-box">
        <ThemeIconBtnVue title="회원 등록" icon="bi bi-plus-square" @click="() => operateModal(true)"/>
        <ExcelBtnVue title="대량 등록"/>
      </div>
      <div  class="btn-box">
        <SearchInputVue title="검색어 입력" v-model="searchInput" :search="getMemberList"/>
        <KeywordSelectVue :selectedIdx="selectedIdx" :keywordArr="keywordArr" :choiceFunc="keywordSelect"/>
      </div>
    </div>
    <div class="table-box">
      <MemberTableVue/>
      <PaginationBarVue :store="memberStore"/>
    </div>
  </div>
  <MemberCreateModalVue 
    :isVisible="modalVisible" 
    :closeModal="() => operateModal(false)"/>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import SearchInputVue from '@/components/common/input/SearchInput.vue';
import ExcelBtnVue from '@/components/common/btn/ExcelBtn.vue';
import KeywordSelectVue from '@/components/common/select/KeywordSelect.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import MemberTableVue from '@/components/member/MemberTable.vue';
import MemberCreateModalVue from '@/components/member/MemberCreateModal.vue';
import { mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member';
import { getMemberList } from '@/utils/member';

export default {
  name: 'MemberListView',
  components: {
    ThemeIconBtnVue,
    SearchInputVue,
    ExcelBtnVue,
    KeywordSelectVue,
    PaginationBarVue,
    MemberTableVue,
    MemberCreateModalVue
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
      modalVisible: false,
    }
  },
  watch: {
    selectedIdx() {
      this.searchInput = '';
    },
    'memberStore.size': 'getMemberList',
    'memberStore.page': 'getMemberList',
    'memberStore.columns': {
      handler: 'getMemberList',
      deep: true
    }
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
    operateModal(value) {
      this.modalVisible = value;
    }
  },
  mounted() {
    this.getMemberList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  background: $back-color;
  width: 100%;
  min-height: 100%;
  padding: 30px 40px
}

.top-btn-box {
  @include flex-box(row, space-between, 0px);
  width: 100%;
  .btn-box {
    @include flex-box(row, space-between, 20px);
  }
}

</style>
