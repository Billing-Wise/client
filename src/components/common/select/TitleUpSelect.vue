<template>
  <div class="title-select">
    <div class="title-box">
      {{ title }}
    </div>
    <div class="select-box">
      <button class="select-btn" @click="opreateSelect">
        <span>{{ keywordArr[selectedIdx].name }}</span>
        <i class="bi bi-caret-up-fill"></i>
      </button>
      <transition name="fade">
        <ul class="select-list" v-if="selectVisible">
          <li v-for="(value, key) in keywordArr" :key="key" @click="() => selectKeyword(key)">{{ value.name }}</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleUpSelecttVue',
  props: {
    title: String,
    selectedIdx: Number,
    keywordArr: Array,
    choiceFunc: Function,
  },
  data() {
    return {
      selectVisible: false,
    }
  },
  methods: {
    opreateSelect() {
      this.selectVisible = !this.selectVisible;
    },
    selectKeyword(idx) {
      this.choiceFunc(idx);
      this.selectVisible = false;
    },
    handleClickOutside(event) {
      if (!event.target.closest('.select-btn, .select-btn, .select-items')) {
        this.selectVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/component/select.scss';

.title-select {
  @include flex-box(row, center, 0px);
  background-color: white;
  width: 100%;
  height: 40px;

  .title-box {
    @include flex-box(row, center, 0px);
    @include white-text(16px);
    background: $theme-color;
    width: 140px;
    height: 100%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .select-box {
    width: 100%;
    height: 100%;
    padding: 0px 5px;
    font-weight: bold;
    font-size: 14px;
    border: $theme-color solid;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.select-box {
    position: relative;
    width: 100%;
  }

  .select-btn {
    @include flex-box(row, space-between, 10px);
    @include base-icon();
    width: 100%;
    padding: 7px 15px;
    background: none;
    border: none;
    font-weight: bold
  }

  .select-list {
    @include flex-box(column, center, 10px);
    @include select-list;
    bottom: calc(100%);
    width:90%;
  }
</style>