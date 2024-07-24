<template>
  <div class="root-container">
    <div class="left-side">
      <ExcelUploadVue :store="memberBulkStore" />
      <div class="btn-box">
        <WarningWideBtnVue title="취소" :func="cancelBulk"/>
        <ThemeWideBtnVue title="초기화" :func="resetBulk"/>
        <SuccessWideBtnVue title="회원 등록" />
      </div>
    </div>
    <div class="right-side">
      <span>등록할 회원 정보</span>
      <MemberCreateTableVue />
    </div>
  </div>
</template>

<script>
import { useMemberBulkStore } from '@/stores/memberBulk';
import { mapActions, mapStores } from 'pinia';
import ExcelUploadVue from '@/components/common/ExcelUpload.vue';
import MemberCreateTableVue from '@/components/member/MemberCreateTable.vue';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue';

export default {
  name: 'MemberBulkCreateView',
  components: {
    ExcelUploadVue,
    MemberCreateTableVue,
    WarningWideBtnVue,
    SuccessWideBtnVue,
    ThemeWideBtnVue
  },
  computed: {
    ...mapStores(useMemberBulkStore)
  },
  methods: {
    ...mapActions(useMemberBulkStore, ['setIsValid', 'setUploadData', 'setErrorList', 'setFile']),
    cancelBulk() {
      this.$router.push({name: 'member'})
    },
    resetBulk() {
      this.memberBulkStore.setFile(null);
      this.memberBulkStore.setIsValid(false);
      this.memberBulkStore.setUploadData(null);
      this.memberBulkStore.setErrorList(null);
    }
  },
  mounted() {
    this.resetBulk();
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, center, 100px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  width: 700px;
  height: 100%;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.right-side {
  @include flex-box(column, start, 30px);
  min-width: 700px;
  height: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  span {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>