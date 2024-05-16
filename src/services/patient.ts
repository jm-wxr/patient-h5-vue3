import type { Patient } from '@/types/patient'
import request from '@/utils/request'

// 查询患者列表信息
export const getPatientList = () => {
  return request<Patient[]>('/patient/mylist')
}

// 添加患者信息
export const addPatientInfo = (patient: Patient) => {
  return request('/patient/add', 'POST', patient)
}
