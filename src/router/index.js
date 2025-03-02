import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { useContractStore } from '@/stores/consent/non-member/contract';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@/views/MainView.vue'),
      meta: { 
        requiresAuth: true,
        forMember: false,  
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
          path : '/contract/create',
          name:'contractCreate',
          component: () => import('@/views/contract/ContractCreateView.vue')
        },
        {
          path : '/contract/create/bulk',
          name:'contractCreateBulk',
          component: () => import('@/views/contract/ContractBulkCreateView.vue')
        },
        {
          path : '/contract/:id',
          name:'contractDetail',
          component: () => import('@/views/contract/ContractDetailView.vue')
        },
        {
          path : '/contract/:id/edit',
          name:'contractEdit',
          component: () => import('@/views/contract/ContractEditView.vue')
        },
        {
          path : '/invoice',
          name:'invoice',
          component: () => import('@/views/invoice/InvoiceListView.vue')
        },
        {
          path : '/invoice/:id',
          name:'invoiceDetail',
          component: () => import('@/views/invoice/InvoiceDetailView.vue')
        },
        {
          path : '/invoice/create',
          name:'invoiceCreate',
          component: () => import('@/views/invoice/InvoiceCreateView.vue')
        },
        {
          path : '/setting',
          name:'settingItem',
          component: () => import('@/views/setting/SettingItemView.vue')
        },
        {
          path : '/setting/payment',
          name:'settingPayment',
          component: () => import('@/views/setting/SettingPaymentView.vue')
        },
      ]
    },
    {
      name : 'auth',
      path: '/auth',
      component: () => import('@/views/auth/AuthView.vue'),
      meta: { 
        requiresAuth: false,
        forMember: false, 
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
        forMember: true,
      },
      children: [
        {
          path: '/m/consent/non-member/:clientId',
          name: 'consent',
          component: () => import('@/views/consent/non-member/ConsentItemView.vue'),
        },
        {
          path: '/m/consent/non-member/explanation/:clientId',
          name: 'consentExplanation',
          component: () => import('@/views/consent/non-member/ConsentExplanationView.vue'),
        },
        {
          path: '/m/consent/non-member/member-info/:clientId',
          name: 'memberInfo',
          component: () => import('@/views/consent/non-member/MemberInfoView.vue'),
        },
        {
          path: '/m/consent/non-member/contract-confirmation/:clientId',
          name: 'contractInfoConfirmation',
          component: () => import('@/views/consent/non-member/ContractInfoConfirmation.vue')
        },
        {
          path: '/m/consent/non-member/account-info/:clientId',
          name: 'accountInfo',
          component: () => import('@/views/consent/non-member/AccountInfoView.vue')
        },
        {
          path: '/m/consent/non-member/final-confirmation/:clientId',
          name: 'finalConfirmation',
          component: () => import('@/views/consent/non-member/FinalConfirmation.vue')
        },
        {
          path: '/m/consent/non-member/signature-input/:clientId',
          name: 'signatureInput',
          component: () => import('@/views/consent/non-member/SignatureInput.vue')
        },
        {
          path: '/m/consent/non-member/upload-signature/:clientId',
          name: 'uploadSignature',
          component: () => import('@/views/consent/non-member/UploadSignature.vue')
        },
        {
          path: '/m/consent/non-member/draw-signature/:clientId',
          name: 'drawSignature',
          component: () => import('@/views/consent/non-member/DrawSignature.vue')
        },
        {
          path: '/m/consent/non-member/payment-completion/:clientId',
          name: 'paymentCompletion',
          component: () => import('@/views/consent/non-member/PaymentCompletion.vue')
        },
        {
          path: '/m/consent/member/contract-confirmation/:contractId',
          name: 'memberContractInfoConfirmation',
          component: () => import('@/views/consent/member/ContractInfoConfirmation.vue')
        },
        {
          path: '/m/consent/member/account-info/:contractId',
          name: 'memberAccountInfo',
          component: () => import('@/views/consent/member/AccountInfoView.vue')
        },
        {
          path: '/m/consent/member/final-confirmation/:contractId',
          name: 'memberFinalConfirmation',
          component: () => import('@/views/consent/member/FinalConfirmation.vue')
        },
        {
          path: '/m/consent/member/signature-input/:contractId',
          name: 'memberSignatureInput',
          component: () => import('@/views/consent/member/SignatureInput.vue')
        },
        {
          path: '/m/consent/member/upload-signature/:contractId',
          name: 'memberUploadSignature',
          component: () => import('@/views/consent/member/UploadSignature.vue')
        },
        {
          path: '/m/consent/member/draw-signature/:contractId',
          name: 'memberDrawSignature',
          component: () => import('@/views/consent/member/DrawSignature.vue')
        },
        {
          path: '/m/consent/member/payment-completion/:contractId',
          name: 'memberPaymentCompletion',
          component: () => import('@/views/consent/member/PaymentCompletion.vue')
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
    {
      path: "/server-error",
      name: "serverError",
      meta: { 
        requiresAuth: false,
        forMember: true,
      },
      component: () => import('@/views/error/ServerErrorView.vue')
    },
    {
      path: "/access-denied",
      name: "accessDenied",
      meta: { 
        requiresAuth: false,
        forMember: true,
      },
      component: () => import('@/views/error/AccessDeniedView.vue')
    },
    {
      path: "/not-found",
      name: "notFound",
      meta: { 
        requiresAuth: false,
        forMember: true,
      },
      component: () => import('@/views/error/NotFoundView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
      meta: { 
        requiresAuth: false,
        forMember: true,
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else if (!to.meta.forMember && !to.meta.requiresAuth && authStore.isLoggedIn) {
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
    'finalConfirmation',
    'signatureInput',
    'uploadSignature', 
    'drawSignature', 
    'paymentCompletion'
  ];

 
  if (protectedRoutes.includes(to.name) && (!contractStore.clientId )) {
    next({ name: 'consent', params: { clientId: to.params.clientId } });
    return;
  } else {
    next();
  }
});


export default router
