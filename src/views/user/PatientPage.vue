<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import type { Patient } from '@/types/patient'
import { addPatientInfo, getPatientList } from '@/services/patient'
import type { FormInstance, FormRules } from 'element-plus'
import { idCardRules, nameRules } from '@/utils/rules'

const list = ref<Patient[]>()
const isShow = ref<boolean>(false)
// 传给cp-radio-btn子组件的数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
// 表单
const formRef = ref<FormInstance>()
const patient: Patient = reactive({
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 0
})
const rules: FormRules = {
  name: nameRules,
  idCard: idCardRules
}
// 默认患者值要转换
const defaultFlag = computed({
  get() {
    return patient.defaultFlag === 1
  },
  set(value) {
    patient.defaultFlag = value ? 1 : 0
  }
})

const loadList = async () => {
  const res = await getPatientList()
  list.value = res.data
}

onMounted(async () => {
  await loadList()
})
// 点击添加就诊人
const addPatient = () => {
  isShow.value = true
}
// 保存提交
const onSubmit = async () => {
  await formRef.value?.validate()
  // 身份证倒数第二位，单数是男，双数是女
  const gender = +patient.idCard.slice(-2, -1) % 2
  if (gender !== patient.gender) {
    await ElMessageBox.confirm('填写的性别和身份证号中的不一致\n您确认提交吗？', '温馨提示', {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning'
    })
  }
  await addPatientInfo(patient)
  isShow.value = false
  await loadList()
  ElMessage.success('添加成功')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="返回" content="家庭档案"></cp-nav-bar>
    <el-space direction="vertical" :size="15" :fill="true" class="patient-list">
      <div v-for="item in list" :key="item.id" class="patient-item">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <!-- 对身份证号码进行隐私处理 -->
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <span>{{ item.gender === 1 ? '男' : '女' }}</span>
          <span>{{ `${item.age}岁` }}</span>
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
        <svg-icon name="user-edit"></svg-icon>
      </div>
      <div class="patient-add" @click="addPatient">
        <Plus style="width: 20px; color: var(--cp-primary)" r></Plus>
        <span>添加就诊人</span>
      </div>
      <div class="patient-tip">最多可添加6人</div>
    </el-space>
  </div>
  <el-drawer v-model="isShow" :show-close="false" :with-header="false" size="100%">
    <cp-nav-bar
      title="返回"
      content="添加患者"
      right-text="保存"
      :back="
        () => {
          isShow = false
        }
      "
      @click-right="onSubmit"
    ></cp-nav-bar>
    <el-form ref="formRef" :model="patient" :rules="rules" autocomplete="off">
      <el-form-item label="真实姓名" prop="name" class="name">
        <el-input placeholder="请输入真实姓名" v-model="patient.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard" class="id">
        <el-input placeholder="请输入身份证号" v-model="patient.idCard"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
      </el-form-item>
      <el-form-item label="默认就诊人" prop="defaultFlag">
        <el-checkbox v-model="defaultFlag"></el-checkbox>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
@use '@/styles/patient.scss' as *;
</style>
