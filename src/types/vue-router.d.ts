import 'vue-router'

declare module 'vue-router' {
  // 拓展路由元信息类型
  interface RouteMeta {
    title?: string
  }
}
