import { useContractStore } from "@/stores/contract";
import { mainAxios } from "./axios";

const contractStore = useContractStore();

// 계약 목록 조회
async function getContractList() {
  let url = `contracts?page=${contractStore.page}&size=${contractStore.size}`;

  contractStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  contractStore.filters.forEach(filter => {
    if (filter.value != null) url += `&${filter.data}=${filter.value}`
  });

  const result = await mainAxios.get(url);

  if (result.code === 200) {
    contractStore.setMaxPage(result.data.totalPages - 1);
    contractStore.setContractList(result.data.content);
  }

  return result;

}

export {getContractList}