<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import router from '@/router'

const props = defineProps<{
  title?: string
  content?: string
  rightText?: string
  back?: () => void
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onBack = () => {
  if (props.back) {
    return props.back()
  }
  history.state?.back ? router.back() : router.push('/')
}
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <el-page-header :icon="ArrowLeft" @back="onBack" class="cp-nav-bar">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:content>{{ content }}</template>
    <template v-slot:extra>
      <el-text class="right-text" @click="onClickRight">{{ rightText }}</el-text>
    </template>
  </el-page-header>
</template>

<style lang="scss" scoped>
.cp-nav-bar {
  border-bottom: 1px solid var(--cp-line);
  padding: 15px;
}
// 深度作用其他组件样式
:deep() {
  .el-page-header__icon {
    font-size: 18px;
    color: var(--cp-text1);
  }
  .right-text {
    font-size: 16px;
    color: var(--cp-primary);
  }
}
</style>
