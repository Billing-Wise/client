<template>
  <div class="root-container">
    <div class="inner-container">
      <div class="left-container">
        <div class="left-header">
          <ThisMonthStatic />
          <ProgressBoxVue />
        </div>
        <InvoiceAreaChartVue />
      </div>
      <div class="right-container">
        <div class="btn-container">
          <ThemeWideBtnVue title="CSV 다운로드" :func="downloadCsvData"/>
          <ThemeWideBtnVue title="엑셀 다운로드" :func="downloadExcelData"/>
        </div>
        <InvoiceDoughnutChartVue />
      </div>
    </div>
  </div>
</template>

<script>
import { useStaticStore } from '@/stores/static/static';
import { mapStores } from 'pinia';
import { getAllStatic } from '@/utils/static';
import * as XLSX from 'xlsx';
import ProgressBoxVue from '@/components/static/ProgressBox.vue';
import ThisMonthStatic from '@/components/static/ThisMonthStatic.vue';
import InvoiceDoughnutChartVue from '@/components/static/InvoiceDoughnutChart.vue';
import InvoiceAreaChartVue from '@/components/static/InvoiceAreaChart.vue';
import ThemeWideBtnVue from '@/components/common/btn/ThemeWideBtn.vue';

export default {
  name: 'HomeView',
  components: {
    ProgressBoxVue,
    ThisMonthStatic,
    InvoiceDoughnutChartVue,
    InvoiceAreaChartVue,
    ThemeWideBtnVue,
  },
  computed: {
    ...mapStores(useStaticStore)
  },
  methods: {
    // 엑셀 파일 다운로드
    async downloadExcelData() {
      const result = await getAllStatic();
      const data = result.data;

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
      XLSX.writeFile(workbook, "data.xlsx");
    },
    // CSV 파일 다운로드
    async downloadCsvData() {
      const result = await getAllStatic();
      const data = result.data;

      const csvContent = "data:text/csv;charset=utf-8,"
        + ["id,date,totalInvoiced,totalCollected,outstanding,year,month,week,type"].join(",") + "\n"
        + data.map(e => Object.values(e).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(row, center, 0px);
  @include root-container;
  height: auto;
  padding: 30px 50px
}

.inner-container {
  @include flex-box(row, space-between, 0px);
  width: 1620px;
  height: 850px
}

.left-container {
  @include flex-box(column, space-between, 40px);
  width: 1100px;
  min-width: 1100px;
  height: 100%;

  .left-header {
    @include flex-box(row, space-between, 30px);
    width: 100%;
  }
}

.right-container {
  @include flex-box(column, space-between, 30px);
  height: 100%;

  .btn-container {
    @include flex-box(column, center, 20px);
    flex-grow: 1;
    width: 100%;
  }
}
</style>
