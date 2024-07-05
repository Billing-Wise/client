<template>
  <div class="side-bar">
    <div class="side-bar-list">
      <side-bar-item-vue title="홈" icon="bi bi-house-fill" link="" :page="nowPage" />
      <side-bar-item-vue title="상품" icon="bi bi-box-seam-fill" link="item" :page="nowPage"/>
      <side-bar-item-vue title="회원" icon="bi bi-person-fill" link="member" :page="nowPage"/>
      <side-bar-item-vue title="계약" icon="bi bi-cash-stack" link="contract" :page="nowPage"/>
      <side-bar-item-vue title="청구" icon="bi bi-receipt-cutoff" link="invoice" :page="nowPage"/>
      <side-bar-item-vue title="설정" icon="bi bi-gear-fill" link="setting" :page="nowPage"/>
    </div>
    <side-bar-logout-vue/>
  </div>
</template>

<script>
import SideBarItemVue from './side-bar/SideBarItem.vue';
import SideBarLogoutVue from './side-bar/SideBarLogout.vue';

export default {
  name: 'SideBarVue',
  components: {
    SideBarLogoutVue,
    SideBarItemVue
  },
  data() {
    return {
      nowPage: ''
    }
  },
  watch: {
    '$route.path': function(newPath) {
      this.nowPage = newPath.split('/')[1];
    },
  },
  created() {
    this.nowPage = this.$route.fullPath.split('/')[1];
  }
}
</script>

<style lang="scss" scoped>
  .side-bar {
    position: fixed;
    left: 0;
    top:60px;
    width: $side-bar-width;
    height: calc(100vh - $nav-bar-height);;
    box-shadow: 3px 0px 4px 0px rgb(0, 0, 0, 0.25);
    z-index: 1;
    @include flex-box(column, space-between, 0px);
    .side-bar-list {
      width: 100%;
    }
  }
</style>