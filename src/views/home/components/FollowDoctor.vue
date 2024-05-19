<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import DoctorCard from './DoctorCard.vue'
import { onMounted, ref } from 'vue'
import type { DoctorList } from '@/types/consult'
import { getDoctorPage } from '@/services/consult'

const list = ref<DoctorList>([])

const getData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
onMounted(() => getData())
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <el-link>
        查看更多
        <ArrowRight style="width: 1em" />
      </el-link>
    </div>
    <div class="body">
      <!-- scroll组件 -->
      <el-scrollbar>
        <div class="scrollbar-content">
          <div v-for="item in list" :key="item.id" class="item"><doctor-card :item="item" /></div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 45px;
    p {
      font-size: 16px;
      font-weight: 600;
    }
    a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
    .scrollbar-content {
      display: flex;
      .item {
        flex-shrink: 0;
        margin-left: 15px;
      }
    }
  }
}
</style>
