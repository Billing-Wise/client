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
        <ModalFooterVue :title="title" :errorMsg="errorMsg" :func="() => createItem()"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalHeaderVue from '../common/modal/ModalHeader.vue';
import ModalFooterVue from '../common/modal/ModalFooter.vue';
import InfoInputVue from '../common/input/InfoInput.vue';
import TextAreaInputVue from '../common/input/TextAreaInput.vue';
import { createItem } from '@/utils/item';

export default {
  name: 'ItemCreateModalVue',
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
      title: '상품 생성',
      errorMsg: '',
      name: '',
      price: '',
      description: '',
      imgSrc: null,
      imgFile: null
    }
  },
  methods: {
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
    // 상품 생성
    async createItem() {
      const data = {
          name: this.name,
          price: this.price,
          description: this.description
      };

      const result = await createItem(data, this.imgFile);

      if (result.code === 200) {
        this.closeModal();
        this.$router.push(`/item/${result.data.id}`);
      } else {
        this.errorMsg = result.message;
      }
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