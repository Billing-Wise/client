import { useItemStore } from "@/stores/item";
import { fileAxios, mainAxios } from "./axios";

const itemStore = useItemStore();

// 아이템 목록 조회
async function getItemList(itemName) {

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
  let url = `items/${itemId}`;
  const result = await mainAxios.get(url);
  
  if (result.code === 200) {
    itemStore.setCurrentItem(result.data);
  }

  return {'code': result.code, 'message' : result.message};
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

// 아이템 수정
async function editItem(itemId, infos) {
  const result = await mainAxios.put(`items/${itemId}`, infos);

  if (result.code === 200) {
    itemStore.setCurrentItem(result.data);
  }

  return {'code': result.code, 'message' : result.message};
}

// 아이템 이미지 수정
async function editItemImage(itemId, imgFile) {
  const formData = new FormData();
  formData.append('image', imgFile, 'image');

  const result = await fileAxios.put(`items/${itemId}/image`, formData);

  if (result.code === 200) {
    itemStore.setCurrentItem(result.data);
  }

  return {'code': result.code, 'message' : result.message};
}

// 아이템 삭제
async function deleteItem(itemId) {
  const result = await fileAxios.delete(`items/${itemId}`);

  if (result.code === 200) {
    itemStore.setCurrentItem({});
  }

  return {'code': result.code, 'message' : result.message};
}




export { getItemList, getItem, createItem, editItem, editItemImage, deleteItem }