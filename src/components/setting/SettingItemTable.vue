<template>
  <table class="item-table">
    <thead>
      <SettingTableHeader :store="settingItemStore" :isEditing="isEditing"/>
    </thead>
    <tbody>
      <SettingItemTableRow 
        v-for="(value, key) in settingItemStore.itemList" 
        :key="key" 
        :itemData="value"
        :isEditing="isEditing"
        @toggleBasic="toggleBasicItem"
      />
    </tbody>
  </table>
</template>

<script>
import { mapStores } from 'pinia';
import { useSettingItemStore } from '@/stores/setting/settingItem';
import SettingTableHeader from './SettingTableHeader.vue';
import SettingItemTableRow from './SettingItemTableRow.vue';

export default {
  name: 'SettingItemTable',
  components: {
    SettingTableHeader,
    SettingItemTableRow
  },
  props: {
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useSettingItemStore),
  },
  methods: {
    toggleBasicItem(itemId) {
      if (this.isEditing) {
        this.settingItemStore.toggleItemBasicStatus(itemId);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.item-table {
  @include base-table();
}

.table-row {
  transition: all 0.3s;
  border-bottom: 1px solid #ccc;
  cursor: default;

  &:hover {
    background-color: white;
    opacity: 100;
  }
}
</style>