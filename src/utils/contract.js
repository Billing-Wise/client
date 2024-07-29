import { useContractListStore } from "@/stores/contract/contractList";
import { fileAxios, mainAxios } from "./axios";
import { useContractCreateStore } from "@/stores/contract/contractCreate";
import { useContractDetailStore } from "@/stores/contract/contractDetail";
import { useContractBulkStore } from "@/stores/contract/contractBulk";

const contractListStore = useContractListStore();
const contractDetailStore = useContractDetailStore();
const constractCreateStore = useContractCreateStore();
const contractBulkStore = useContractBulkStore();

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

// 계약 상세 조회
async function getContract(contractId) {
  const result = await mainAxios.get(`contracts/${contractId}`);
  
  if (result.code === 200) {
    contractDetailStore.setData(result.data);
  }

  return result;
}

// 계약 생성
async function createContract() {
  const data = {
    "memberId": constractCreateStore.member.id,
    "itemId": constractCreateStore.item.id,
    "itemPrice": constractCreateStore.item.price,
    "itemAmount": constractCreateStore.item.count,
    "isSubscription": constractCreateStore.isSubscription.value,
    "invoiceTypeId": constractCreateStore.invoiceType.value,
    "paymentTypeId": constractCreateStore.paymentType.value,
    "isEasyConsent": constractCreateStore.isEasyConsent.value,
    "contractCycle": constractCreateStore.contractCycle,
    "paymentDueCycle": constractCreateStore.paymentDueCycle
  }

  const result = await mainAxios.post('contracts', data);

  return result;
}

// 계약 대량 등록
async function createContractBulk(file) {
  const formData = new FormData();
  formData.append('file', file, 'file');

  const result = await fileAxios.post('contracts/bulk-register', formData);

  if (result.code !== 200) {
    if (result.data) {
      contractBulkStore.errorList = [...result.data];
    } else {
      contractBulkStore.errorList = [result.message];
    }
  }

  return result;
}

// 계약 수정
async function editContract(contractId) {
  const data = {
    "itemPrice": constractCreateStore.item.price,
    "itemAmount": constractCreateStore.item.count,
    "isSubscription": constractCreateStore.isSubscription.value,
    "invoiceTypeId": constractCreateStore.invoiceType.value,
    "paymentTypeId": constractCreateStore.paymentType.value,
    "isEasyConsent": constractCreateStore.isEasyConsent.value,
    "contractCycle": constractCreateStore.contractCycle,
    "paymentDueCycle": constractCreateStore.paymentDueCycle
  }

  const result = await mainAxios.put(`contracts/${contractId}`, data);

  return result;
}

// 계약 삭제
async function deleteContract(contractId) {
  const result = await mainAxios.delete(`contracts/${contractId}`);

  return result;
}

export {getContractList, getContract, createContract, createContractBulk, editContract, deleteContract}