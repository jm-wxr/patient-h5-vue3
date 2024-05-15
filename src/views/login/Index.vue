<script setup lang="ts">
import { ArrowRight, Hide, View } from '@element-plus/icons-vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { onUnmounted, reactive, ref } from 'vue'
import { loginByPassword, getMobileCode, loginByCode } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import type { Code } from '@/types/user'

const isShow = ref(false) // 密码是否可见
const formRef = ref() // 表单模版引用
const isAgree = ref(false) // 是否同意协议
const isPassword = ref(true) // 密码登录和短信登录切换
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const time = ref(0) // 验证码倒计时

// 表单数据
const form = reactive({
  mobile: '',
  [isPassword.value ? 'password' : 'code']: ''
})
const rules = reactive({
  mobile: mobileRules,
  [isPassword.value ? 'password' : 'code']: isPassword.value ? passwordRules : codeRules
})

const login = async () => {
  if (!isAgree.value) return ElMessage.warning('请同意用户协议')
  await formRef.value.validate()
  const res = isPassword.value
    ? await loginByPassword(form.mobile, form?.password)
    : await loginByCode(form.mobile, form?.code)
  userStore.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳就到个人中心
  router.push((route.query.returnUrl as string) || '/')
  ElMessage.success('登录成功')
}
let timeId: number
// 发送验证码
const send = async () => {
  if (time.value > 0) return
  await formRef.value.validateField('mobile')
  const res = await getMobileCode(form.mobile, 'login')
  ElMessage.success('发送成功')
  form.code = (res.data as Code).code
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearTimeout(timeId)
    }
  }, 1000)
}

onUnmounted(() => {
  clearInterval(timeId)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar rightText="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-header">
      <h3>{{ isPassword ? '密码登录' : '短信验证码登录' }}</h3>
      <el-link href="javascript:" @click="isPassword = !isPassword">
        <span>{{ isPassword ? '短信验证码登录' : '密码登录' }}</span>
        <arrow-right style="width: 15px"></arrow-right>
      </el-link>
    </div>
    <!-- 表单 -->
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号"
          type="number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isPassword" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          :type="isShow ? 'text' : 'password'"
          autocomplete="off"
        >
          <template #suffix>
            <el-icon @click="isShow = !isShow">
              <View v-if="isShow" />
              <Hide v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-else prop="code">
        <el-input v-model="form.code" placeholder="短信验证码" type="number" autocomplete="off">
          <template #suffix>
            <span class="btn-send" @click="send">
              {{ time <= 0 ? '发送验证码' : `${time}s后再次发送` }}
            </span>
          </template>
        </el-input>
      </el-form-item>
      <div class="cp-cell">
        <el-checkbox v-model="isAgree">
          <span>我已同意</span>
          <el-link type="primary" href="javascript:">&nbsp;用户协议&nbsp;</el-link>
          <span>及</span>
          <el-link type="primary" href="javascript:">&nbsp;隐私政策&nbsp;</el-link>
        </el-checkbox>
      </div>
      <div class="cp-cell">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="cp-cell">
        <el-link>忘记密码?</el-link>
      </div>
    </el-form>
    <!-- 底部 -->
    <div class="login-other">
      <el-divider>第三方登录</el-divider>
      <img src="@/assets/qq.svg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/login.scss' as *;
</style>
