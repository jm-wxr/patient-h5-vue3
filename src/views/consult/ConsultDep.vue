<script setup lang="ts">
import { getAllDep } from '@/services/consult'
import type { TopDep } from '@/types/consult'
import { onMounted, ref } from 'vue'
import { useConsultStore } from '@/stores'

const activeIndex = ref(0)
const depList = ref<TopDep[]>([])

const store = useConsultStore()

onMounted(async () => {
  const res = await getAllDep()
  depList.value = res.data
})
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="返回" content="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <el-scrollbar :always="true">
        <p
          v-for="(item, index) in depList"
          :key="item.id"
          class="el-scrollbar-item"
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
        >
          {{ item.name }}
        </p>
      </el-scrollbar>
      <div class="sub-dep">
        <router-link
          v-for="item in depList[activeIndex]?.child"
          :key="item.id"
          to="/consult/illness"
          @click="store.setDepId(item.id)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-dep-page {
  // wrapper设置overflow: hidden，el-scrollbar设置overflow: auto，实现只让el-scrollbar滚动
  .wrapper {
    height: calc(100vh - 50px);
    overflow: hidden;
    display: flex;
    .el-scrollbar {
      background-color: #eee;
      width: 114px;
      overflow: auto;
      &-item {
        padding: 14px;
        color: var(--cp-tag);
        &.active {
          background-color: #fff;
          color: var(--cp-main);
          font-weight: normal;
        }
      }
    }
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
