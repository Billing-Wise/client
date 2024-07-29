<template>
  <div class="consent-item-view">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="items.length === 0" class="no-items-message">
      등록된 상품이 없습니다.
    </div>
    <div v-else class="items-container">
      <div 
        v-for="item in items" 
        :key="item.id" 
        class="item-card"
        :class="{ 'selected': selectedItemId === item.id }"
        @click="selectItem(item.id)"
      >
        <div class="item-info">
          <img :src="item.imageUrl" alt="상품 이미지" class="item-image">
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-price">가격: {{ item.price.toLocaleString() }}원</p>
          </div>
        </div>
        <div class="item-radio">
          <input type="radio" :id="'item-' + item.id" :value="item.id" v-model="selectedItemId">
          <label :for="'item-' + item.id"></label>
        </div>
      </div>
      <div v-if="selectedItemId && itemAmount" class="total-price">
          총 가격: {{ totalPrice.toLocaleString() }}원
      </div>
    </div>

    <div v-if="!error && items.length > 0" class="footer-container">
      <div>
        <div v-if="selectedItemId" class="quantity-input">
        <label for="quantity">수량:</label>
        <input 
          id="quantity" 
          type="number" 
          v-model.number="itemAmount" 
          @input="updateAmount"
        >
      </div>
    </div>
    <ThmemBtnVue title="다음" :func="goToNextStep" :disabled="!selectedItemId || !itemAmount" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useMobileStore } from '@/stores/mobilePage';
import { useContractStore } from '@/stores/consent/non-member/contract';
import { memberAxios } from '@/utils/axios';
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'ConsentItemView',
  components: {
    ThmemBtnVue
  },

  data() {
    return {
      items: [],
      selectedItemId: null,
      itemAmount: null,
      error: null
    };
  },

  computed: {
    ...mapStores(useMobileStore, useContractStore),
    totalPrice() {
      const selectedItem = this.items.find(item => item.id === this.selectedItemId);
      return selectedItem ? selectedItem.price * this.itemAmount : 0;
    }
  },

  methods: {
    ...mapActions(useMobileStore, ['setPageName']),

    async fetchItems() {
      try {
        const clientId = this.$route.params.clientId;
        const contractStore = useContractStore();
        contractStore.setClientId(clientId);

        const response = await memberAxios.get('easy-consent/non-member/items', {
          params: { clientId }
        });

        if (response.status === 200 && response.data && response.data.code === 200) {
          if (Array.isArray(response.data.data)) {
            this.items = response.data.data;
            if (this.items.length === 0) {
              this.error = "등록된 상품이 없습니다.";
            }
          } else {
            throw new Error('유효하지 않은 데이터 형식입니다.');
          }
        } else {
          throw new Error('API 응답이 올바르지 않습니다.');
        }
      } catch (err) {
        console.error('Failed to fetch items:', err);
        this.error = err.message || '상품을 불러오는 데 실패했습니다.';
        this.items = [];
      }
    },

    selectItem(itemId) {
      if (this.selectedItemId !== itemId) {
        this.selectedItemId = itemId;
        this.itemAmount = null;
      }
      this.updateProductInfo();
    },

    updateAmount() {
      if (this.itemAmount < 1) this.itemAmount = 0;
      this.updateProductInfo();
    },

    updateProductInfo() {
      const selectedItem = this.items.find(item => item.id === this.selectedItemId);
      const contractStore = useContractStore();
      if (selectedItem && this.itemAmount !== null && this.itemAmount > 0) {
      const totalPrice = selectedItem.price * this.itemAmount;

      contractStore.setProductInfo({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      imageUrl: selectedItem.imageUrl,
      amount: this.itemAmount,
      isSubscription: true,
      totalPrice: totalPrice  
     });
    
    
      contractStore.setPaymentInfo({
       totalAmount: totalPrice
     });
    } else {
     
      console.warn('상품 선택 또는 수량이 올바르지 않습니다.');
     
    }
  },

    goToNextStep() {
      if (this.selectedItemId && this.itemAmount) {
        this.updateProductInfo();
      
      const contractStore = useContractStore();
      contractStore.setPaymentInfo({
        totalAmount: this.totalPrice
      });
       
       
        this.$router.push({
          name: 'consentExplanation',
          params: { 
            clientId: this.$route.params.clientId
          }
        });
      } else if (!this.selectedItemId) {
        alert('상품을 선택해주세요.');
      } else {
        alert('수량을 입력해주세요.');
      }
    }
  },

  watch: {
    selectedItemId() {
      this.itemAmount = null;
      this.updateProductInfo();
    }
  },

  mounted() {
    this.setPageName('상품 선택');
    this.fetchItems();
  }
}
</script>

<style lang="scss" scoped>

.consent-item-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
}

.items-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
}

.item-card {
  @include flex-box(row, space-between, 25px);
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: $base-shadow;
  cursor: pointer;
  transition: all 0.3s;

  &.selected {
    background-color: lighten($theme-color, 30%);
    border: 2px solid $theme-color;
  }

  &:hover {
    // transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}

.item-info {
  @include flex-box(row, flex-start, 35px);
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.item-details {
  @include flex-box(column, flex-start, 0px);
}

.item-name {
  font-weight: bold;
  font-size: 16px;
  align-self: start;
  margin-bottom: 5px;
}

.item-price {
  font-weight: bold;
  color: $input-color;
  align-self: start;
  font-size: 14px;
  margin-bottom: 0px;
}

.item-radio {
  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid $theme-color;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  input[type="radio"]:checked + label::after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: $theme-color;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.total-price {
  margin-top: auto;
  font-weight: bold;
  color: $theme-color;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.footer-container {
  @include flex-box(row, space-between, 10px);
  padding: 20px;
  background-color: white;
}

.quantity-input {
  @include flex-box(row, center, 10px);

  label {
    font-weight: bold;
  }

  input {
    width: 50px;
    height: 30px;
    padding: 10px;
    border: 1px solid $theme-color;
    border-radius: 5px;
    text-align: center;
  }
}

.error-message, .no-items-message {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #ff0000;
}

.no-items-message {
  color: #666;
}
</style>