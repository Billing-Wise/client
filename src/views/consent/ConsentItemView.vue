<template>
  <div class="consent-item-view">
    <div class="content">
      <h1>비회원 아이템 선택</h1>
      
      <!--상품 리스트-->
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <div class="product-icon"><img :src="product.imageUrl" alt="Product Image"></div>
          <div class="product-info">
            <p>{{ product.name }}</p>
            <p>가격: {{ product.price }}원</p>
          </div>
          <div class="product-check">
            <input type="checkbox" v-model="selectedProducts" :value="product.id">
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { mainAxios } from '@/utils/axios';
import { useMobileStore } from '@/stores/mobilePage';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'ConsentItemView',

 

  computed: {
    ...mapStores(useMobileStore) 
  },

  data() {
    return {
      selectedProducts: [] 
    };
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']), 

    async submitConsent() {
      const consentData = {
        memberName: '홍길동',
        memberEmail: 'test@gmail.com',
        memberPhone: '01012341234',
        itemId: this.selectedProducts[0], 
        itemAmount: 1,
        isSubscription: true,
        contractCycle: 15,
        accountBank: '신한',
        accountOwner: '홍길동',
        accountNumber: '111222333444'
      };

      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(consentData)], { type: 'application/json' }));
      formData.append('signImage', this.signImage || new Blob()); 

      try {
        const response = await mainAxios.post('/easy-consent/non-member?clientId=1', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('동의정보 등록이 완료되었습니다.');
      } catch (error) {
        console.error('동의정보 등록에 실패했습니다.', error);
      }
    }
  },

  mounted() {
    this.mobilePageStore.setPageName("상품 선택"); 
  }
};
</script>

<style lang="scss" scoped>


.consent-item-view {
  position: relative; 
  max-width: 400px; 
  margin: 0 auto; 
  height:100% ;
}


</style>

