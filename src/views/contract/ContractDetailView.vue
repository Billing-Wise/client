<template>
  <div class="root-container">
    <div class="left-side">
      <ContractInfoVue/>
      <div class="btn-box">
        <WarningWideBtnVue title="삭제" :func="() => operateDeleteModal(true)"/>
        <ThemeWideBtnVue title="수정" :func="routeContractEdit"/>
      </div>
    </div>
  </div>
  <ContractDeleteModalVue :is-visible="deleteModalVisible" :close-modal="() => operateDeleteModal(false)"/>
</template>

<script>
import WarningWideBtnVue from '@/components/common/btn/WarningWideBtn.vue'
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue'
import ContractInfoVue from '@/components/contract/ContractInfo.vue'
import ContractDeleteModalVue from '@/components/contract/modal/ContractDeleteModal.vue'
import { mapStores } from 'pinia'
import { useContractCreateStore } from '@/stores/contract/contractCreate'


export default {
  name: 'ContractCreateView',
  components: {
    WarningWideBtnVue,
    ThemeWideBtnVue,
    ContractInfoVue,
    ContractDeleteModalVue
  },
  data() {
    return {
      warningMsg: '',
      deleteModalVisible: false,
    }
  },  
  computed: {
    ...mapStores(useContractCreateStore),
  },
  methods: {
    operateDeleteModal(value) {
      this.deleteModalVisible = value;
    },
    routeContractEdit() {
      this.$router.push(`/contract/${this.$route.params.id}/edit`)
    }
  },
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, space-between, 100px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 60px 130px;
}

.left-side {
  @include flex-box(column, space-between, 20px);
  min-width: 700px;
  width: 40%;
  min-height: 100%;
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  .btn-box {
    @include flex-box(row, center, 60px);
    width: 100%;
  }
}
</style>