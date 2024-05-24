import type { ConsultType, IllnessTime } from '@/enums'

// 文章信息类型
export interface Knowledge {
  id: string
  /** 标题 */
  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 医生ID */
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export interface KnowledgePage {
  pageTotal: number
  total: number
  rows: KnowledgeList
}

// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章列表查询参数
export interface KnowledgeParams extends DocParams {
  /** 文章类型 */
  type: KnowledgeType
}

// 推荐医生列表-查询参数
export interface DocParams {
  /** 当前页码 */
  current: number
  /** 每页条数 */
  pageSize: number
}

// 医生卡片对象
export interface Doctor {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export interface DoctorPage {
  pageTotal: number
  total: number
  rows: DoctorList
}

// 关注的类型 百科话题 | 百科文章 | 医生 | 疾病
export type LikeType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 图片类型
export interface Picture {
  id: string
  url: string
}

// 问诊记录
export interface Consult {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Picture[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
}

// 问诊记录-全部可选
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型
export type PartialConsult = Partial<Consult>

// 二级科室
export interface SubDep {
  /* 科室id */
  id: string
  /* 科室名称 */
  name: string
}

// 一级科室
export interface TopDep extends SubDep {
  /* 二级科室数组 */
  child: SubDep[]
}

// 病情描述
export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 问诊订单预支付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付信息
export interface ConsultOrderPreData {
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 优惠券ID */
  couponId: string
  /** 需付款 */
  payment: number
  /** 实付款 */
  actualPayment: number
}

export interface ConsultPayUrlParams {
  /** 支付方式 0 微信 1 支付宝 */
  paymentMethod: 0 | 1
  /** 订单ID */
  orderId: string
  /** 支付回调地址 */
  payCallback: string
}
