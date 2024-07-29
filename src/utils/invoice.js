import { useInvoiceListStore } from "@/stores/invoice/invoiceList";
import { mainAxios } from "./axios";

const invoiceListStore = useInvoiceListStore();

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

export {getInvoiceList}