const mobileRules = [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
]

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { pattern: /^\w{8,24}$/, message: '密码必须是8-24个字符', trigger: 'blur' }
]

const codeRules = [
  { required: true, message: '请输入验证码', trigger: 'blur' },
  { pattern: /^\d{6}$/, message: '验证码必须是6位数字', trigger: 'blur' }
]

export { mobileRules, passwordRules, codeRules }
