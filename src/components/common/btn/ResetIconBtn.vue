<template>
  <i class="bi bi-calendar4-range calendar-icon" @click="triggerDateInput"></i>
</template>

<script>
export default {
  name: 'ResetIconBtnVue',
  props: {
    func: Function
  },
};
</script>

<style lang="scss" scoped>
.calendar-icon {
  @include base-icon;
  // cursor: pointer;
  color: white;
  font-size: 20px;
}
</style>