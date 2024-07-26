<template>
  <div class="contract-info-view">
    <div class="content">
      <p class="instruction">계약 정보를 확인해주세요.</p>
      <form class="input-info">
        <InfoInputVue title="회원 정보" :value="name" readonly />
        <InfoInputVue :value="email" readonly />
        <InfoInputVue :value="phone" readonly />
        <InfoInputVue title="상품" :value="productName" readonly />

        <InfoInputVue title="총 금액" :value="totalAmount" readonly />
        <InfoInputVue title="결제일" :value="paymentDate" readonly />
      </form>
    </div>
    
    <div class="button-container">
      <ThemeBtnVue title="이전" :func="goBack" />
      <ThemeBtnVue title="다음" :func="goNext" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InfoInputVue from '@/components/common/input/InfoInput.vue';
import ThemeBtnVue from '@/components/common/btn/ThemeBtn.vue';
import { useMobileStore } from '@/stores/mobilePage';

export default {
  name: 'ContractInfoView',
  components: {
    InfoInputVue,
    ThemeBtnVue
  },
  setup() {
    const router = useRouter();
    const mobileStore = useMobileStore();

    const name = ref('홍길동');
    const email = ref('xxxxx@naver.com');
    const phone = ref('010-xxxx-xxxx');
    const productName = ref('상품');
    const productDescription1 = ref('이것이 상품이다1');
    const productDescription2 = ref('이것이 상품이다2');
    const totalAmount = ref('450,000');
    const paymentDate = ref('매월 2일');

    const goBack = () => {
      router.push({ name: 'memberInfo' });
    };

    const goNext = () => {
      router.push({ name: 'payment' });
    };

    onMounted(() => {
      mobileStore.setPageName('계약 정보 확인');
    });

    return { 
      name, email, phone, productName, productDescription1, productDescription2, 
      totalAmount, paymentDate, goBack, goNext 
    };
  }
};
</script>

<style lang="scss" scoped>
.contract-info-view {
  @include flex-box(column, space-between, 20px);
  height: 100%;
  background-color: $back-color;

  .content {
    flex: 1;
    @include flex-box(column, flex-start, 20px);
    width: 100%;
    padding: 0 20px;

    .instruction {
      padding: 20px 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
    }

    .input-info {
      @include flex-box(column, flex-start, 15px);
      width: 100%;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
  }
}
</style>