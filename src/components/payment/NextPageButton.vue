<template>
  <div class="next-page-button-wrapper" :class="{ 'fixed-bottom': isFixedBottom }">
    <div class="next-page-button" :class="{ 'disabled': disabled }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextPageButtonVue',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFixedBottom: false
    }
  },
  mounted() {
    this.checkPosition();
    window.addEventListener('resize', this.checkPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkPosition);
  },
  methods: {
    checkPosition() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // documentHeight에 버튼의 높이를 더함
      this.isFixedBottom = windowHeight >= documentHeight;
    }
  }
}
</script>

<style lang="scss" scoped>
.next-page-button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
}

.next-page-button {
  height: 3rem;
  background-color: $theme-color;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.3rem;
  border-radius: 6px;
  font-weight: bold;
  padding: 0 2rem;
  cursor: pointer;

  &.disabled {
    background-color: $back-color;
    cursor: not-allowed;
  }
}

.fixed-bottom {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin: 0;
}
</style>