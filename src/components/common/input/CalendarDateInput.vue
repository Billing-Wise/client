<template>
  <i class="bi bi-calendar4-range calendar-icon" @click="triggerDateInput"></i>
  <input 
    type="date" 
    ref="dateInput"
    :value="modelValue"
    @input="updateValue($event.target.value)"
    style="visibility: hidden; position: absolute;"
  >
</template>

<script>
export default {
  name: 'CalendarDateInputVue',
  props: {
    modelValue: String,
  },
  methods: {
    triggerDateInput() {
      this.$refs.dateInput.showPicker();
    },
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
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