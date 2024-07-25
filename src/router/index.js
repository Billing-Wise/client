import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

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
          path: '/m/consent',
          name: 'consent',
          component: () => import('@/views/consent/ConsentItemView.vue'),
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
          component: () => import('@/views/payment/CardPaymentAgreementView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/card/input',
          name: 'cardInput',
          component: () => import('@/views/payment/CardPaymentInputView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/card/confirm',
          name: 'cardConfirm',
          component: () => import('@/views/payment/CardPaymentConfirmView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/result',
          name: 'paymentResult',
          component: () => import('@/views/payment/PaymentResultView.vue'),
        },
        {
          path: '/m/payment/:invoiceId/account/agreement',
          name: 'accountAgreement',
          component: () => import('@/views/payment/AccountPaymentAgreementView.vue'),
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

export default router
