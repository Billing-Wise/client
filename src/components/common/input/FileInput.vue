<template>
  <div class="info-input">
    <div class="icon-box">
      <i class="bi bi-folder"></i>
    </div>
    <div class="file-box" @click="triggerFileInput">{{ fileName }}</div>
  </div>
  <input 
    type="file" 
    ref="fileInput"
    @change="onFileChange" 
    style="display: none;">
</template>

<script>
export default {
  name: 'FileInputtVue',
  props: {
    'modelValue': File,
  },
  emits: ['update:modelValue'],
  computed:{
    fileName() {
      return this.modelValue ? this.modelValue.name : '파일 선택';
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.$emit('update:modelValue', file);
    }
  }

}
</script>

<style lang='scss' scoped>
  .info-input {
    @include flex-box(row, center, 0px);
    background-color: white;
    width: 100%;
    height: 40px;

    .icon-box {
      @include flex-box(row, center, 0px);
      @include white-text(24px);
      background: $theme-color;
      width: 80px;
      height: 100%;
      padding-top: 5px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .file-box {
      @include flex-box(row, center, 0px);
      @include base-icon;
      width: 100%;
      height: 100%;
      padding: 0px 10px;
      font-weight: bold;
      border: $theme-color solid;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

  }
</style>