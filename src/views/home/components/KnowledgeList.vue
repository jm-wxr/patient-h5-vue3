<script setup lang="ts">
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import KnowledgeCard from './KnowledgeCard.vue'
import { onMounted } from 'vue'
import { getKownledgePage } from '@/services/consult'
import { ref } from 'vue'

const prop = defineProps<{ type: KnowledgeType }>()
const params = ref<KnowledgeParams>({
  type: prop.type,
  current: 1,
  pageSize: 10
})
const list = ref<KnowledgeList>([])
onMounted(async () => {
  const res = await getKownledgePage(params.value)
  list.value.push(...res.data.rows)
})
</script>

<template>
  <div class="konwledge-list">
    <ul class="list">
      <li v-for="item in list" :key="item.id">
        <knowledge-card :item="item" />
        <el-divider />
      </li>
    </ul>
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
