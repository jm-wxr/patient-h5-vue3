import type {
  DocParams,
  DoctorPage,
  KnowledgePage,
  KnowledgeParams,
  LikeType,
  Picture,
  TopDep
} from '@/types/consult'
import request from '@/utils/request'

// 获取文章列表
export const getKownledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}

// 获取推荐医生列表
export const getDoctorPage = (params: DocParams) => {
  return request<DoctorPage>('/home/page/doc', 'GET', params)
}

// 关注操作
export const like = (type: LikeType, id: string) => {
  return request('/like', 'POST', { type, id })
}

// 获取科室列表
export const getAllDep = () => {
  return request<TopDep[]>('/dep/all')
}

// 上传图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Picture>('/upload', 'POST', fd)
}
