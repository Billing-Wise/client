<template>
  <div class="static-box">
    <div class="title-box">
      {{ staticStore.thisMonthData.month }}월 납부 상태
    </div>
    <div class="info-box">
      <div class="data-box">
        <span>납부금 합계</span>
        <span>{{ totalCollected }}원</span>
      </div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{ width: staticStore.collectedPercentage + '%' }" aria-valuenow="100" aria-valuemin="0"
          aria-valuemax="100">{{ staticStore.collectedPercentage }}% 납부 완료</div>
      </div>
      <div class="data-box">
        <span>미납금 합계</span>
        <span>{{ outstanding }}원</span>
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
  name: 'ProgressBoxvue',
  computed: {
    ...mapStores(useStaticStore),
    // 납부금 통화 표시
    totalCollected() {
      return formatNumber(this.staticStore.thisMonthData.totalCollected);
    },
    // 미납금 통화 표시
    outstanding() {
      return formatNumber(this.staticStore.thisMonthData.outstanding);
    },
  },
  async mounted() {
    // 이번 달 데이터 불러오기
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const result = await getThisMonthStatic(
      month === 0 ? year - 1 : year,
      month === 0 ? 12 : month);

    this.staticStore.setThisMonthData(result.data[0]);
  }
}
</script>

<style lang="scss" scoped>

@import "@/assets/scss/component/static-box.scss";
.static-box {
  flex-grow: 1;
}

.progress {
  height: 40px;
  width: 250px;
  border: $theme-color 3px solid;
  background-color: white;
  box-shadow: $base-shadow;

  .progress-bar {
    background-color: $theme-color;
    font-size: 15px;
    font-weight: bold;
  }
}

.info-box {
  @include flex-box(row, center, 30px);
  width: 100%;

  .data-box {
    @include flex-box(column, center, 10px);
    font-size: 18px;
    font-weight: bold;
    span:first-child{
      font-size: 14px;
      color: $input-color
    }
  }
}
</style>