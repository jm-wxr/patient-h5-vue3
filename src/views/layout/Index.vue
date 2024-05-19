<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch, watchEffect } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

// 当前标签索引
const currentIndex = ref()
const route = useRoute()

// 标签列表
const tabList = [
  { label: '首页', path: 'home', iconName: 'home-index', index: 0 },
  { label: '健康百科', path: 'article', iconName: 'home-article', index: 1 },
  { label: '消息中心', path: 'notify', iconName: 'home-notice', index: 2 },
  { label: '我的', path: 'user', iconName: 'home-mine', index: 3 }
]

// 监听标签变化->路由变化
watch(currentIndex, (index) => {
  router.push(`/${tabList[index].path}`)
})

// 监听路由变化->标签变化
watchEffect(() => {
  const path = route.path.replace('/', '')
  const index = tabList.findIndex((tab) => tab.path === path)
  if (index !== -1) {
    currentIndex.value = index
  }
})
</script>

<template>
  <div class="layout-page">
    <router-view style="min-height: calc(100vh - 50px)"></router-view>
    <!-- 绑定v-model，表示当前tab-pane的name属性 -->
    <el-tabs v-model="currentIndex" tab-position="bottom" :stretch="true">
      <!-- v-for 循环渲染 -->
      <el-tab-pane v-for="tab in tabList" :key="tab.index" :name="tab.index">
        <template #label>
          <svg-icon
            :name="`${tab.iconName}-${currentIndex === tab.index ? 'active' : 'default'}`"
          ></svg-icon>
          <span class="tab-label">{{ tab.label }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  // 选择子组件的元素
  :deep(.el-tabs--bottom) {
    // 标签栏吸底
    background-color: #fff;
    position: sticky;
    bottom: 0;
    z-index: 99;
    .el-tabs__item {
      flex-direction: column;
      margin: 8px 0;
    }
    .tab-label {
      font-size: 11px;
    }
    .svg-icon {
      width: 24px;
    }
  }
}
</style>
