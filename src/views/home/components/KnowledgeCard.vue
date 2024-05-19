<script setup lang="ts">
import type { Knowledge } from '@/types/consult'
import { useFollow } from '@/composable'

defineProps<{ item: Knowledge }>()
const { loading, follow } = useFollow()
</script>

<template>
  <div class="knowledge-card">
    <div class="head">
      <img src="https://yanxuan-item.nosdn.127.net/9ad83e8d9670b10a19b30596327cfd14.png" alt="" />
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep">
          {{ item.creatorHospatalName }} {{ item.creatorDep }} {{ item.creatorTitles }}
        </p>
      </div>
      <el-button :loading="loading" @click="follow(item)">
        {{ item.likeFlag === 1 ? '已关注' : '+关注' }}
      </el-button>
    </div>
    <div class="body">
      <h3 class="title">{{ item.title }}</h3>
      <p class="tag">
        <span v-for="(tag, i) in item.topics" :key="i"># {{ tag }}</span>
      </p>
      <p class="intro">{{ item.content.replace(/<[^>]+>/g, '') }}</p>
      <div class="imgs">
        <img v-for="(url, i) in item.coverUrl" :key="i" :src="url" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
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
