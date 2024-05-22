<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import type { Patient } from '@/types/patient'
import { addPatient, deletePatient, editPatient, getPatientList } from '@/services/patient'
import type { FormInstance, FormRules } from 'element-plus'
import { idCardRules, nameRules } from '@/utils/rules'
import { useConsultStore } from '@/stores'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const store = useConsultStore()

// 患者列表
const list = ref<Patient[]>([])
// 控制抽屉显示
const isShow = ref<boolean>(false)
// 判断是否为选择患者页面
const isChange = computed(() => route.query.isChange === '1')
// 选择的患者id
const patientId = ref<string>()
// 传给cp-radio-btn子组件的数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

const initPatient: Patient = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}
// 表单
const formRef = ref<FormInstance>()
const patient = ref<Patient>({ ...initPatient })
const rules: FormRules = {
  name: nameRules,
  idCard: idCardRules
}
// 默认患者值要转换
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

const loadList = async () => {
  const res = await getPatientList()
  list.value = res.data
  if (isChange.value && list.value.length) {
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    patientId.value = defPatient ? defPatient.id : list.value[0].id
  }
}

onMounted(async () => {
  await loadList()
})
// 展示抽屉组件
const showDrawer = (item?: Patient) => {
  // 区分是编辑还是添加
  if (item) {
    // 这里不能直接赋值，必须解构出来，因为item里有不需要的属性
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  isShow.value = true
}
// 保存提交
const onSubmit = async () => {
  await formRef.value?.validate()
  // 身份证倒数第二位，单数是男，双数是女
  const gender = +patient.value.idCard.slice(-2, -1) % 2
  if (gender !== patient.value.gender) {
    await ElMessageBox.confirm('填写的性别和身份证号中的不一致\n您确认提交吗？', '温馨提示', {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning'
    })
  }
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  isShow.value = false
  await loadList()
  ElMessage.success(patient.value.id ? '编辑成功' : '添加成功')
}
// 删除患者
const remove = async () => {
  if (patient.value.id) {
    await ElMessageBox.confirm(`你确定要删除【${patient.value.name}】患者信息吗？`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deletePatient(patient.value.id)
    isShow.value = false
    await loadList()
    ElMessage.success('删除成功')
  }
}

// 选择患者
const onSelected = (id?: string) => {
  if (isChange.value) {
    patientId.value = id
  }
}

// 下一步
const next = () => {
  if (!patientId.value) return ElMessage.warning('请选择就诊患者')
  store.setPatientId(patientId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="返回" :content="isChange ? '选择档案' : '家庭档案'" />
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <el-space direction="vertical" :size="15" fill class="patient-list" style="width: 100%">
      <div
        v-for="item in list"
        :key="item.id"
        class="patient-item"
        :class="{ selected: patientId === item.id }"
        @click="onSelected(item.id)"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <!-- 对身份证号码进行隐私处理 -->
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <span>{{ item.gender === 1 ? '男' : '女' }}</span>
          <span>{{ `${item.age}岁` }}</span>
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
        <svg-icon name="user-edit" @click="showDrawer(item)"></svg-icon>
      </div>
      <div class="patient-add" v-if="list?.length < 6" @click="showDrawer()">
        <Plus style="width: 20px; color: var(--cp-primary)" r></Plus>
        <span>添加就诊人</span>
      </div>
      <div class="patient-tip">最多可添加6人</div>
    </el-space>
    <div class="patient-next" v-if="isChange">
      <el-button @click="next" type="primary" size="large" round>下一步</el-button>
    </div>
  </div>
  <div class="patient-drawer">
    <el-drawer
      v-model="isShow"
      :show-close="false"
      :with-header="false"
      size="100%"
      :destroy-on-close="true"
    >
      <cp-nav-bar
        title="返回"
        :content="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        :back="
          () => {
            isShow = false
          }
        "
        @click-right="onSubmit"
      ></cp-nav-bar>
      <el-form ref="formRef" :model="patient" :rules="rules" autocomplete="off">
        <el-form-item label="真实姓名" label-width="100px" prop="name" class="name">
          <el-input placeholder="请输入真实姓名" v-model="patient.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="100px" prop="idCard" class="id">
          <el-input placeholder="请输入身份证号" v-model="patient.idCard"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          label-width="100px"
          prop="gender"
          :required="true"
          class="gender"
        >
          <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
        </el-form-item>
        <el-form-item label="默认就诊人" label-width="100px" prop="defaultFlag">
          <el-checkbox v-model="defaultFlag"></el-checkbox>
        </el-form-item>
      </el-form>
      <div class="delete">
        <el-button v-if="patient.id" type="danger" @click="remove" round>删除</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/patient.scss' as *;
</style>
