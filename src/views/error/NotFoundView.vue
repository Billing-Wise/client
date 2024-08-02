<template>
  <div class="root-container">
    <img src="@/assets/images/warn.png" alt="warning">
    <span>요청하신 페이지를 찾을 수 없습니다.</span>
    <div class="btn-box">
      <WhiteIconBtnVue title="뒤로 가기" icon="bi bi-caret-left-fill" :func="goBack"/>
    </div>
  </div>
</template>

<script>
import WhiteIconBtnVue from '@/components/common/btn/WhiteIconBtn.vue';

export default {
  name: 'NotFoundView',
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
  img {
    width: 150px;
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