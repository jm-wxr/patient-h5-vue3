import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户基本信息
    const user = ref<User>()
    // 设置用户数据
    const setUser = (userData: User) => {
      user.value = userData
    }
    // 删除用户
    const delUser = () => {
      user.value = undefined
    }

    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
