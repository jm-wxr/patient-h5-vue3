<script setup lang="ts"></script>

<template>
  <div class="knowledge-card">
    <div class="head">
      <img src="https://yanxuan-item.nosdn.127.net/9ad83e8d9670b10a19b30596327cfd14.png" alt="" />
      <div class="info">
        <p class="name">王医生</p>
        <p class="dep">中山大学肿瘤防治中心 肠胃外科 副主治医师</p>
      </div>
      <el-button>+关注</el-button>
    </div>
    <div class="body">
      <h3 class="title">克服面试紧张的技巧</h3>
      <p class="tag">
        <span># 面试</span>
        <span># 紧张</span>
      </p>
      <p class="intro">
        克服面试紧张的技巧，克服面试紧张的技巧，克服面试紧张的技巧，克服面试紧张的技巧，克服面试紧张的技巧，克服面试紧张的技巧，克服面试紧张的技巧，
      </p>
      <div class="imgs">
        <img src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png" alt="" />
        <img src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png" alt="" />
        <img src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png" alt="" />
      </div>
      <p class="logs">
        <span>10 收藏</span>
        <span>7 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 15px 0;
  .head {
    display: flex;
    align-items: center;
    img {
      width: 38px;
      aspect-ratio: 1;
      border-radius: 50%;
    }
    .info {
      // padding-right: 10px;
      margin-left: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    :deep(.el-button) {
      border-color: var(--cp-primary);
      border-radius: 15px;
      color: var(--cp-primary);
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      // 设置文本的最大行数
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      overflow: hidden;
      img {
        width: 108px;
        aspect-ratio: 1;
        margin-right: 10px;
        border-radius: 12px;
      }
    }
    .logs {
      margin-top: 10px;
      span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
