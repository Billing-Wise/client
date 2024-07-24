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
          path : '/member',
          name:'member',
          component: () => import('@/views/member/MemberListView.vue')
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
          path: '/m/payment',
          name: 'payment',
          component: () => import('@/views/payment/PaymentStartView.vue'),
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
