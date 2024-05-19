<script setup lang="ts">
import ad from '@/assets/ad.png'
import { onMounted, onUnmounted, ref } from 'vue'
import KnowledgeList from './components/KnowledgeList.vue'
import FollowDoctor from './components/FollowDoctor.vue'

const largeNavList = [
  { iconPath: 'home-doctor', title: '问医生', desc: '按科室查问医生' },
  { iconPath: 'home-graphic', title: '技术问诊', desc: '20s医生极速回复' },
  { iconPath: 'home-prescribe', title: '开药门诊', desc: '线上买药史方便' }
]
const smallNavList = [
  { iconPath: 'home-order', title: '药品订单' },
  { iconPath: 'home-docs', title: '健康挡案' },
  { iconPath: 'home-rp', title: '我的处方' },
  { iconPath: 'home-find', title: '疾病查询' }
]
const swiperList = [
  { id: 0, imgPath: ad },
  { id: 1, imgPath: ad }
]
const active = ref('0')

// 标签栏吸顶
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
const handleScroll = () => {
  const tabsHeader = document.querySelector('.home-tabs .el-tabs__header')
  if (tabsHeader) {
    if (tabsHeader.getBoundingClientRect().top <= 0) {
      tabsHeader.classList.add('sticky')
    } else {
      tabsHeader.classList.remove('sticky')
    }
  }
}
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="content">
        <h1>优医</h1>
        <div class="search">
          <svg-icon name="home-search" />
          搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="home-nav">
      <el-row class="large">
        <el-col v-for="item in largeNavList" :key="item.title" :span="8">
          <router-link to="/" class="nav-item">
            <svg-icon :name="item.iconPath"></svg-icon>
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </router-link>
        </el-col>
      </el-row>
      <el-row class="small">
        <el-col v-for="item in smallNavList" :key="item.title" :span="6">
          <router-link to="/" class="nav-item">
            <svg-icon :name="item.iconPath"></svg-icon>
            <p class="title">{{ item.title }}</p>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <!-- 轮播图 -->
    <div class="home-swiper">
      <el-carousel height="100px" :autoplay="true">
        <el-carousel-item v-for="item in swiperList" :key="item.id">
          <img :src="item.imgPath" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 知识列表tabs -->
    <div class="home-tabs">
      <el-tabs v-model="active">
        <el-tab-pane label="关注">
          <follow-doctor />
          <knowledge-list type="like" />
        </el-tab-pane>
        <el-tab-pane label="推荐">
          <knowledge-list type="recommend" />
        </el-tab-pane>
        <el-tab-pane label="减脂">
          <knowledge-list type="fatReduction" />
        </el-tab-pane>
        <el-tab-pane label="饮食">
          <knowledge-list type="food" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/home.scss' as *;
</style>
