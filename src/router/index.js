import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { useContractStore } from '@/stores/contract';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@/views/MainView.vue'),
      meta: { 
        requiresAuth: true,
        nonMember: false,  
      },
      children: [
        {
          path : '',
          name:'home',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path : '/item',
          name:'item',
          component: () => import('@/views/item/ItemListView.vue')
        },
        {
          path : '/item/:id',
          name:'itemDetail',
          component: () => import('@/views/item/ItemDetailView.vue')
        },
        {
          path : '/member',
          name:'member',
          component: () => import('@/views/member/MemberListView.vue')
        },
        {
          path : '/member/bulk',
          name:'memberBulk',
          component: () => import('@/views/member/MemberBulkCreateView.vue')
        },
        {
          path : '/member/:id',
          name:'memberDetail',
          component: () => import('@/views/member/MemberDetailView.vue')
        },
        {
          path : '/contract',
          name:'contract',
          component: () => import('@/views/contract/ContractListView.vue')
        },
        {
          path : '/invoice',
          name:'invoice',
          component: () => import('@/views/invoice/InvoiceListView.vue')
        },
        {
          path : '/setting',
          name:'setting',
          component: () => import('@/views/setting/SettingView.vue')
        },
      ]
    },
    {
      name : 'auth',
      path: '/auth',
      component: () => import('@/views/auth/AuthView.vue'),
      meta: { 
        requiresAuth: false,
        nonMember: false, 
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import('@/views/auth/SignupView.vue'),
        },
      ]
    },
    {
      name : 'mobile',
      path: '/m',
      component: () => import('@/views/MobileView.vue'),
      meta: { 
        requiresAuth: false,
        nonMember: true,
      },
      children: [
        {
          path: '/m/consent/:clientId',
          name: 'consent',
          component: () => import('@/views/consent/ConsentItemView.vue'),
        },
        {
          path: 'explanation/:clientId',
          name: 'consentExplanation',
          component: () => import('@/views/consent/ConsentExplanationView.vue'),
        },
        {
          path: 'member-info/:clientId',
          name: 'memberInfo',
          component: () => import('@/views/consent/MemberInfoView.vue'),
        },
        {
          path: 'contract-confirmation/:clientId',
          name: 'contractInfoConfirmation',
          component: () => import('@/views/consent/ContractInfoConfirmation.vue')
        },
        {
          path: 'account-info/:clientId',
          name: 'accountInfo',
          component: () => import('@/views/consent/AccountInfoView.vue')
        },
        {
          path: 'final-confirmation/:clientId',
          name: 'finalConfirmation',
          component: () => import('@/views/consent/FinalConfirmation.vue')
        },
        {
          path: '/signature-input/:clientId',
          name: 'signatureInput',
          component: () => import('@/views/consent/SignatureInput.vue')
        },
        
        {
          path: '/m/payment/:invoiceId/info',
          name: 'paymentInfo',
          component: () => import('@/views/payment/PaymentInfoView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/method',
          name: 'paymentMethod',
          component: () => import('@/views/payment/PaymentMethodView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/card/agreement',
          name: 'cardAgreement',
          component: () => import('@/views/payment/card/CardPaymentAgreementView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/card/input',
          name: 'cardInput',
          component: () => import('@/views/payment/card/CardPaymentInputView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/card/confirm',
          name: 'cardConfirm',
          component: () => import('@/views/payment/card/CardPaymentConfirmView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/account/agreement',
          name: 'accountAgreement',
          component: () => import('@/views/payment/account/AccountPaymentAgreementView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/account/input',
          name: 'accountInput',
          component: () => import('@/views/payment/account/AccountPaymentInputView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/account/confirm',
          name: 'accountConfirm',
          component: () => import('@/views/payment/account/AccountPaymentConfirmView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/result',
          name: 'paymentResult',
          component: () => import('@/views/payment/PaymentResultView.vue'),
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else if (!to.meta.nonMember && !to.meta.requiresAuth && authStore.isLoggedIn) {
    next('');
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  const contractStore = useContractStore();

 
  const protectedRoutes = [
    'consentExplanation',
    'memberInfo',
    'contractInfoConfirmation',
    'accountInfo',
    'payment',
    'finalConfirmation'
  ];

 
  if (protectedRoutes.includes(to.name) && (!contractStore.clientId )) {
    next({ name: 'consent', params: { clientId: to.params.clientId } });
    return;
  } else {
    next();
  }
});


export default router
