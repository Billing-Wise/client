<template>
  <div class="button-container-wrapper" :class="{ 'fixed-bottom': isFixedBottom }">
    <div class="button-container">
      <button class="nav-button back" @click="$emit('back-click')">
        <slot name="back-text">뒤로</slot>
      </button>
      <button class="nav-button next" @click="$emit('next-click')" :disabled="nextDisabled">
        <slot name="next-text">다음</slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonContainer',
  props: {
    nextDisabled: {
      type: Boolean,
      default: false
    },
    isFixedBottom: {
      type: Boolean,
      default: false
    }
  },
  emits: ['back-click', 'next-click']
}
</script>

<style lang="scss" scoped>
.button-container-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
}

.button-container {
  width: 100%;
  max-width: 500px; 
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.fixed-bottom {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0 2rem;

}

.nav-button {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.3rem;
  border-radius: 6px;
  font-weight: bold;
  padding: 0 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: none;
  background-color: $theme-color;

  &:hover {
    background-color: darken($theme-color, 10%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transform: none;
    }
  }
}
</style>