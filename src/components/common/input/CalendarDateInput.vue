<template>
  <i class="bi bi-calendar4-range" @click="triggerFileInput"></i>
  <input 
    type="date" 
    ref="dateInput"
    @change="onDateChange" 
    style="display: none;">
</template>

<script>
export default {
  name: 'CalendarDateInputVue',
  props: {
    'modelValue': Date,
  },
  emits: ['update:modelValue'],
  methods: {
    triggerFileInput() {
      this.$refs.dateInput.click();
    },
    onDateChange(event) {
      const date = event.target;
      console.log(date)
      this.$emit('update:modelValue', date);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>