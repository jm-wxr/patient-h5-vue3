/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100, //单行长度
        tabWidth: 2, //缩进长度
        useTabs: false, //使用空格代替tab缩进
        semi: false, //句末使用分号
        singleQuote: true, //使用单引号
        quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
        jsxSingleQuote: true, // jsx中使用单引号
        trailingComma: 'none', //多行时尽可能打印尾随逗号
        bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
        jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
        arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
        requirePragma: false, //无需顶部注释即可格式化
        insertPragma: false, //在已被preitter格式化的文件顶部加上标注
        proseWrap: 'preserve', //不知道怎么翻译
        htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
        vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
        endOfLine: 'auto', //结束行形式
        embeddedLanguageFormatting: 'auto' //对引用代码进行格式化
      },
      {
        usePrettierrc: false // 在不加载 prettierrc 配置文件的情况下运行 prettier
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index', 'Index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭。
    'no-undef': 'error'
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
