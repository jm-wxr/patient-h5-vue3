<script setup lang="ts">
import router from '@/router'
import { createConsultOrder, getConsultOrderPre } from '@/services/consult'
import { getPatientInfo } from '@/services/patient'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/patient'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const consultStore = useConsultStore()

const payInfo = ref<ConsultOrderPreData>() // 支付信息
const patientInfo = ref<Patient>() // 患者信息
const isAgree = ref(false) // 是否同意协议
const isShow = ref(false) // 控制抽屉显示
const payMethod = ref(0) // 支付方式
const loading = ref(false) // 是否正在加载订单
const orderId = ref('') // 订单id

onMounted(() => {
  getPay()
  getPatient()
})
// 生成订单后不可回退
onBeforeRouteLeave(() => {
  if (orderId.value) return false
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
// 关闭支付抽屉时执行
const handleClose = async () => {
  try {
    await ElMessageBox.confirm(
      '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      '关闭支付',
      {
        cancelButtonText: '仍要关闭',
        confirmButtonText: '继续支付'
      }
    )
  } catch {
    orderId.value = ''
    router.push('/user/consult')
    isShow.value = false
  }
}
// 点击立即支付
const onPay = async () => {
  if (!isAgree.value) return ElMessage.warning('请先同意支付协议')
  loading.value = true
  const res = await createConsultOrder(consultStore.consult)
  orderId.value = res.data.id
  loading.value = false
  consultStore.clear()
  isShow.value = true
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
      <el-button type="primary" round @click="onPay" :loading="loading">立即支付</el-button>
    </div>
    <el-drawer
      v-model="isShow"
      :before-close="handleClose"
      :show-close="false"
      direction="btt"
      size="350"
    >
      <template #header>
        <p class="title">选择支付方式</p>
      </template>
      <p class="price">￥{{ payInfo?.payment.toFixed(2) }}</p>
      <div class="pay-type">
        <el-radio-group v-model="payMethod">
          <el-radio class="item" :value="0">
            <svg-icon name="consult-wechat" />
            <span>微信支付</span>
          </el-radio>
          <el-radio class="item" :value="1">
            <svg-icon name="consult-alipay" />
            <span>支付宝支付</span>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="pay-button"><el-button type="primary" round>立即支付</el-button></div>
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
      padding-top: 15px;
      .title {
        text-align: center;
        font-size: 16px;
        color: #000;
      }
    }
    .el-drawer__body {
      padding: 0;
    }
    .price {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      color: #000;
      padding: 20px 0;
    }
    .pay-type {
      border-top: 1px solid var(--cp-line);
      border-bottom: 1px solid var(--cp-line);
      margin-bottom: 15px;
      .item:first-child {
        border-bottom: 1px solid var(--cp-line);
      }
      .item {
        display: flex;
        align-items: center;
        height: 50px;
        padding-right: 60vw;
        .svg-icon {
          width: 20px;
          aspect-ratio: 1;
        }
        span {
          flex: 1;
          margin-left: 10px;
          font-size: 16px;
        }
        .el-checkbox {
          width: 20px;
          height: 20px;
        }
      }
    }
    .pay-button {
      width: 100%;
      padding: 0 15px;
      .el-button {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
