<template>
  <div class="static-box">
    <div class="title-box">연간 청구 상태 변화</div>
    <LineChart :chartData="invoiceData" :width="1000" />
    <div class="year-box">
      <i class="bi bi-caret-left-fill" @click="minusYear"></i>
      <span>{{ year }}년</span>
      <i class="bi bi-caret-right-fill" @click="plusYear"></i>
    </div>
  </div>
</template>

<script>
import { useStaticStore } from '@/stores/static/static';
import { getYearStatic } from '@/utils/static';
import { mapStores } from 'pinia';
import { LineChart } from 'vue-chart-3';

export default {
  name: 'InvoiceAreaChartVue',
  components: {
    LineChart
  },
  watch: {
    // 년도 변화에 따른 데이터 갱신
    year() {
      this.getYearStatic();
    }
  },
  data() {
    return {
      // 년도 표시
      year: 0,
      // 차트 관련 데이터
      invoiceData: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            label: '청구금',
            backgroundColor: 'rgb(130, 112, 190, 0.2)',
            borderColor: 'rgb(130, 112, 190, 1)',
            borderWidth: 2,
            data: [],
          },
          {
            label: '납부금',
            backgroundColor: 'rgb(44, 128, 206, 0.2)',
            borderColor: 'rgb(44, 128, 206)',
            borderWidth: 2,
            data: [],
          },
          {
            label: '미납금',
            backgroundColor: 'rgb(255, 99, 71, 0.2)',
            borderColor: 'rgb(255, 99, 71, 1)',
            borderWidth: 2,
            data: [],
          }]
      },
    };
  },
  computed: {
    ...mapStores(useStaticStore),
  },
  methods: {
    // 년도 증가
    plusYear() {
      this.year++;
    },
    // 년도 감소
    minusYear() {
      this.year--;
    },
    // 년도별 청구 통계 불러오기
    async getYearStatic() {
      // 차트에 넣을 데이터 배열
      const monthlyInvoiced = new Array(12).fill(0);
      const monthlyCollected = new Array(12).fill(0);
      const monthlyOutstanding = new Array(12).fill(0);

      // 연간 데이터 불러오기
      const result = await getYearStatic(this.year);
      if (result.code !== 200) {
        // 예외처리
        return;
      }

      // 차트에 데이터 넣기
      this.staticStore.monthDataList.forEach((data) => {
        monthlyInvoiced[data.month] = data.totalInvoiced;
        monthlyCollected[data.month] = data.totalCollected;
        monthlyOutstanding[data.month] = data.outstanding;
      })

      // 차트 표시
      this.invoiceData = {
        ...this.invoiceData,
        datasets: [
          {
            ...this.invoiceData.datasets[0],
            data: monthlyInvoiced,
          },
          {
            ...this.invoiceData.datasets[1],
            data: monthlyCollected,
          },
          {
            ...this.invoiceData.datasets[2],
            data: monthlyOutstanding,
          },
        ],
      };
    }
  },
  mounted() {
    const today = new Date();
    this.year = today.getFullYear();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/static-box.scss";
.static-box {
  width: 100%
}

.year-box {
  @include flex-box(row, center, 30px);

  span {
    font-size: 22px;
    font-weight: bold;
  }

  i {
    @include base-icon;
    font-size: 30px;
  }
}
</style>