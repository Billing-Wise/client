<template>
  <tr class="table-row">
    <td class="table-column"><span>{{ itemData.id }}</span></td>
    <td class="table-column"><img :src="itemData.imageUrl" alt="item-image" class="item-image"></td>
    <td class="table-column"><span>{{ itemData.name }}</span></td>
    <td class="table-column"><span>{{ currentPrice }}원</span></td>
    <td class="table-column"><span>{{ itemData.contractCount }}건</span></td>
    <td class="table-column"><span>{{ createdAtDate }}</span></td>
    <td class="table-column"><span>{{ updatedAtDate }}</span></td>
    <td class="table-column">
      <div 
        :class="['status-icon', itemData.isBasic ? 'basic' : 'not-basic', { 'not-editing': !isEditing }]"
        @click="toggleBasicStatus"
      >
        <div v-if="itemData.isBasic" class="checkmark"></div>
      </div>
    </td>
  </tr>
</template>

<script>
import { formatNumber, toDateFromDateTime } from '@/utils/formatter';

export default {
  name: 'SettingItemTableRow',
  props: {
    itemData: Object,
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPrice() {
      return formatNumber(this.itemData.price);
    },
    createdAtDate() {
      return toDateFromDateTime(this.itemData.createdAt)
    },
    updatedAtDate() {
      return toDateFromDateTime(this.itemData.updatedAt)
    }
  },
  methods: {
    toggleBasicStatus() {
      if (this.isEditing) {
        this.$emit('toggleBasic', this.itemData.id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: contain;
}

.status-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.5rem;
  cursor: pointer;

  &.basic {
    background-color: #7e57c2;

    .checkmark {
      width: 12px;
      height: 6px;
      border: 2px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      margin-top: -2px;
    }
  }

  &.not-basic {
    border: 2px solid #7e57c2;
    background-color: transparent;
  }

  &.not-editing {
    cursor: not-allowed;
  }
}
</style>