<script setup lang="ts">
const options = [
  { label: '一周内', value: '1' },
  { label: '一月内', value: '2' },
  { label: '半年内', value: '3' },
  { label: '大于半年', value: '4' }
]
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
    <div class="illness-form">
      <el-form>
        <el-form-item>
          <el-input
            type="textarea"
            rows="5"
            placeholder="请详细描述您的病情，病情描述不能为空"
          ></el-input>
        </el-form-item>
        <p>本次患病多久了？</p>
        <el-form-item>
          <cp-radio-btn :options="options"></cp-radio-btn>
        </el-form-item>
        <el-form-item label="上传图片"></el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  .illness-tip {
    display: flex;
    padding: 20px 15px;
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
    padding: 20px;
    background-color: #fff;
  }
}
</style>
