<template>
  <div class="root-container">
    <div class="top-btn-box">
      <div class="btn-box">
        <ThemeIconBtnVue title="청구 수동 생성" icon="bi bi-plus-square" :func="routeCreate"/>
      </div>
    </div>
    <div class="table-box">
      <InvoiceTableVue/>
      <PaginationBarVue :store="invoiceListStore"/>
    </div>
  </div>
</template>

<script>
import ThemeIconBtnVue from '@/components/common/btn/ThemeIconBtn.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import InvoiceTableVue from '@/components/invoice/table/InvoiceTable.vue';
import { mapStores } from 'pinia';
import { useInvoiceListStore } from '@/stores/invoice/invoiceList';
import { getInvoiceList } from '@/utils/invoice';

export default {
  name: 'InvoiceListView',
  components: {
    ThemeIconBtnVue,
    PaginationBarVue,
    InvoiceTableVue
  },
  computed: {
    ...mapStores(useInvoiceListStore),
  },
  methods: {
    routeCreate() {
      this.$router.push({name: 'invoiceCreate'})
    },
    async getInvoiceList() {
      const result = await getInvoiceList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    setupWatchers() {
      this.$watch('invoiceListStore.size', this.getInvoiceList);
      this.$watch('invoiceListStore.page', this.getInvoiceList);
      this.$watch('invoiceListStore.columns', this.getInvoiceList, { deep: true });
      this.invoiceListStore.filters.forEach(filter => {
        if (filter.data !== 'itemName' && filter.data !== 'memberName') {
          this.$watch(() => filter.value, this.getInvoiceList);
        }
      });
    }
  },
  async mounted() {
    this.invoiceListStore.$reset();
    await this.getInvoiceList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  @include root-container;
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
