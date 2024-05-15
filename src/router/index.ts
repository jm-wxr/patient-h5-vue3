import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/Index.vue') },
    { path: '/register', component: () => import('@/views/register/Index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/Index.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/home/Index.vue') },
        { path: '/article', component: () => import('@/views/article/Index.vue') },
        { path: '/notify', component: () => import('@/views/notify/Index.vue') },
        { path: '/user', component: () => import('@/views/user/Index.vue') }
      ]
    }
  ]
})

export default router
