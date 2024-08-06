<template>
  <div class="root-container">
    <div class="main-container">
      <div class="btn-container">
          <div class="btn-row">
            <ExcelBtnVue title="CSV" :func="downloadCsvData" />
            <ExcelBtnVue title="엑셀" :func="downloadExcelData" />
          </div>
          <ThemeBtnVue title="비회원 접속 링크" @click="() => operationLinkModal(true)"/>
        </div>
      <div class="top-container">
          <ThisMonthStatic />
          <ProgressBoxVue />
      </div>
      <div class="bottom-container">
        <InvoiceAreaChartVue />
        <InvoiceDoughnutChartVue />
      </div>
    </div>
  </div>
  <NonMemberLinkModalVue :is-visible="linkModalVisible" :close-modal="() => operationLinkModal(false)" />
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
import ThemeBtnVue from '@/components/common/btn/ThemeBtn.vue';
import ExcelBtnVue from '@/components/common/btn/ExcelBtn.vue';
import NonMemberLinkModalVue from '@/components/static/modal/NonMemberLinkModal.vue';

export default {
  name: 'HomeView',
  components: {
    ProgressBoxVue,
    ThisMonthStatic,
    InvoiceDoughnutChartVue,
    InvoiceAreaChartVue,
    ExcelBtnVue,
    ThemeBtnVue,
    NonMemberLinkModalVue
  },
  data() {
    return {
      linkModalVisible: false
    }
  },
  computed: {
    ...mapStores(useStaticStore),
  },
  methods: {
    // 모달창 제어
    operationLinkModal(value) {
      this.linkModalVisible = value
    },
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
  },
  created() {
    this.staticStore.$reset();
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(column, center, 0px);
  @include root-container;
  height: auto;
  width: fit-content;
  padding: 30px 50px;

  .main-container {
    @include flex-box(column, center, 30px);
    width: 1400px;
  }
}

.top-container {
  @include flex-box(row, center, 50px);
  width: 100%;

  .top-left {
    @include flex-box(row, space-between, 30px);
    min-width: 1000px;
  }
}

.btn-container {
    @include flex-box(row, space-between, 20px);
    width: 100%;

    .btn-row {
      @include flex-box(row, center, 20px);
    }
  }

.bottom-container {
  @include flex-box(row, space-between, 30px);
  width: 100%;
  height: 600px;
}
</style>
