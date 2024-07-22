import { useItemStore } from "@/stores/item";
import { fileAxios, mainAxios } from "./axios";

// 아이템 목록 조회
async function getItemList(itemName) {
  const itemStore = useItemStore();

  let url = `items?page=${itemStore.page}&size=${itemStore.size}&name=${itemName}`;
  itemStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  const result = await mainAxios.get(url);
  itemStore.setMaxPage(result.data.totalPages - 1);
  itemStore.setItemList(result.data.content);

  return {'code': result.code, 'message' : result.message}
}

// 아이템 상세 조회
async function getItem(itemId) {
  const itemStore = useItemStore();

  let url = `items/${itemId}`;
  const result = await mainAxios.get(url);
  
  itemStore.setCurrentItem(result.data)

  return result;
}

// 아이템 생성
async function createItem(infos, imgFile) {
  
  const formData = new FormData();
  const jsonData = JSON.stringify(infos);

  const jsonBlob = new Blob([jsonData], { type: 'application/json' });
  formData.append('data', jsonBlob, 'item');
  if (imgFile !== null) {
    formData.append('image', imgFile, 'image');
  }

  const result = await fileAxios.post('items', formData);

  return result;
}



export { getItemList, getItem, createItem }