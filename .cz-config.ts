module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    {
      value: 'style',
      name: 'style:    不影响代码含义的更改\n            (空白、格式化、缺少分号等)'
    },
    { value: 'refactor', name: 'refactor: 既不修复bug也不增加特性的代码更改' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    对构建过程或辅助工具\n            和库(如文档生成)的更改' },
    { value: 'revert', name: 'revert:   回退到一个提交记录' },
    { value: 'build', name: 'build:    打包' }
  ],
  // scope的选项
  scopes:[{name: 'empty'}, {name: 'custom'}],
  // 覆盖消息，默认值如下：
  messages: {
    type: '请选择提交类型:',
    scope: '请选择修改范围(可选):',
    // 当allowCustomScopes为true时使用
    customScope: '请输入修改范围 (可选，默认为custom):',
    subject: '请简要描述提交 (必填):',
    body: '请输入详细描述 (跳过即可):',
    breaking: '列出任何破坏性更改 (可选):\n',
    footer: '请输入要关闭的issue (跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过你想跳过的问题
  skipQuestions: ['body', 'footer'],
  // 限制提交信息长度, commitlint默认是72
  subjectLimit: 72,
}
