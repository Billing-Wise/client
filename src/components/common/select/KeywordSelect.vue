<template>
  <div class="theme-select">
    <button class="select-btn" @click="opreateSelect">
      <span>{{ keywordArr[selectedIdx].title }}</span>
      <i class="bi bi-caret-down-fill"></i>
    </button>
    <transition name="fade">
      <ul class="select-list" v-if="selectVisible">
        <li v-for="(value, key) in keywordArr" :key="key" @click="() => selectKeyword(key)">{{value.title}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'KeywordSelectVue',
  props: {
    selectedIdx: Number,
    keywordArr : Array,
    choiceFunc : Function,
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

<style lang="scss" scoped>
@import '@/assets/scss/component/select.scss';

  .theme-select {
    position: relative;
    min-width: 130px;
  }

  .select-btn {
    @include flex-box(row, center, 10px);
    @include base-icon();
    @include select-btn;
    padding: 7px 15px;
  }

  .select-list {
    @include flex-box(column, center, 10px);
    @include select-list;
    top: calc(100% + 10px);
  }

</style>