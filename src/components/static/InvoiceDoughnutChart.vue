<template>
  <div class="static-box">
    <div class="title-box">전체 청구 상태</div>
    <DoughnutChart :chartData="invoiceData" :width="350" />
    <div class="info-box">
      <div class="each-info">
        <span class="title-txt">총 청구금</span>
        <span class="price-txt">{{ currentTotalInvoiced }} 원</span>
      </div>
      <div class="each-info">
        <span class="title-txt">총 납부금</span>
        <span class="price-txt">{{ currentTotalCollected }} 원</span>
      </div>
      <div class="each-info">
        <span class="title-txt">총 미납금</span>
        <span class="price-txt">{{ currentTotalOutstanding }} 원</span>
      </div>
    </div>
  </div>
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { mapStores } from 'pinia';
import { useStaticStore } from '@/stores/static/static';
import { getAllStatic } from '@/utils/static';
import { formatNumber } from '@/utils/formatter';

Chart.register(...registerables);

export default {
  name: 'InvoiceDoughnutChart',
  components: { DoughnutChart },
  data() {
    return {
      // 청구금, 납부금, 미납금 총 합산
      totalInvoiced: 0,
      totalCollected: 0,
      totalOutstanding: 0,
      // 원형 차트 데이터
      invoiceData: {
        labels: ['납부', '미납',],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#8270BE', 'rgba(130, 112, 190, 0.3)',],
          },
        ],
      }
    };
  },
  computed: {
    ...mapStores(useStaticStore),
    // 금액 데이터 통화 표시
    currentTotalInvoiced() {
      return formatNumber(this.totalInvoiced);
    },
    currentTotalCollected() {
      return formatNumber(this.totalCollected);
    },
    currentTotalOutstanding() {
      return formatNumber(this.totalOutstanding);
    }
  },
  // 생성시 통계 데이터 불러오기
  async mounted() {
    const result = await getAllStatic();

    if (result.code !== 200) {
      // 예외 처리
      return;
    }

    // 컴포넌트 데이터 업데이트
    this.staticStore.allDataList.forEach((data) => {
      this.totalInvoiced += data.totalInvoiced;
      this.totalCollected += data.totalCollected;
      this.totalOutstanding += data.outstanding;
    });

    // 객체 자체를 재할당하여 반응성을 보장
    this.invoiceData = {
      ...this.invoiceData,
      datasets: [
        {
          ...this.invoiceData.datasets[0],
          data: [this.totalCollected, this.totalOutstanding],
        },
      ],
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/component/static-box.scss";



  .info-box {
    @include flex-box(row, space-between, 50px);
    height: 100%;
    padding: 30px 0px;
  }



.each-info {
  @include flex-box(column, center, 10px);
  font-weight: bold;

  .title-txt {
    color: $input-color
  }

  .price-txt {
    font-size: 18px;
  }
}
</style>