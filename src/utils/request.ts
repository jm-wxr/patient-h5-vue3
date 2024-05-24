import { useUserStore } from '@/stores'
import axios, { type Method } from 'axios'
import router from '@/router'

export interface Data<T> {
  code: number
  message: string
  data: T
}

const baseURL = 'https://consult-api.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 要写在拦截器里面，写在模块中的话，store可能还没初始化
    const useStore = useUserStore()
    // 在发送请求之前做些什么
    if (useStore.user?.token) {
      config.headers['Authorization'] = `Bearer ${useStore.user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (res.data?.code !== 10000) {
      // 弹窗提示响应消息
      return Promise.reject(res.data)
    }
    return res.data
  },
  function (err) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const useStore = useUserStore()
    if (err.response?.status === 401) {
      useStore.delUser()
      // 跳转到登录页，并携带当前页面的路径，以便登录完成后回跳
      router.push({
        path: '/login',
        query: { backUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

// 封装请求方法，使用泛型约束返回值类型
const request = <T>(url: string, method: Method = 'get', extraData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: extraData
  })
}

export default request

export { baseURL }
