<template>
  <div class="static-box">
    <div class="title-box">
      {{ month }}월 청구 상태
    </div>
    <div class="info-box">
      <div class="data-box">
        <span>지난달 대비</span>
        <div class="percentage-info">
          <span>{{ staticStore.invoicedPercentageIncreasePrevMonth }}%</span>
          <span>{{ staticStore.invoicedPercentageIncreasePrevMonth >= 0 ? "증가" : "감소" }}</span>
          <i class="bi bi-arrow-up-circle-fill increase"
            v-if="staticStore.invoicedPercentageIncreasePrevMonth >= 0"></i>
          <i class="bi bi-arrow-down-circle-fill decrease"
            v-if="staticStore.invoicedPercentageIncreasePrevMonth < 0"></i>
        </div>
      </div>
      <div class="now-data">
        총 {{ thisMonthTotal }}원
      </div>
      <div class="data-box">
        <span>지난해 대비</span>
        <div class="percentage-info">
          <span>{{ staticStore.invoicedPercentageIncreasePrevYear }}%</span>
          <span>{{ staticStore.invoicedPercentageIncreasePrevYear >= 0 ? "증가" : "감소" }}</span>
          <i class="bi bi-arrow-up-circle-fill increase" v-if="staticStore.invoicedPercentageIncreasePrevYear >= 0"></i>
          <i class="bi bi-arrow-down-circle-fill decrease"
            v-if="staticStore.invoicedPercentageIncreasePrevYear < 0"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStaticStore } from '@/stores/static/static';
import { getThisMonthStatic } from '@/utils/static';
import { mapStores } from 'pinia';
import { formatNumber } from '@/utils/formatter';

export default {
  name: 'ThisMonthStaticvue',
  data() {
    return {
      today: new Date()
    }
  },
  computed: {
    ...mapStores(useStaticStore),
    // 이번 달 청구액 통화 표시
    thisMonthTotal() {
      return formatNumber(this.staticStore.thisMonthData.totalInvoiced);
    },
    year() {
      return this.today.getFullYear();
    },
    month() {
      return this.today.getMonth();
    }
  },
  async mounted() {
    // 지난 달 데이터 불러오기

    const prevMonthResult = await getThisMonthStatic(
      this.month - 1 === 0 ? this.year - 1 : this.year,
      this.month - 1 === 0 ? 12 : this.month - 1);

    if (prevMonthResult.code === 200 && prevMonthResult.data[0]) {
      this.staticStore.setPrevMonthData(prevMonthResult.data[0]);
    }

    // 지난 해 데이터 불러오기
    const prevYearResult = await getThisMonthStatic(
      this.month === 0 ? this.year - 2 : this.year - 1,
      this.month === 0 ? 12 : this.month - 1);

    if (prevYearResult.code === 200 && prevYearResult.data[0]) {
      this.staticStore.setPrevYearData(prevYearResult.data[0]);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/static-box.scss";

.info-box {
  @include flex-box(row, center, 30px);
  width: 100%;

  .now-data {
    border-radius: 15px;
    border: $theme-color 3px solid;
    box-shadow: $base-shadow;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold
  }

  .data-box {
    @include flex-box(column, center, 10px);

    >span {
      font-size: 14px;
      color: $input-color;
      font-weight: bold;
    }
  }
}

.percentage-info {
  @include flex-box(row, center, 5px);

  span {
    font-size: 16px;
    font-weight: bold;
  }

  i {
    font-size: 18px;
  }

  .increase {
    color: $warning-color
  }

  .decrease {
    color: $success-color
  }

}
</style>