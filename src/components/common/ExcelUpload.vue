<template>
  <div class="excel-upload">
    <header>
      엑셀 파일 업로드
    </header>
    <div class="main-box">
      <div class="sample-box">
        <img :src="`/src/assets/images/${store.exampleImg}`" alt="">
        <div class="guide-line">
          <span>※ 위 사진처럼 이름과 형식을 맞춰서 입력해주세요</span>
          <ExcelBtnVue title="양식" :func="downloadSample" />
        </div>
      </div>
      <FileInputVue v-model="file" />
    </div>
    <footer>
      <ThemeWideBtnVue title="파일 업로드" :func="readExel" />
      <div class="error-box">{{ errorMsg }}</div>
    </footer>
  </div>
  <a ref="hiddenLink" style="display: none;" :href="`/src/assets/excels/${store.download}`"
    :download="store.download"></a>
</template>

<script>
import ExcelBtnVue from './btn/ExcelBtn.vue';
import ThemeWideBtnVue from './btn/ThemeWideBtn.vue';
import FileInputVue from './input/FileInput.vue';
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelUploadVue',
  components: {
    ThemeWideBtnVue,
    ExcelBtnVue,
    FileInputVue
  },
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      file: null,
      errorMsg: '',
    }
  },
  methods: {
    downloadSample() {
      const link = this.$refs.hiddenLink;
      link.click();
    },
    readExel() {
      if (this.file === null) {
        this.errorMsg = '파일을 업로드해주세요.';
        return;
      } 

      const fileName = this.file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (fileExtension !== 'xlsx') {
        this.errorMsg = '엑셀 파일(.xlsx) 형식의 파일을 업로드해주세요.';
        return;
      }

      this.errorMsg = ''
      this.store.setFile(this.file);
      
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const workbook = XLSX.read(e.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          this.store.setUploadData(json);
        }
      };

      reader.readAsArrayBuffer(this.file);
    }
  },
  mounted() { 
    this.store.setFile(null);
    this.store.setUploadData(null);
    this.store.setErrorList(null);
  }
}
</script>

<style lang="scss" scoped>
.excel-upload {
  @include flex-box(column, space-between, 60px);
  width: 700px;
  padding: 0px 30px;
  border-radius: 10px;
  box-shadow: $base-shadow;
  background-color: white;

  header,
  footer {
    @include flex-box(column, center, 10px);
    width: 100%;
  }

  header {
    font-size: 24px;
    font-weight: bold;
    padding: 30px 0px;
    border-bottom: $light-theme-color solid 3px;
  }

  footer {
    padding-top: 30px;
    border-top: $light-theme-color solid 3px;
  }

  .main-box {
    @include flex-box(column, space-between, 30px);
    width: 100%;

  }
}


.sample-box {
  @include flex-box(column, center, 30px);
  border: $theme-color solid 3px;
  border-radius: 10px;
  padding-bottom: 20px;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
  }

  .guide-line {
    @include flex-box(row, space-between, 0px);
    padding: 0px 30px;
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
}

.error-box {
  height: 30px;
  color: tomato;
  font-size: 14px;
  font-weight: bold
}
</style>