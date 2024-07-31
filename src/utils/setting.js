import { useSettingItemStore } from "@/stores/setting/settingItem";
import { mainAxios } from "./axios";

const settingItemStore = useSettingItemStore();

// 설정 아이템 목록 조회
async function getSettingItemList() {
  let url = `items?page=${settingItemStore.page}&size=${settingItemStore.size}`;
  if (settingItemStore.search.value) {
    url += `&${settingItemStore.search.keyword}=${settingItemStore.search.value}`
  }

  settingItemStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  const result = await mainAxios.get(url);
  settingItemStore.setMaxPage(result.data.totalPages - 1);
  settingItemStore.setItemList(result.data.content);

  return {'code': result.code, 'message' : result.message}
}

// 간편동의 상품설정
async function setEasyConsentItems(itemIdList) {
  const result = await mainAxios.put('/setting/easy-consent/items', {
    itemIdList: itemIdList
  });

  return {'code': result.code, 'message': result.message}
}

export { getSettingItemList, setEasyConsentItems }