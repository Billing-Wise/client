import { defineStore } from 'pinia'

export const useContractCreateStore = defineStore('contractCreate', {
  state() {
    return {
      step: 0,
      member: {
        id: '',
        name: '',
        email: '',
        phone: ''
      },
      item: {
        id: '',
        name: '',
        price: 0,
        count: 0,
      },
      contractCycle: null,
      paymentDueCycle: null,
      isSubscription: {
        value: null,
        name: null
      },
      invoiceType: {
        value: null,
        name: null,
      },
      paymentType: {
        value: null,
        name: null,
      },
      isEasyConsent: {
        value: null,
        name: null,
      },
    }
  },
  actions: {
    setStep(value) {
      this.step = value;
    },
    setMember(info) {
      this.member.id = info.id;
      this.member.name = info.name;
      this.member.email = info.email;
      this.member.phone = info.phone;
    },
    setItem(info, count) {
      this.item.id = info.id;
      this.item.name = info.name;
      this.item.price = info.price;
      this.item.count = count;
    },
    setContractCycle(info) {
      this.contractCycle = info;
    },
    setPaymentDueCycle(info) {
      this.paymentDueCycle = info;
    },
    setIsSubscription(info) {
      this.isSubscription.value = info.value;
      this.isSubscription.name = info.name;
    },
    setInvoiceType(info) {
      this.invoiceType.value = info.value;
      this.invoiceType.name = info.name;
    },
    setPaymentType(info) {
      this.paymentType.value = info.value;
      this.paymentType.name = info.name;
    },
    setIsEasyConsent(info) {
      this.isEasyConsent.value = info.value;
      this.isEasyConsent.name = info.name;
    },
  }
})