<template>
<div :class="['side-bar-logout', { activated: isActive }]" @click="movePage">
  <i :class="icon"></i>
  <span>{{ title }}</span>
</div>
</template>

<script>
export default {
  name: 'SideBarItemVue',
  props: {
    title: String,
    icon: String,
    link: String,
    page: String
  },
  computed: {
    isActive() {
      return this.link === this.page;
    }
  },
  methods: {
    movePage() {
      this.$router.push({ path: `/${this.link}` });
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-logout {
  // background-color: $theme-color;
  @include flex-box(row, space-between, 15px);
  border-bottom: 1.5px solid $theme-color;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
  i {
    font-size: 24px;
  }
  span {
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    flex-grow: 1;
  }
  &:hover {
    background-color: $theme-color;
    color: white;
  }
}

.activated {
  background-color: $theme-color;
  color: white;
}
</style>