<template>
  <div class="root-container">
    <i class="bi bi-x-circle-fill"></i>
    <span>접근 권한이 없는 페이지입니다.</span>
    <div class="btn-box">
      <WhiteIconBtnVue title="뒤로 가기" icon="bi bi-caret-left-fill" :func="goBack"/>
    </div>
  </div>
</template>

<script>
import WhiteIconBtnVue from '@/components/common/btn/WhiteIconBtn.vue';

export default {
  name: 'AccessDeniedView',
  components: {
    WhiteIconBtnVue
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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