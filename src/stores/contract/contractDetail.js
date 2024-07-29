import { defineStore } from 'pinia'

export const useContractDetailStore = defineStore('contractDetail', {
  state() {
    return {
      data: {
        "id": null,
        "member": {
            "id": null,
            "name": null,
            "phone": null,
            "email": null
        },
        "item": {
            "id": null,
            "name": null,
            "price": null,
            "amount": null
        },
        "chargeAmount": null,
        "totalChargeAmount": null,
        "totalUnpaidAmount": null,
        "invoiceType": {
            "id": null,
            "name": null
        },
        "paymentType": {
            "id": null,
            "name": null
        },
        "contractCycle": null,
        "paymentDueCycle": null,
        "createdAt": null,
        "updatedAt": null,
        "subscription": null,
        "easyConsent": null
      }
    }
  },
  actions: {
    setData(data) {
      this.data = data;
    },
  }
})