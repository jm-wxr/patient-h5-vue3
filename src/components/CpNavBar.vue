<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import router from '@/router'

defineProps<{
  title?: string
  rightText?: string
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onBack = () => {
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <el-page-header :icon="ArrowLeft" @back="onBack">
    <template v-slot:title>{{ title }}</template>
    <template v-slot:extra>
      <el-text class="right-text" @click="onClickRight">{{ rightText }}</el-text>
    </template>
  </el-page-header>
</template>

<style lang="scss" scoped>
// 深度作用其他组件样式
:deep() {
  .el-page-header {
    &__icon {
      font-size: 18px;
      color: var(--cp-text1);
    }
  }
  .right-text {
    font-size: 16px;
    color: var(--cp-primary);
  }
}
</style>
