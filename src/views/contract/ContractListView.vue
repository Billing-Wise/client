<template>
  <div class="root-container">
    <div class="top-btn-box">
      <div class="btn-box">
        <ThemeIconBtnVue title="계약 등록" icon="bi bi-plus-square"/>
        <ExcelBtnVue title="대량 등록"/>
      </div>
    </div>
    <div class="table-box">
      <ContractTableVue/>
      <PaginationBarVue :store="contractStore"/>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import ExcelBtnVue from '@/components/common/btn/ExcelBtn.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import ContractTableVue from '@/components/contract/ContractTable.vue';
import { mapStores } from 'pinia';
import { useContractStore } from '@/stores/contract';
import { getContractList } from '@/utils/contract';

export default {
  name: 'ContractListView',
  components: {
    ThemeIconBtnVue,
    ExcelBtnVue,
    PaginationBarVue,
    ContractTableVue
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapStores(useContractStore),
  },
  methods: {
    async getContractList() {
      const result = await getContractList();
      console.log(result);
    },
    setupWatchers() {
      this.$watch('contractStore.size', this.getContractList);
      this.$watch('contractStore.page', this.getContractList);
      this.$watch('contractStore.columns', this.getContractList, { deep: true });
      this.contractStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getContractList);
        }
      });
    }
  },
  async mounted() {
    this.contractStore.$reset();
    await this.getContractList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
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
