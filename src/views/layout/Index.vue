<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores'

// 标签路径
const tabPath = ref('home')

// 标签列表
const tabList = [
  { label: '首页', path: 'home', iconName: 'home-index' },
  { label: '健康百科', path: 'article', iconName: 'home-article' },
  { label: '消息中心', path: 'notify', iconName: 'home-notice' },
  { label: '我的', path: 'user', iconName: 'home-mine' }
]

// 监听标签变化->路由变化
watch(tabPath, (path) => {
  router.push(`/${path}`)
})
</script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <!-- 绑定v-model，表示当前tab-pane的name属性 -->
    <el-tabs v-model="tabPath" tab-position="bottom" :stretch="true">
      <!-- v-for 循环渲染 -->
      <el-tab-pane v-for="tab in tabList" :key="tab.path" :name="tab.path">
        <template #label>
          <svg-icon
            :name="`${tab.iconName}-${tabPath === tab.path ? 'active' : 'default'}`"
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
  :deep() {
    .el-tabs {
      &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .tab-label {
        font-size: 11px;
      }
      .svg-icon {
        width: 24px;
      }
    }
  }
}
</style>
