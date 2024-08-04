<template>
  <div class="root-container">
    <div class="main-container">
      <div class="top-btn-box">
        <div class="btn-box">
          <ThemeIconBtnVue title="회원 등록" icon="bi bi-plus-square" :func="() => operateModal(true)" />
          <ExcelBtnVue title="대량 등록" :func="directCreateBulk" />
        </div>
        <MemberSearchVue />
      </div>
      <div class="table-box">
        <MemberTableVue />
        <PaginationBarVue :store="memberStore" />
      </div>
    </div>
  </div>
  <MemberCreateModalVue :isVisible="modalVisible" :closeModal="() => operateModal(false)" />
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import ExcelBtnVue from '@/components/common/btn/ExcelBtn.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import MemberTableVue from '@/components/member/table/MemberTable.vue';
import MemberCreateModalVue from '@/components/member/modal/MemberCreateModal.vue';
import MemberSearchVue from '@/components/member/MemberSearch.vue';
import { mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member/member';
import { getMemberList } from '@/utils/member';

export default {
  name: 'MemberListView',
  components: {
    ThemeIconBtnVue,
    ExcelBtnVue,
    PaginationBarVue,
    MemberTableVue,
    MemberCreateModalVue,
    MemberSearchVue
  },
  data() {
    return {
      modalVisible: false,
    }
  },
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    async getMemberList() {
      const result = await getMemberList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    operateModal(value) {
      this.modalVisible = value;
    },
    directCreateBulk() {
      this.$router.push({ name: 'memberBulk' });
    },
    setupWatchers() {
      this.$watch('memberStore.size', this.getMemberList);
      this.$watch('memberStore.page', this.getMemberList);
      this.$watch('memberStore.columns', this.getMemberList, { deep: true });
    }
  },
  async mounted() {
    this.memberStore.$reset();
    this.setupWatchers();
    await this.getMemberList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, center, 20px);
  @include root-container;
  background: $back-color;
  width: fit-content;
  height: 100%;
  padding: 30px 40px;

  .main-container {
    @include flex-box(column, center, 30px);
    width: 1200px;
    height: 100%;
  }
}

.top-btn-box {
  @include flex-box(row, space-between, 0px);
  width: 100%;

  .btn-box {
    @include flex-box(row, space-between, 20px);
  }
}
</style>
