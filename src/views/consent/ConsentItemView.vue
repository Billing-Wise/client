<template>
  <div class="consent-item-view">
    <div class="items-container">
      <div v-for="item in items" :key="item.id" class="item-card">
        <div class="item-info">
          <img :src="item.imageUrl" alt="상품 이미지" class="item-image">
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-price">가격 : {{ item.price.toLocaleString() }}원</p>
          </div>
        </div>
        <div class="item-radio">
          <input type="radio" :id="'item-' + item.id" :value="item.id" v-model="selectedItemId">
          <label :for="'item-' + item.id"></label>
        </div>
      </div>
    </div>
    <div class="button-container">
      <ThmemBtnVue title="다음" :func="goToNextStep" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useMobileStore } from '@/stores/mobilePage';
import { mapActions, mapStores } from 'pinia';
import { memberAxios } from '@/utils/axios';
import { useRouter } from 'vue-router'
import ThmemBtnVue from '@/components/common/btn/ThemeBtn.vue';

export default {
  name: 'ConsentItemView',
  components: {
    ThmemBtnVue
  },
  setup() {
    const router = useRouter();
    const items = ref([]);
    const selectedItemId = ref(null);
    const mobileStore = useMobileStore();

    const fetchItems = async () => {
      try {
        const response = await memberAxios.get('easy-consent/non-member/items', {
          params: { clientId: 1 }
        });
        console.log('API Response:', response); 

        if (response.status === 200 && response.data && response.data.code === 200 && Array.isArray(response.data.data)) {
          items.value = response.data.data;
        } else {
          console.error('Unexpected API response structure:', response);
          items.value = [];
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    const goToNextStep = () => {
      if (selectedItemId.value) {
        const selectedItem = items.value.find(item => item.id === selectedItemId.value);
        router.push({
          name: 'consentExplanation',
          params: { selectedItem: JSON.stringify(selectedItem) }
        });
      } else {
        alert('상품을 선택해주세요.');
      }
    };

    onMounted(() => {
      mobileStore.setPageName('상품 선택');
      fetchItems();
    });

    return {
      items,
      selectedItemId,
      goToNextStep
    };
  },
  computed: {
    ...mapStores(useMobileStore)
  },
  methods: {
    ...mapActions(useMobileStore, ['setPageName'])
  }
}
</script>

<style lang="scss" scoped>
.consent-item-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

.items-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.item-card {
  @include flex-box(row, space-between, 10px);
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: $base-shadow;
}

.item-info {
  @include flex-box(row, flex-start, 15px);
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.item-details {
  @include flex-box(column, flex-start, 5px);
}

.item-name {
  font-weight: bold;
  font-size: 16px;
}

.item-price {
  color: $input-color;
  font-size: 14px;
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

.button-container {
  padding: 20px;
  display: flex;
  justify-content: flex-end;

}
</style>