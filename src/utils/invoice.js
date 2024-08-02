import { useInvoiceListStore } from "@/stores/invoice/invoiceList";
import { mainAxios } from "./axios";
import { useInvoiceDetailStore } from "@/stores/invoice/invoiceDetail";
import { useInvoiceCreateStore } from "@/stores/invoice/invoiceCreate";
import { useLoadingStore } from "@/stores/loading";

const invoiceListStore = useInvoiceListStore();
const invoiceDetailStore = useInvoiceDetailStore();
const invoiceCreateStore = useInvoiceCreateStore();
const loadingStore = useLoadingStore();


// 청구서 전송
async function sendInvoice(invoiceId) {
  loadingStore.setIsLoading(true);
  const result = await mainAxios.get(`invoices/${invoiceId}/send`);

  loadingStore.setIsLoading(false);

  return result;
}

// 청구 목록 조회
async function getInvoiceList() {
  let url = `invoices?page=${invoiceListStore.page}&size=${invoiceListStore.size}`;

  invoiceListStore.columns.forEach(column => {
    if (column.sort != null) url += `&sort=${column.data},${column.sort}`
  });

  invoiceListStore.filters.forEach(filter => {
    if (filter.value != null) url += `&${filter.data}=${filter.value}`
  });

  const result = await mainAxios.get(url);
  
  if (result.code === 200) {
    invoiceListStore.setMaxPage(result.data.totalPages - 1);
    invoiceListStore.setInvoiceList(result.data.content);
  }

  return result;
}

// 청구 상세 조회
async function getInvoice(invoiceId) {
  const result = await mainAxios.get(`invoices/${invoiceId}`);
  
  if (result.code === 200) {
    invoiceDetailStore.setData(result.data);
  }

  return result;
}

// 청구 생성
async function createInvoice() {
  console.log(invoiceCreateStore.data)
  const result = await mainAxios.post(`invoices`, invoiceCreateStore.data);

  return result;
}

// 청구 수정
async function editInvoice(invoiceId, data) {
  const result = await mainAxios.put(`invoices/${invoiceId}`, data);
  
  if (result.code === 200) {
    invoiceDetailStore.setData(result.data);
  }

  return result;
}

// 청구 삭제
async function deleteInvoice(invoiceId) {
  const result = await mainAxios.delete(`invoices/${invoiceId}`);

  if (result.code === 200) {
    invoiceDetailStore.$reset();
  }

  return result;
}

export {sendInvoice, getInvoiceList, getInvoice, createInvoice, editInvoice, deleteInvoice}