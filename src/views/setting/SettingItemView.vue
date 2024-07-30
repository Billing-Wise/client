<template>
  <div class="root-container">
      <div class="top-btn-box">
        <div class="tab-container">
          <button 
            class="tab-button" 
            :class="{ active: $route.name === 'settingItem' }"
            @click="$router.push({ name: 'settingItem' })"
          >
            상품 설정
          </button>
          <button 
            class="tab-button"
            :class="{ active: $route.name === 'settingPayment' }"
            @click="$router.push({ name: 'settingPayment' })"
          >
            결제수단 설정
          </button>
        </div>
        <div class="right-buttons">
          <ThemeBtnVue v-if="!isEditing" title="수정" :func="startEditing"/>
          <template v-else>
            <WarningThemeBtnVue title="초기화" :func="cancelEditing"/>
            <ThemeBtnVue title="저장" :func="saveChanges"/>
          </template>
        </div>
      </div>
      <div class="table-box">
        <SettingItemTable :isEditing="isEditing"/>
        <SettingPaginationBar :store="settingItemStore" :isEditing="isEditing"/>
      </div>
  </div>
</template>

<script>
import ThemeBtnVue from '@/components/common/btn/ThemeBtn.vue';
import WarningThemeBtnVue from '@/components/common/btn/WarningBtn.vue';
import SettingItemTable from '@/components/setting/SettingItemTable.vue';
import SettingPaginationBar from '@/components/setting/SettingPaginationBar.vue';
import { useSettingItemStore } from '@/stores/setting/settingItem';
import { mapActions } from 'pinia';
import { mapStores } from 'pinia';
import { getSettingItemList, setEasyConsentItems } from '@/utils/setting';

export default {
  name : 'SettingItemView',
  components: {
    ThemeBtnVue,
    WarningThemeBtnVue,
    SettingItemTable,
    SettingPaginationBar,
  },
  data() {
    return {
      modalVisible: false,
      isEditing: false,
    }
  },
  computed: {
    ...mapStores(useSettingItemStore)
  },
  watch: {
    'settingItemStore.size': 'getItemList',
    'settingItemStore.page': 'getItemList',
    'settingItemStore.columns': {
      handler: 'getItemList',
      deep: true
    }
  },
  methods: {
    ...mapActions(useSettingItemStore, ['setPage', 'setItemList', 'startEditing', 'cancelEditing']),
    async getItemList() {
      const result = await getSettingItemList();
      if (result.code !== 200) {
        // 예외 처리
      }
    },
    operateModal(value) {
      this.modalVisible = value;
    },
    setupWatchers() {
      this.$watch('settingItemStore.size', this.getItemList);
      this.$watch('settingItemStore.page', this.getItemList);
      this.$watch('settingItemStore.columns', this.getItemList, { deep: true });
    },
    startEditing() {
      this.isEditing = true;
      this.settingItemStore.startEditing();
    },
    async saveChanges() {
      try {
        const changedItems = this.settingItemStore.itemList.filter(item => 
          item.isBasic !== this.settingItemStore.originalItemList.find(originalItem => originalItem.id === item.id).isBasic
        );

        const itemIdList = changedItems.map(item => item.id);

        if (itemIdList.length > 0) {
          const result = await setEasyConsentItems(itemIdList);
          if (result.code === 200) {
            await this.getItemList();
          } else {
            console.error('저장 실패:', result.message);
          }
        }
        this.isEditing = false;
      } catch (error) {
        console.error('저장 중 오류 발생:', error);
      }
    },
    cancelEditing() {
      this.settingItemStore.cancelEditing();
      this.isEditing = false;
    }
  },
  async mounted() {
    this.settingItemStore.$reset();
    this.setupWatchers();
    await this.getItemList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/component/table.scss";

.root-container {
  @include flex-box(column, space-between, 20px);
  background: $back-color;
  width: 100%;
  height: 100%;
  padding: 30px 40px
}

.top-btn-box {
  @include flex-box(row, space-between, 20px);
  width: 100%;
}

.tab-container {
  @include flex-box(row, flex-start, 0);
  width: 20rem;
  background: white;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-button {
  flex: 1;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  color: $input-color;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background-color: $theme-color;
    color: white;
  }
}

.right-buttons {
  @include flex-box(row, center, 10px);
}


</style>