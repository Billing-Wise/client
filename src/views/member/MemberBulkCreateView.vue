<template>
  <div class="root-container">
    <div class="left-side">
      <ExcelUploadVue :store="memberBulkStore" />
      <div class="btn-box">
        <WarningWideBtnVue title="취소" :func="cancelBulk"/>
        <SuccessWideBtnVue title="회원 등록" :func="registerBulk"/>
      </div>
    </div>
    <div class="right-side">
      <span>등록할 회원 정보</span>
      <MemberCreateTableVue />
    </div>
  </div>
  <MemberBulkErrorModalVue :isVisible="isInValid" :close-modal="() => operateErrorModal(false)"/>
</template>

<script>
import { useMemberBulkStore } from '@/stores/memberBulk';
import { mapActions, mapStores } from 'pinia';
import { createMemberBulk } from '@/utils/member';
import ExcelUploadVue from '@/components/common/ExcelUpload.vue';
import MemberCreateTableVue from '@/components/member/table/MemberCreateTable.vue';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import MemberBulkErrorModalVue from '@/components/member/modal/MemberBulkErrorModal.vue';
import { useMemberStore } from '@/stores/member';

export default {
  name: 'MemberBulkCreateView',
  components: {
    ExcelUploadVue,
    MemberCreateTableVue,
    WarningWideBtnVue,
    SuccessWideBtnVue,
    MemberBulkErrorModalVue
  },
  data() {
    return {
      isInValid: false,
    }
  },
  computed: {
    ...mapStores(useMemberBulkStore),
    ...mapStores(useMemberStore)
  },
  methods: {
    ...mapActions(useMemberBulkStore, ['setUploadData', 'setErrorList', 'setFile']),
    cancelBulk() {
      this.$router.push({name: 'member'})
    },
    operateErrorModal(value) {
      this.isInValid = value;
    },
    async registerBulk() {
      if (this.memberBulkStore.file === null) {
        this.memberBulkStore.setErrorList(['파일이 업로드되지 않았습니다.']);
        this.operateErrorModal(true);
        return;
      }

      const result = await createMemberBulk(this.memberBulkStore.file);

      if (result.code !== 200) {
        this.operateErrorModal(true);
        return;
      } 
      
      this.$router.push({name: 'member'})
    },
  },
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