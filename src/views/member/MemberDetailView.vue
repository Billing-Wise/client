<template>
  <div class="root-container">
    <div class="left-side">
      <MemberInfoVue />
      <div class="btn-box">
        <SuccessWideBtnVue title="수정" :func="() => operateEditModal(true)" />
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)" />
      </div>
    </div>
    <div class="right-side">
      <div class="right-header">
        <span class="contract-count">총 {{ memberStore.currentMember.contractCount }}건</span>
        <span class="contract-title">현재 회원 관련 계약</span>
        <ThemeIconBtnVue title="계약 등록" icon="bi bi-plus-square" :func="routContractCreate"/>
      </div>
      <div class="table-box">
        <MemberContractTableVue />
        <PaginationBarVue :store="contractListStore" />
      </div>
    </div>
  </div>
  <MemberDeleteModalVue :isVisible="deleteModalVisible" :close-modal="() => operateDeleteModal(false)" />
  <MemberUpdateModalVue :isVisible="editModalVisible" :close-modal="() => operateEditModal(false)" />
</template>

<script>
import { useMemberStore } from '@/stores/member/member';
import { useContractListStore } from '@/stores/contract/contractList';
import { mapStores } from 'pinia';
import { getMember } from '@/utils/member';
import SuccessWideBtnVue from '@/components/common/btn/SuccessWideBtn.vue';
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue';
import MemberInfoVue from '@/components/member/MemberInfo.vue';
import MemberDeleteModalVue from '@/components/member/modal/MemberDeleteModal.vue';
import MemberUpdateModalVue from '@/components/member/modal/MemberUpdateModal.vue';
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import MemberContractTableVue from '@/components/member/table/MemberContractTable.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import { getContractList } from '@/utils/contract';
import { useContractCreateStore } from '@/stores/contract/contractCreate';


export default {
  components: {
    SuccessWideBtnVue,
    WarningWideBtnVue,
    MemberInfoVue,
    MemberDeleteModalVue,
    MemberUpdateModalVue,
    ThemeIconBtnVue,
    MemberContractTableVue,
    PaginationBarVue
  },
  data() {
    return {
      editModalVisible: false,
      deleteModalVisible: false,
    }
  },
  computed: {
    ...mapStores(useMemberStore),
    ...mapStores(useContractListStore),
    ...mapStores(useContractCreateStore)
  },
  methods: {
    // 메서드 - 상품 수정 모달창 조작
    operateEditModal(value) {
      this.editModalVisible = value;
    },
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    routContractCreate() {
      this.contractCreateStore.$reset();
      this.contractCreateStore.setDataPassed(true);
      this.contractCreateStore.setStep(1);
      this.contractCreateStore.setMember(this.memberStore.currentMember);
      this.$router.push({name: 'contractCreate'})
    },
    async getContractList() {
      this.contractListStore.setFilter('memberId', this.$route.params.id);
      const result = await getContractList();
      if (result.code !== 200) {
        console.log(result);
      }
    },
    setupWatchers() {
      this.$watch('contractListStore.size', this.getContractList);
      this.$watch('contractListStore.page', this.getContractList);
      this.$watch('contractListStore.columns', this.getContractList, { deep: true });
      this.contractListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getContractList);
        }
      });
    }
  },
  async mounted() {
    const result = await getMember(this.$route.params.id);
    if (result.code === 404) {
      this.$router.push({name: 'noData'});
    }
    this.contractListStore.$reset();
    await this.getContractList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(row, space-between, 20px);
  @include root-container;
  height: 100%;
  padding: 20px 30px
}

.left-side {
  @include flex-box(column, space-between, 0px);
  width: 400px;
  height: 100%;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}

.right-side {
  @include flex-box(column, space-between, 20px);
  position: relative;
  width: 100%;
  height: 100%;

  .right-header {
    @include flex-box(row, space-between, 20px);
    width: 100%;
    padding: 0px 20px;

    .contract-count {
      font-size: 20px;
      font-weight: bold;
    }

    .contract-title {
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>