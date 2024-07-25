<template>
  <div class="size-choice">
    <span>항목수</span>
    <div class="dropdown-box">
      <div class="size-box" @click="activateDropdown">
        <span>{{ store.size }}</span>
        <i class="bi bi-caret-up-fill"></i>
      </div>
      <transition name="fade">
        <ul class="size-dropdown" v-if="activate">
          <li @click="setSize(50)" class="size-item">50</li>
          <li @click="setSize(20)" class="size-item">20</li>
          <li @click="setSize(10)" class="size-item">10</li>
          <li @click="setSize(5)" class="size-item">5</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "SizeChoice",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activate: false,
    }
  },
  methods: {
    activateDropdown() {
      this.activate = !this.activate;
    },
    setSize(size) {
      this.store.setSize(size);
      this.activate = false;
    },
    handleClickOutside(event) {
      if (!event.target.closest('.size-box, .size-item, .size-dropdown')) {
        this.activate = false;
      }
    }
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

.size-choice {
  @include flex-box(row, center, 10px);
  justify-self: end;

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.dropdown-box {
  position: relative;
  min-width: 80px;
}


.size-box {
  @include flex-box(row, center, 10px);
  @include base-icon();
  @include select-btn;
  padding: 7px 15px;
}

.size-dropdown {
  @include flex-box(column, center, 10px);
  @include select-list;
  bottom: calc(100%);
}

</style>