import { useInvoiceListStore } from "@/stores/invoice/invoiceList";
import { mainAxios } from "./axios";
import { useInvoiceDetailStore } from "@/stores/invoice/invoiceDetail";

const invoiceListStore = useInvoiceListStore();
const invoiceDetailStore = useInvoiceDetailStore();

// 계약 목록 조회
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

// 계약 상세 조회
async function getInvoice(invoiceId) {
  const result = await mainAxios.get(`invoices/${invoiceId}`);
  
  if (result.code === 200) {
    invoiceDetailStore.setData(result.data);
  }

  return result;
}

export {getInvoiceList, getInvoice}