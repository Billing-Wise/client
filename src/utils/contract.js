import { useContractListStore } from "@/stores/contractList";
import { mainAxios } from "./axios";

const contractListStore = useContractListStore();

// 계약 목록 조회
async function getContractList() {
  let url = `contracts?page=${contractListStore.page}&size=${contractListStore.size}`;

  contractListStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  contractListStore.filters.forEach(filter => {
    if (filter.value != null) url += `&${filter.data}=${filter.value}`
  });

  const result = await mainAxios.get(url);

  if (result.code === 200) {
    contractListStore.setMaxPage(result.data.totalPages - 1);
    contractListStore.setContractList(result.data.content);
  }

  return result;
}

export {getContractList}