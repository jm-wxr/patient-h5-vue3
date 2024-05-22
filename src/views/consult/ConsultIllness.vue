<script setup lang="ts">
import type { ConsultIllness } from '@/types/consult'
import { computed, onMounted, ref, watch } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { type UploadFile, type UploadUserFile } from 'element-plus'
import { uploadImage } from '@/services/consult'
import { useConsultStore } from '@/stores'
import router from '@/router'

const timeOptions = [
  { label: '一周内', value: '1' },
  { label: '一月内', value: '2' },
  { label: '半年内', value: '3' },
  { label: '大于半年', value: '4' }
]
const flagOptions = [
  { label: '就诊过', value: '1' },
  { label: '没就诊过', value: '2' }
]
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
// 已添加的文件列表
const fileList = ref<UploadUserFile[]>([])
const store = useConsultStore()

onMounted(async () => {
  // 数据回显
  if (store.consult.illnessDesc) {
    await ElMessageBox.confirm('是否恢复您之前填写的病情信息？', '温馨提示')
    const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
    form.value = { illnessDesc, illnessTime, consultFlag, pictures }
    pictures?.forEach(async (item) => {
      fileList.value.push({ name: item.id, url: item.url })
    })
  }
})

// 列表改变(添加图片)
watch(
  () => fileList.value,
  async (value, oldValue) => {
    if (value.length < oldValue.length) {
      return
    }
    // 添加图片
    const file = fileList.value[fileList.value.length - 1]
    file.status = 'uploading'
    try {
      const res = await uploadImage(file.raw!)
      form.value.pictures?.push(res.data)
      file.url = res.data.url
      file.status = 'ready'
      ElMessage.success('上传成功')
    } catch (err) {
      console.log(err)
      fileList.value.pop()
      ElMessage.error('上传失败')
    }
  }
)
// 按钮禁用状态
const disabled = computed(() => {
  return !form.value.illnessDesc || !form.value.illnessTime || !form.value.consultFlag
})

// 删除图片
const onRemove = (item: UploadFile) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

// 点击下一步
const next = () => {
  if (!form.value.illnessDesc) return ElMessage.warn('请输入病情描述')
  if (!form.value.illnessTime) return ElMessage.warn('请选择症状持续时间')
  if (!form.value.consultFlag) return ElMessage.warn('请选择是否已经就诊s')
  store.setIllness(form.value)
  router.push('/user/patient?isChange=1')
}
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="返回" content="图文问诊" />
    <div class="illness-tip">
      <img src="@/assets/avatar-doctor.svg" />
      <div class="right">
        <p class="title">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <svg-icon name="consult-safe" />
          内容仅医生可见
        </p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="illness-form">
      <el-form :model="form">
        <el-form-item prop="illnessDesc">
          <el-input
            v-model="form.illnessDesc"
            type="textarea"
            rows="5"
            placeholder="请详细描述您的病情，病情描述不能为空"
          ></el-input>
        </el-form-item>
        <p>本次患病多久了？</p>
        <el-form-item>
          <cp-radio-btn :options="timeOptions" v-model="form.illnessTime"></cp-radio-btn>
        </el-form-item>
        <p>此次病情是否去医院就诊过？</p>
        <el-form-item>
          <cp-radio-btn :options="flagOptions" v-model="form.consultFlag"></cp-radio-btn>
        </el-form-item>
        <el-form-item class="form-upload">
          <el-upload
            v-model:file-list="fileList"
            :auto-upload="false"
            list-type="picture-card"
            :on-remove="onRemove"
          >
            <div class="content">
              <Upload style="width: 30px" />
              <p>上传图片</p>
            </div>
          </el-upload>
          <p class="tip">上传内容仅医生可见，最多9张图，最大5MB</p>
        </el-form-item>
        <el-form-item>
          <el-button :class="{ disabled }" @click="next" type="primary" round>下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  .illness-tip {
    display: flex;
    padding: 20px 15px 0px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .right {
      margin-left: 15px;
      .title {
        font-size: 16px;
        color: var(--cp-text1);
      }
      .tip {
        padding: 10px;
        font-size: 13px;
        color: var(--cp-text3);
        background-color: var(--cp-bg);
        margin-top: 5px;
      }
      .safe {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--cp-text-light);
        margin-top: 5px;
        .svg-icon {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
  }
  .illness-form {
    padding: 0px 20px;
    background-color: #fff;
    :deep(.form-upload) {
      display: flex;
      flex-direction: row;
      align-items: center;
      .el-upload-list__item {
        width: 80px;
        height: 80px;
      }
      .el-upload {
        margin-right: 10px;
        &.el-upload--picture-card {
          --el-upload-picture-card-size: 80px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 12px;
          color: var(--cp-dark);
        }
      }
      .tip {
        font-size: 12px;
        color: var(--cp-tip);
      }
    }
    .el-button {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      &.disabled {
        opacity: 1;
        background: #fafafa;
        color: #d9dbde;
        border: #fafafa;
      }
    }
  }
}
</style>
