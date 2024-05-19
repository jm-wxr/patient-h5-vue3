import { like } from '@/services/consult'
import { ref } from 'vue'

// 封装逻辑，规范写法 useXxx，表示使用某功能
export const useFollow = () => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await like('doc', item.id)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
