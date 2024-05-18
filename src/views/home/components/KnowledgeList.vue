<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
</script>

<template>
  <div class="konwledge-list">
    <div v-for="i in 5" :key="i">
      <knowledge-card></knowledge-card>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.konwledge-list {
  padding: 0 15px;
  .el-divider {
    margin: 0;
  }
}
</style>
