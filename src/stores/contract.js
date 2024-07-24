import { defineStore } from 'pinia'

export const useContractStore = defineStore('contract', {
  state: () => ({
    clientId: null,
    memberInfo: {
      name: '',
      email: '',
      phone: ''
    },

    productInfo: {
      id: null,
      name: '',
      price: 0,
      imageUrl: '',
      amount: 1,
      isSubscription: true
    },

    paymentInfo: {
      totalAmount: 0,
      accountBank: '',
      accountOwner: '',
      accountNumber: '',
      paymentDate: null 
    },

    contractInfo: {
      contractCycle: null, 
      isSubscription: true
    },

    signImage: null

  }),
  actions: {
    setClientId(id) {
      this.clientId = id;
    },

    setMemberInfo(info) {
      this.memberInfo = { ...this.memberInfo, ...info };
    },
    
    setProductInfo(info) {
      this.productInfo = { ...this.productInfo, ...info };
      this.calculateTotalAmount();
    },

    setPaymentInfo(info) {
      this.paymentInfo = { ...this.paymentInfo, ...info };
    },

    setContractInfo(info) {
      this.contractInfo = { ...this.contractInfo, ...info };
    },

    setSignImage(image) {
      this.signImage = image;
    },
    
    calculateTotalAmount() {
      this.paymentInfo.totalAmount = this.productInfo.price * this.productInfo.amount;
    },

    resetStore() {
      // 초기화 하는 방법 
      this.$reset();
    },


    async submitEasyConsent() {
      // API 호출 로직이 들어갈 곳
      const requestData = {
        memberName: this.memberInfo.name,
        memberEmail: this.memberInfo.email,
        memberPhone: this.memberInfo.phone,
        itemId: this.productInfo.id,
        itemAmount: this.productInfo.amount,
        isSubscription: this.contractInfo.isSubscription,
        contractCycle: this.contractInfo.contractCycle,
        accountBank: this.paymentInfo.accountBank,
        accountOwner: this.paymentInfo.accountOwner,
        accountNumber: this.paymentInfo.accountNumber
      };

    }
  }
})