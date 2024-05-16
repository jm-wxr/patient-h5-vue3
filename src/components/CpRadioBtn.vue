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
    <el-radio-group v-model="model" size="large">
      <el-radio-button
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-radio-group>
  </div>
</template>

<style lang="scss" scoped></style>
