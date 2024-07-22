<template>
  <div class="size-choice">
    <span>항목수</span>
    <div class="size-box" @click="activateDropdown">
      <span>{{ store.size }}</span>
      <i class="bi bi-caret-up-fill"></i>
    </div>
    <ul class="size-dropdown" v-if="activate">
      <li @click="setSize(50)" class="size-item">50</li>
      <li @click="setSize(20)" class="size-item">20</li>
      <li @click="setSize(10)" class="size-item">10</li>
      <li @click="setSize(5)" class="size-item">5</li>
    </ul>
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
  methods : {
    activateDropdown() {
      this.activate = !this.activate;
    },
    setSize(size){
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
.size-choice {
  position: relative;
  justify-self: end;
  @include flex-box(row, center, 10px);

  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.size-box {
  @include flex-box(row, center, 5px);
  padding: 3px 7px;
  border-radius: 10px;
  box-shadow: 0px 1px 5px 1px rgb(0, 0, 0, 0.3);
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }

  i {
    font-size: 24px;
  }
}

.size-dropdown{
  position: absolute;
  right: 0px;
  bottom: calc(100% + 5px);
  padding : 0px;
  margin : 0px;
  box-shadow: 0px 1px 5px 1px rgb(0, 0, 0, 0.3);
  z-index: 10;
  list-style: none;
  li {
    font-size: 18px;
    font-weight: bold;
    padding: 5px 20px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color:rgb(0, 0, 0, 0.1)
    }
  }
}

</style>