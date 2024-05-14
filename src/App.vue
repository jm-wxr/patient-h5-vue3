<script setup lang="ts">
import { useUserStore } from './stores'
import request from './utils/request'
import type { User } from './types/user'

const userStore = useUserStore()

const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    password: 'abc12345'
  })
  ElMessage.success('登录成功')
  userStore.setUser(res.data)
  // console.log(res)
}

const getUserInfo = async () => {
  const res = await request('/patient/myUser')
  console.log(res)
}
</script>

<template>
  <el-button type="primary" @click="login">登录</el-button>
  <el-button type="danger" @click="userStore.delUser()">退出</el-button>
  <el-button type="primary" @click="getUserInfo">获取个人信息</el-button>
</template>

<style lang="scss" scoped></style>
