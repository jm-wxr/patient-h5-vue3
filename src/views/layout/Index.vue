<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router'
import { ref, watch } from 'vue'

let tabName = ref('home')
const router = useRouter()
watch(tabName, (name) => {
  router.push(`/${name}`)
})
</script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <svg aria-hidden="true">
      <!-- #icon-文件夹名称-图片名称 -->
      <use href="#icon-login-eye-off" />
    </svg>
    <el-tabs v-model="tabName" tab-position="bottom">
      <el-tab-pane label="首页" name="home">
        <template #label>首页</template>
      </el-tab-pane>
      <el-tab-pane label="健康百科" name="article"></el-tab-pane>
      <el-tab-pane label="消息中心" name="notify"></el-tab-pane>
      <el-tab-pane label="我的" name="user"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
