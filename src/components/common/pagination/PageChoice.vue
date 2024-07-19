<template>
  <div class="page-choice">
    <div class="btn-box">
      <div class="move-icon" @click="this.store.setPage(0)">&lt;&lt;</div>
      <div class="move-icon" @click="this.store.setPage(store.page - 1)">&lt;</div>
    </div>
    <div class="number-box">
      <div 
        v-for="page in nowPageNumbers" 
        @click="setPage(page)"
        :key="page" 
        :class="{ 'active': store.page === page }"
        class="page-number">
        <span>{{ page + 1 }}</span>
      </div>
    </div>
    <div class="btn-box">
      <div class="move-icon" @click="this.store.setPage(store.page + 1)">></div>
      <div class="move-icon" @click="this.store.setPage(store.maxPage)">>></div>
    </div>
  </div>
</template>

<script>
export default {
  name : "PageChoiceVue",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  computed: {
    nowMaxPage() {
      return this.store.page + 2 < this.store.maxPage ? this.store.page + 2 : this.store.maxPage;
    },
    nowLeastPage() {
      return this.store.page - 2 > 0 ? this.store.page - 2 : 0;
    },
    nowPageNumbers() {
      const pages = [];
      for (let i = this.nowLeastPage; i <= this.nowMaxPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    setPage(page) {
      this.store.setPage(page);  
    }
  }
}
</script>

<style lang="scss" scoped>
.page-choice {
  @include flex-box(row, center, 20px);
  .btn-box {
    @include flex-box(row, center, 10px) 
  }
  .number-box {
    @include flex-box(row, center, 15px)
  }
}

.move-icon {
  @include flex-box(row, center, 0px);
  @include base-icon;
  width: 32px;
  height: 32px;
  background-color: $theme-color;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  color : white;
}

.page-number {
  @include flex-box(row, center, 0px);
  @include base-icon;
  font-weight: bold;
  font-size: 14px;
}

.active {
  width: 28px;
  height: 28px;
  background-color: $theme-color;
  border-radius: 50%;
  font-size: 18px !important;///
  color : white;
}
</style>