<template>
  <div class="consent-explanation-view">
    <div class="explanation-content">
      <!-- @\assets\images\온라인결제.png -->
       <div class="notthing"></div>
      <img src="@\assets\images\온라인결제.png" alt="Consent Icon" class="consent-icon"> 
    </div>
      <p>XX 서비스 정기 결제 서비스 이용을 위한<br>회원 정보 입력과 동의가 필요합니다.</p>

    <div class="button-container">
      <ThmemBtnVue title="이전" :func="goBack" />
      <ThmemBtnVue title="다음" :func="goToMemberInfo" />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMobileStore } from '@/stores/mobilePage';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'ConsentExplanationView',
  components: { ThmemBtnVue },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const mobileStore = useMobileStore();

    onMounted(() => {
      mobileStore.setPageName('회원 정보 입력');
    });

    const goBack = () => {
      router.push({ name: 'consent' });
    };

    const goToMemberInfo = () => {
      router.push({ 
        name: 'memberInfo',
        params: { selectedItems: route.params.selectedItems }
      });
    };

    return { goBack, goToMemberInfo };
  }
};
</script>

<style lang="scss" scoped>
.notthing{
  display: flex;
  flex-direction: column;
  height: 10%;
  width: 100%;
}
.consent-explanation-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
 
  background-color: white;

  h2, h3 {
    color: $theme-color;
    text-align: center;
  }

  .explanation-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .consent-icon {
      width: 90%;
      height: 85%;

    
      object-fit: contain;
    }

  }

  p {
      text-align: center;
      font-size: 18px;
      line-height: 1.5;
      font-weight: bold;
      
    }

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    padding: 20px;
  }
}
</style>