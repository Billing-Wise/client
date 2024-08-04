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
      isSubscriptionIdx: 0,
      isSubscription: [
        { name: '정기', value: true },
        { name: '단기', value: false },
      ],
      invoiceTypeIdx: 0,
      invoiceType: [
        { name: '자동 청구', value: 1 },
        { name: '수동 청구', value: 2 },
      ],
      paymentTypeIdx: 0,
      paymentType: [
        { name: '납부자 결제', value: 1 },
        { name: '실시간 CMS', value: 2 },
      ],
      isEasyConsentIdx: 0,
      isEasyConsent: [
        { name: '불필요', value: false },
      ]
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
    setIsSubscription(idx) {
      this.isSubscriptionIdx = idx
    },
    setInvoiceType(idx) {
      this.invoiceTypeIdx = idx
    },
    setPaymentType(idx) {
      this.paymentTypeIdx = idx;
      if (idx === 0) {
        this.isEasyConsentIdx = 0;
        this.isEasyConsent = [
          { name: '불필요', value: false },
        ]
      } else {
        this.isEasyConsent = [
          { name: '미사용', value: false },
          { name: '사용', value: true },
        ]
      }
    },
    setIsEasyConsent(idx) {
      this.isEasyConsentIdx = idx
    },
    setAllDataFromDetailStore(data) {
      this.setMember(data.member);
      this.setItem(data.item);
      this.setContractCycle(data.contractCycle);
      this.setPaymentDueCycle(data.paymentDueCycle);
      this.setIsSubscription(this.isSubscription.findIndex(i => i.value === data.subscription));
      this.setInvoiceType(this.invoiceType.findIndex(i => i.value === data.invoiceType.id));
      this.setPaymentType(this.paymentType.findIndex(i => i.value === data.paymentType.id));
      this.setIsEasyConsent(this.isEasyConsent.findIndex(i => i.value === data.easyConsent));
    }
  },
  getters: {
    isSubscriptionName(state) {
      return state.isSubscription[state.isSubscriptionIdx].name;
    },
    invoiceTypeName(state) {
      return state.invoiceType[state.invoiceTypeIdx].name;
    },
    paymentTypeName(state) {
      return state.paymentType[state.paymentTypeIdx].name;
    },
    isEasyConsentName(state) {
      return state.isEasyConsent[state.isEasyConsentIdx].name;
    },
    isSubscriptionValue(state) {
      return state.isSubscription[state.isSubscriptionIdx].value;
    },
    invoiceTypeValue(state) {
      return state.invoiceType[state.invoiceTypeIdx].value;
    },
    paymentTypeValue(state) {
      return state.paymentType[state.paymentTypeIdx].value;
    },
    isEasyConsentValue(state) {
      return state.isEasyConsent[state.isEasyConsentIdx].value;
    },
  }
})
