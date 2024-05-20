<script setup lang="ts">
import router from '@/router'
import { getUserInfo } from '@/services/user'
import { useUserStore } from '@/stores'
import type { UserInfo } from '@/types/user'
import { ArrowRight, Edit } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'

const userStore = useUserStore()
const user = reactive<UserInfo>({
  account: '',
  avatar: '',
  collectionNumber: 0,
  likeNumber: 0,
  score: 0,
  couponNumber: 0,
  orderInfo: {
    paidNumber: 0,
    receivedNumber: 0,
    shippedNumber: 0,
    finishedNumber: 0
  }
} as UserInfo)
const tools = [
  { label: '我的问诊', path: '/user' },
  { label: '我的处方', path: '/user' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user' },
  { label: '我的评价', path: '/user' },
  { label: '官方客服', path: '/user' },
  { label: '设置', path: '/user' }
]

onMounted(async () => {
  const res = await getUserInfo()
  Object.assign(user, res.data)
})

const logout = async () => {
  await ElMessageBox.confirm('确定退出登录吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  userStore.delUser()
  router.push('/login')
}
</script>

<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <el-image :src="user.avatar" fit="cover" round></el-image>
        <div class="name">
          <p>{{ user.account }}</p>
          <Edit
            style="margin-top: 10px; width: 20px; height: 20px; color: var(--cp-primary)"
          ></Edit>
        </div>
      </div>
      <el-row>
        <el-col :span="6">
          <p>{{ user.collectionNumber }}</p>
          <p>收藏</p>
        </el-col>
        <el-col :span="6">
          <p>{{ user.likeNumber }}</p>
          <p>关注</p>
        </el-col>
        <el-col :span="6">
          <p>{{ user.score }}</p>
          <p>积分</p>
        </el-col>
        <el-col :span="6">
          <p>{{ user.couponNumber }}</p>
          <p>优惠券</p>
        </el-col>
      </el-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/">
          全部订单
          <ArrowRight style="width: 1em"></ArrowRight>
        </router-link>
      </div>
      <el-row>
        <el-col :span="6">
          <el-badge :value="user.orderInfo.paidNumber || ''">
            <svg-icon name="user-paid"></svg-icon>
          </el-badge>
          <p>待付款</p>
        </el-col>
        <el-col :span="6">
          <el-badge :value="user.orderInfo.receivedNumber || ''">
            <svg-icon name="user-shipped"></svg-icon>
          </el-badge>
          <p>待发货</p>
        </el-col>
        <el-col :span="6">
          <el-badge :value="user.orderInfo.shippedNumber || ''">
            <svg-icon name="user-received"></svg-icon>
          </el-badge>
          <p>待收货</p>
        </el-col>
        <el-col :span="6">
          <el-badge :value="user.orderInfo.finishedNumber || ''">
            <svg-icon name="user-finished"></svg-icon>
          </el-badge>
          <p>已完成</p>
        </el-col>
      </el-row>
    </div>
    <div class="user-page-tool">
      <el-space
        direction="vertical"
        alignment="flex-start"
        :size="30"
        :fill="true"
        style="width: 100%"
      >
        <div class="head">
          <h3>快捷工具</h3>
        </div>
        <router-link v-for="(item, i) in tools" :key="item.label" :to="item.path" class="cell">
          <svg-icon :name="`user-tool-0${i + 1}`"></svg-icon>
          <span>{{ item.label }}</span>
          <ArrowRight style="width: 1em"></ArrowRight>
        </router-link>
      </el-space>
    </div>
    <div class="logout">
      <el-button type="danger" plain @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/user.scss' as *;
</style>
