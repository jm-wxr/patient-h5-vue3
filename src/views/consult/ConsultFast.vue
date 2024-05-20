<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useConsultStore } from '@/stores'
import { ConsultType } from '@/enums'

const stores = useConsultStore()

onMounted(() => {
  // 设置问诊类型
  stores.setType(ConsultType.Fast)
})
</script>

<template>
  <div class="consult-fast-page">
    <cp-nav-bar title="返回" content="极速问诊" right-text="问诊记录"></cp-nav-bar>
    <div class="fast-logo">
      <img src="@/assets/consult-fast.png" alt="" />
      <p>
        <span>20s</span>
        快速匹配专业医生
      </p>
    </div>
    <router-link to="/consult/dep" @click="stores.setIllnessType(1)">
      <svg-icon name="consult-doctor" />
      <div class="info">
        <p>三甲图文问诊</p>
        <p>三甲主治及以上级别医生</p>
      </div>
      <ArrowRight />
    </router-link>
    <router-link to="/consult/dep" @click="stores.setIllnessType(0)">
      <svg-icon name="consult-message" />
      <div class="info">
        <p>普通图文问诊</p>
        <p>二甲主治及以上级别医生</p>
      </div>
      <ArrowRight />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.consult-fast-page {
  .fast-logo {
    text-align: center;
    padding: 30px 0 45px;
    img {
      width: 240px;
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      span {
        color: var(--cp-primary);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    margin: 0 15px 15px 15px;
    border: 1px solid var(--cp-line);
    .svg-icon {
      width: 40px;
      height: 40px;
    }
    .info {
      margin-left: 12px;
      flex: 1;
      > p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }
      > p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
    svg {
      width: 20px;
      color: #999;
    }
  }
}
</style>
