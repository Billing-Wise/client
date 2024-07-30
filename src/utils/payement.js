import { usePaymentStore } from "@/stores/invoice/payment";
import { mainAxios } from "./axios";

const paymentStore = usePaymentStore();

async function getPayment(invoiceId) {
  const result = await mainAxios.get(`payments/${invoiceId}`);

  if (result.code === 200) {
    paymentStore.setPaid(true);
    paymentStore.setData(result.data);
  } else if (result.code === 400) {
    paymentStore.setPaid(false);
  }

  return result;
}

export {getPayment}