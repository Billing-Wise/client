<template>
  <div class="loading-container">
    <img src="@/assets/images/loading.gif" alt="Loading" class="loading-image">
    <div class="loading-message">로딩 중</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingContainerVue'
}
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25vh;
}

.loading-image {
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

.loading-message {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>