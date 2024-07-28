import { defineStore } from 'pinia'

export const useContractCreateStore = defineStore('contractCreate', {
  state() {
    return {
      dataPassed: false,
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
        count: 0
      },
      contractCycle: 1,
      paymentDueCycle: 0,
      isSubscription: {
        value: null,
        name: null
      },
      invoiceType: {
        value: null,
        name: null
      },
      paymentType: {
        value: null,
        name: null
      },
      isEasyConsent: {
        value: null,
        name: null
      }
    }
  },
  actions: {
    setDataPassed(value) {
      this.dataPassed = value
    },
    setStep(value) {
      this.step = value
    },
    setMember(info) {
      this.member.id = info.id
      this.member.name = info.name
      this.member.email = info.email
      this.member.phone = info.phone
    },
    setItem(info) {
      this.item.id = info.id
      this.item.name = info.name
      this.item.price = info.price
      this.item.count = info.amount? info.amount : 1
    },
    setContractCycle(info) {
      this.contractCycle = info
    },
    setPaymentDueCycle(info) {
      this.paymentDueCycle = info
    },
    setIsSubscription(info) {
      this.isSubscription.value = info.value
      this.isSubscription.name = info.name
    },
    setInvoiceType(info) {
      this.invoiceType.value = info.value
      this.invoiceType.name = info.name
    },
    setPaymentType(info) {
      this.paymentType.value = info.value
      this.paymentType.name = info.name
    },
    setIsEasyConsent(info) {
      this.isEasyConsent.value = info.value
      this.isEasyConsent.name = info.name
    },
    setAllDataFromDetailStore(data) {
      this.setMember(data.member);
      this.setItem(data.item);
      this.setContractCycle(data.contractCycle);
      this.setPaymentDueCycle(data.paymentDueCycle);
      this.setIsSubscription({ value: data.subscription, name: data.subscription? '정기' : '단기' });
      this.setInvoiceType({ value: data.invoiceType.id, name: data.invoiceType.name });
      this.setPaymentType({ value: data.paymentType.id, name: data.paymentType.name });
      this.setIsEasyConsent({ value: data.easyConsent, name: data.easyConsent? '사용' : '미사용' });
    }
  }
})
