<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: { type: String, default: 'icon' },
  name: { type: String },
  color: { type: String, default: '#000' }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped></style>
