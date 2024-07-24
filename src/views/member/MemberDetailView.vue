<template>
  <div class="root-container">
    <div class="left-side">
      <MemberInfoVue />
      <div class="btn-box">
        <SuccessWideBtnVue title="수정" :func="() => operateEditModal(true)" />
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)" />
      </div>
    </div>
  </div>
  <MemberDeleteModalVue :isVisible="deleteModalVisible" :close-modal="() => operateDeleteModal(false)" />
  <MemberUpdateModalVue :isVisible="editModalVisible" :close-modal="() => operateEditModal(false)" />
</template>

<script>
import { useMemberStore } from '@/stores/member';
import { mapStores } from 'pinia';
import { getMember } from '@/utils/member';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import MemberInfoVue from '@/components/member/MemberInfo.vue';
import MemberDeleteModalVue from '@/components/member/modal/MemberDeleteModal.vue';
import MemberUpdateModalVue from '@/components/member/modal/MemberUpdateModal.vue';

export default {
  components: {
    SuccessWideBtnVue,
    WarningWideBtnVue,
    MemberInfoVue,
    MemberDeleteModalVue,
    MemberUpdateModalVue
  },
  data() {
    return {
      editModalVisible: false,
      deleteModalVisible: false,
    }
  },
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    // 메서드 - 상품 수정 모달창 조작
    operateEditModal(value) {
      this.editModalVisible = value;
    },
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    }
  },
  async mounted() {
    await getMember(this.$route.params.id);

  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 60px 50px
}

.left-side {
  @include flex-box(column, space-between, 0px);
  width: 400px;
  height: 100%;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;
}

.btn-box {
  @include flex-box(row, center, 60px);
  width: 100%;
}
</style>