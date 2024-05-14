import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/Index.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/register/Index.vue')
    }
  ]
})

export default router
