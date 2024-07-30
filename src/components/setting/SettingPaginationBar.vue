<template>
    <PaginationBarVue :store="store" v-if="!isEditing" />
    <div v-else class="editing-message">수정 중에는 페이지를 이동할 수 없습니다.</div>
</template>

<script>
import PaginationBarVue from '@/components/common/PaginationBar.vue';

export default {
  name: 'SettingPaginationBar',
  components: {
    PaginationBarVue
  },
  props: {
    store: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.editing-message {
  text-align: center;
  background-color: $theme-color;
  color: white;
  font-weight: bold;
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 15px 30px;
  z-index: 1;
  
}
</style>