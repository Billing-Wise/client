import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainView.vue'),
      meta: { 
        requiresAuth: true 
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
        requiresAuth: false 
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
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
    next('');
  } else {
    next();
  }
});

export default router
