<script lang="ts" setup>
defineProps<{
  options: {
    label: string
    value: string | number
  }[]
}>()
const model = defineModel()
</script>

<template>
  <div class="cp-radio-btn">
    <el-button
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      @click="model = item.value"
      :class="{ 'is-selected': model === item.value }"
      style="padding: 10px; min-width: 70px"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.is-selected {
  background-color: #e5f8f5;
  color: var(--cp-primary);
}
</style>
