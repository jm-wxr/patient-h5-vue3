<script setup lang="ts">
import { getConsultOrderPre } from '@/services/consult'
import { getPatientInfo } from '@/services/patient'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData, ConsultOrderPreParams } from '@/types/consult'
import type { Patient } from '@/types/patient'
import { onMounted, ref } from 'vue'

const consultStore = useConsultStore()

// 支付信息
const payInfo = ref<ConsultOrderPreData>()
// 患者信息
const patientInfo = ref<Patient>()
// 是否同意协议
const isAgree = ref(false)
// 控制抽屉显示
const isShow = ref(false)

onMounted(() => {
  getPay()
  getPatient()
})

// 获取支付数据
const getPay = async () => {
  const res = await getConsultOrderPre({
    type: consultStore.consult.type,
    illnessType: consultStore.consult.illnessType
  })
  payInfo.value = res.data
  // 设置默认优惠券
  consultStore.setCouponId(payInfo.value.couponId)
}
// 获取患者信息
const getPatient = async () => {
  if (!consultStore.consult.patientId) return
  const res = await getPatientInfo(consultStore.consult.patientId)
  patientInfo.value = res.data
}

const handleClose = () => {
  isShow.value = false
}
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar content="支付" />
    <div class="pay-head">
      <img src="@/assets/avatar-doctor.svg" class="img" />
      <div class="desc">
        <p>极速问诊</p>
        <p>自动分配医生</p>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="pay-price">
      <p>
        <span>图文问诊</span>
        <span>-￥{{ payInfo?.payment }}</span>
      </p>
      <p>
        <span>积分抵扣</span>
        <span>-￥{{ payInfo?.pointDeduction }}</span>
      </p>
      <p>
        <span>优惠券</span>
        <span>-￥{{ payInfo?.couponDeduction }}</span>
      </p>
      <p class="total">
        <span>合计</span>
        <span>￥{{ payInfo?.actualPayment }}</span>
      </p>
    </div>
    <el-divider></el-divider>
    <div class="pay-info">
      <p>
        <span>患者信息</span>
        <span>
          {{ patientInfo?.name }} | {{ patientInfo?.genderValue }} | {{ patientInfo?.age }}岁
        </span>
      </p>
      <p class="description">
        <span>病情描述</span>
        <span>{{ consultStore.consult.illnessDesc }}</span>
      </p>
    </div>
    <div class="pay-agreement">
      <el-checkbox v-model="isAgree">
        我已阅读并同意
        <span class="pay-agreement-link">支付协议</span>
      </el-checkbox>
    </div>
    <div class="pay-submit">
      <p>
        合计:
        <span>￥</span>
        <span>{{ payInfo?.actualPayment.toFixed(2) }}</span>
      </p>
      <el-button type="primary" round @click="isShow = true">立即支付</el-button>
    </div>
    <el-drawer v-model="isShow" direction="btt" :before-close="handleClose" :show-close="false">
      <template #header>
        <p class="title">选择支付方式</p>
      </template>
      <div class="pay-type">
        <p class="price">￥ {{ payInfo?.payment.toFixed(2) }}</p>
        <p class="item">
          <svg-icon name="consult-wechat"></svg-icon>
          <span>微信支付</span>
          <el-checkbox></el-checkbox>
        </p>
        <p class="item">
          <svg-icon name="consult-alipay"></svg-icon>
          <span>支付宝支付</span>
          <el-checkbox></el-checkbox>
        </p>
      </div>
      <el-button type="primary" round>立即支付</el-button>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  .pay-head {
    display: flex;
    padding: 15px;
    align-items: center;
    .img {
      margin-right: 10px;
      width: 50px;
      aspect-ratio: 1;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      display: block;
      p {
        font-size: 16px;
        color: var(--cp-text2);
        &:last-child {
          font-size: 12px;
          color: var(--cp-tag);
        }
      }
    }
  }
  .pay-price,
  .pay-info {
    p {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      margin: 0 15px;
      border-bottom: 1px solid var(--cp-line);
      span:first-child {
        font-size: 16px;
      }
      span:last-child {
        color: var(--cp-dark);
      }
      &.total {
        span:last-child {
          font-size: 16px;
          color: var(--cp-price);
        }
      }
      &.description {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
    }
  }
  .el-divider {
    margin: 0;
    height: 10px;
    background-color: var(--cp-bg);
  }
  .pay-agreement {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-link {
      color: var(--cp-primary);
      cursor: pointer;
    }
  }
  .pay-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 15px;
    p {
      font-size: 14px;
      span:first-child {
        font-size: 14px;
        color: #f00;
      }
      span:last-child {
        font-size: 20px;
        font-weight: 700;
        color: #f00;
      }
    }
    .el-button {
      width: 160px;
      height: 40px;
    }
  }

  :deep(.el-drawer) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    .el-drawer__header {
      margin-bottom: 0;
    }
    .title {
      text-align: center;
      font-size: 16px;
      color: #000;
      font-weight: 700;
    }
    .pay-type {
      .price {
        text-align: center;
        font-size: 16px;
        font-weight: 900;
        color: #000;
      }
      .item {
        display: flex;
        align-items: center;
        width: 100%;
        span {
          flex: 1;
        }
      }
      .svg-icon {
        width: 20px;
        aspect-ratio: 1;
      }
    }
  }
}
</style>
