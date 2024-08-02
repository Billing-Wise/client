<template>
  <div class="root-container">
    <i class="bi bi-exclamation-diamond-fill"></i>
    <span>서버와의 통신에 오류가 발생하였습니다.</span>
    <div class="btn-box">
      <WhiteIconBtnVue title="뒤로 가기" icon="bi bi-caret-left-fill" :func="goBack"/>
    </div>
  </div>
</template>

<script>
import WhiteIconBtnVue from '@/components/common/btn/WhiteIconBtn.vue';
import { useErrorHandleStore } from '@/stores/error/errorHandle';
import { mapStores } from 'pinia';

export default {
  name: 'ServerErrorView',
  components: {
    WhiteIconBtnVue
  },
  computed: {
    ...mapStores(useErrorHandleStore),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.errorHandleStore.$reset();
    }
  }
}
</script>

<style lang="scss" scoped>
.root-container {
  @include flex-box(column, center, 20px);
  width: 100vw;
  height: 100vh;
  i {
    font-size: 120px;
    color: $theme-color
  }

  span {
    font-weight: bold;
    font-size: 18px;
  }
}

.btn-box {
  @include flex-box(row, center, 40px);
  margin-top: 20px
}
</style>