import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 加载进度插件配置
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/Index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import('@/views/register/Index.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/',
      component: () => import('@/views/layout/Index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/Index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/article/Index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/notify/Index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/user/Index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/user/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    }
  ]
})

// 路由前置守卫，跳转路由前执行
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 不需要登录的页面，白名单
  const whiteList = ['/login', '/register']
  // 如果用户未登录，且访问的页面不在白名单中，则跳转到登录页
  if (!userStore.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
  NProgress.start()
})

// 路由后置守卫，跳转路由后执行
router.afterEach((to) => {
  // 修改html标题
  document.title = `${to.meta.title || ''}-优医问诊`
  NProgress.done()
})

export default router
