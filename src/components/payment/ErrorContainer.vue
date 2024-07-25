<template>
  <div class="error-container">
    <img src="@/assets/images/warn.png" alt="Warning" class="error-image">
    <div class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorContainerVue',
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30% 0;
}

.error-image {
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

.error-message {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>