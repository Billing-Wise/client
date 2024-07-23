<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <ModalHeaderVue :title="title" :closeModal="closeModal"/>
        <div class="modal-main">
          <div class="img-box" @click="triggerFileInput">
            <span v-if="!imgSrc">이미지 업로드</span>
            <img v-else :src="imgSrc" alt="Uploaded Image" />
          </div>
          <input type="file" ref="fileInput" @change="onImageChange" accept="image/*" style="display: none;" />
          <InfoInputVue title="상품명" v-model="name"/>
          <InfoInputVue title="가격" v-model="price"/>
          <TextAreaInputVue rows=5 title="상세설명을 입력하세요." v-model="description"/>
        </div>
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="() => updateItem()"/>
      </div>
    </div>
  </transition>
</template>

<script>
import { useItemStore } from '@/stores/item';
import { mapStores } from 'pinia';
import ModalHeaderVue from '../common/modal/ModalHeader.vue';
import ModalFooterVue from '../common/modal/ModalFooter.vue';
import InfoInputVue from '../common/input/InfoInput.vue';
import TextAreaInputVue from '../common/input/TextAreaInput.vue';
import { editItem, editItemImage } from '@/utils/item';

export default {
  name: 'ItemUpdateModalVue',
  components: {
    ModalHeaderVue,
    ModalFooterVue,
    InfoInputVue,
    TextAreaInputVue,
  },
  props: {
    'isVisible': Boolean,
    'closeModal': Function,
  },
  data() {
    return {
      title: '상품 수정',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
      imgSrc: null,
      imgFile: null
    }
  },
  computed: {
    ...mapStores(useItemStore),
  },
  watch: {
    isVisible(newVal) {
      if (newVal) this.showData();
    },
  },
  methods: {
    // 현재 데이터 표시
    async showData() {
      this.name = this.itemStore.currentItem.name;
      this.price = this.itemStore.currentItem.price + '';
      this.description = this.itemStore.currentItem.description;
      this.imgSrc = this.itemStore.currentItem.imageUrl;
    },
    // 이미지 업로드
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    // 이미지 등록
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imgFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // 상품 수정
    async updateItem() {
      let editSuccess = true;;

      // 상품 정보 수정
      const data = {
        name: this.name,
        price: this.price,
        description: this.description
      };
      const result = await editItem(this.itemStore.currentItem.id, data);

      if (result.code !== 200) {
        this.errorMsg = result.message;
        editSuccess = false;
      }

      // 상품 이미지 수정
      if (this.imgFile !== null && editSuccess) {
        console.log(this.imgFile)
        const result_img = await editItemImage(this.itemStore.currentItem.id, this.imgFile);
        if (result_img.code !== 200) {
          this.errorMsg = result_img.message;
          editSuccess = false;
        } 
      }

      // 모달창 종료
      if (editSuccess) this.closeModal();
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/component/modal.scss';

.img-box {
  @include flex-box(row, center, 0px);
  @include base-icon;
  width: 250px;
  height: 250px;
  border: $theme-color solid 3px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>