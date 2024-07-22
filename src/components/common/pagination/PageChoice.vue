<template>
  <div class="page-choice">
    <div class="btn-box">
      <i class="bi bi-chevron-double-left move-icon" @click="this.store.setPage(0)"></i>
      <i class="bi bi-chevron-left move-icon" @click="this.store.setPage(store.page - 1)"></i>
    </div>
    <div class="number-box">
      <div 
        v-for="page in nowPageNumbers" 
        @click="setPage(page)"
        :key="page" 
        :class="{ 'active': store.page === page }"
        class="page-number">
        {{ page + 1 }}
      </div>
    </div>
    <div class="btn-box">
      <i class="bi bi-chevron-right move-icon" @click="this.store.setPage(store.page + 1)"></i>
      <i class="bi bi-chevron-double-right move-icon" @click="this.store.setPage(store.maxPage)"></i>
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
  @include flex-box(row, center, 40px);
  .btn-box {
    @include flex-box(row, center, 10px) 
  }
  .number-box {
    @include flex-box(row, center, 30px)
  }
}

.move-icon {
  @include flex-box(row, center, 0px);
  @include base-icon;
  color: $theme-color;
  border-radius: 50%;
  font-size: 28px;
  font-weight: bold;
}

.page-number {
  @include flex-box(row, center, 0px);
  @include base-icon;
  font-weight: bold;
  font-size: 14px;
}

.active {
  width: 34px;
  height: 34px;
  background-color: $theme-color;
  border-radius: 50%;
  font-size: 16px !important;///
  color : white;
}
</style>