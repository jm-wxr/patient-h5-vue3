<script setup lang="ts">
import { useUserStore } from '../../stores'
import request from '../../utils/request'
import type { User } from '../../types/user'
import { ArrowRight, Hide } from '@element-plus/icons-vue'
</script>

<template>
  <div class="login-page">
    <cp-nav-bar rightText="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-header">
      <h3>密码登录</h3>
      <a href="javascript:">
        <span>短信验证码登录</span>
        <arrow-right style="width: 15px"></arrow-right>
      </a>
    </div>
    <!-- 表单 -->
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" :suffix-icon="Hide"></el-input>
      </el-form-item>
    </el-form>
    <div class="agreement">
      <el-checkbox>
        <span>我已同意</span>
        <a href="javascript:">用户协议</a>
        <span>及</span>
        <a href="javascript:">隐私政策</a>
      </el-checkbox>
      <el-button type="primary">登录</el-button>
      <el-link>忘记密码?</el-link>
    </div>
    <!-- 底部 -->
  </div>
</template>

<style lang="scss" scoped></style>
