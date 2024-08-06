<template>
  <tr class="table-row" @click="routeContractDetail">
    <td class="table-column"><span>{{ contractData.id }}</span></td>
    <td class="table-column"><span>{{ contractData.itemName }}</span></td>
    <td class="table-column"><span>{{ currentChargeAmount }} 원</span></td>
    <td class="table-column"><span>매월 {{ contractData.contractCycle }}일</span></td>
    <td class="table-column"><span>{{ contractData.subscription? '구독' : '단기' }}</span></td>
    <td class="table-column"><span>{{ contractData.invoiceType.name }}</span></td>
    <td class="table-column">
      <div class="contract-status">
        <span>{{ contractData.contractStatus.name }}</span>
        <div :class="contractStatsClass"></div>
      </div>
    </td>
    <td class="table-column"><span>{{ contractData.paymentType.name }}</span></td>
    <td class="table-column"><div class="unpaid-sticker" :class="upPaidStatusClass">{{ upPaidStatus }}</div></td>
  </tr>
</template>

<script>
import { formatNumber } from '@/utils/formatter';

export default {
  name: 'MemberContractTableRowVue',
  props: {
    contractData: Object
  },
  data() {
    return {
      contractStatusClass : ['pending', 'progress', 'end']
    }
  },
  computed: {
    currentChargeAmount() {
      return formatNumber(this.contractData.chargeAmount);
    },
    contractStatsClass() {
      const id = this.contractData.contractStatus.id
      if (id === 1) {
        return 'waiting';
      } else if (id === 2) {
        return 'success';
      } else {
        return 'warning';
      }
    },
    upPaidStatusClass() {
      const count = this.contractData.totalUnpaidCount;
      return count > 0 ? 'warning' : 'success';
    },
    upPaidStatus() {
      const count = this.contractData.totalUnpaidCount;
      return count > 0 ? `미납 ${count}건` : '없음';
    },
  },
  methods: {
    routeContractDetail() {
      this.$router.push(`/contract/${this.contractData.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.contract-status {
  @include flex-box(row, start, 10px);
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}

.unpaid-sticker {
  @include flex-box(row, center, 0px);
  @include white-text(14px);
  padding: 3px 5px;
  border-radius: 20px;
}

.waiting {
    background-color: $waiting-color;
  }

  .success {
    background-color: $success-color;
  }

  .warning {
    background-color: $warning-color;
  }
</style>