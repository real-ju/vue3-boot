/*!
 * https://eslint.bootcss.com/docs/rules/
 * https://eslint.vuejs.org/rules/
 * https://typescript-eslint.io/rules/
 *
 * - 0: off 关闭规则
 * - 1: warn 将规则打开为警告（不影响退出代码）
 * - 2: error 将规则打开为错误（触发时退出代码为1）
 */

module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, jquery: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    './.eslintrc-auto-import.json'
  ],
  overrides: [],
  rules: {
    'no-console': 0, // 不允许出现console语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 不允许出现debugger语句
    '@typescript-eslint/ban-ts-ignore': 0, // 允许使用ts-ignore
    '@typescript-eslint/explicit-function-return-type': 0, // 需要函数和类方法的显式返回类型
    '@typescript-eslint/no-explicit-any': 0, // 不允许使用 any 类型
    '@typescript-eslint/no-var-requires': 0, // 除import语句外，禁止使用require语句
    '@typescript-eslint/no-empty-function': 0, // 不允许空函数
    'vue/custom-event-name-casing': [2, 'kebab-case'], // $emit的命名形式使用短横线隔开式
    'no-use-before-define': 0, // 不允许在未定义之前就使用变量
    '@typescript-eslint/no-use-before-define': 0, // 不允许在未定义之前就使用变量
    '@typescript-eslint/ban-ts-comment': 0, // 不允许忽略
    '@typescript-eslint/ban-types': 0, // 不允许某些类型
    '@typescript-eslint/no-non-null-assertion': 0, // 禁止非空断言
    '@typescript-eslint/explicit-module-boundary-types': 0, // ts每个函数都要显式声明返回值
    'no-unused-vars': 0, // 不允许有声明后未使用的变量或者参数
    '@typescript-eslint/no-unused-vars': 0, // 不允许有声明后未使用的变量或者参数
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/promise-function-async': 0,
    'vue/attributes-order': 0, // 元素/组件特性,属性的顺序
    'vue/one-component-per-file': 0, // 检查每个文件是否只有一个组件
    // 配置位置以外位置的直角括号
    'vue/html-closing-bracket-newline': [2, { singleline: 'never', multiline: 'always' }],
    // // 强制每行属性的最大数量
    // 'vue/max-attributes-per-line': [2, { singleline: { max: 5 }, multiline: { max: 1 } }],
    'vue/multiline-html-element-content-newline': 0, // 在多行元素的内容前后强制换行
    'vue/singleline-html-element-content-newline': 0, // 要求单行元素的内容前后有一个换行符
    'vue/attribute-hyphenation': 0,
    'vue/require-default-prop': 0,
    'vue/require-explicit-emits': 0,
    // html标签自动闭合
    'vue/html-self-closing': [
      2,
      {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 0, // 驼峰命名规则
    'vue/no-mutating-props': 0,
    'array-bracket-newline': [2, { multiline: true }], // 要求或不允许数组括号内的换行符
    'generator-star-spacing': [2, 'both'], // 生成器函数前后空格
    'no-mixed-operators': 2, // 禁止混合使用不同的操作符
    // 'vue/component-name-in-template-casing': 0,
    // 'vue/html-closing-bracket-spacing': 0,
    // 'vue/no-unused-components': 0,
    // 'vue/no-use-v-if-with-v-for': 0,
    // 'vue/no-parsing-error': 0,
    // 'no-tabs': 0,// 禁用 tab
    eqeqeq: [2, 'always'], // 要求使用 === 和 !==
    // quotes: [
    //   2,
    //   'single',
    //   {
    //     avoidEscape: true,
    //     allowTemplateLiterals: true
    //   }
    // ],
    // // 强制语句分号结尾
    // semi: [
    //   2,
    //   'never',
    //   {
    //     beforeStatementContinuationChars: 'never'
    //   }
    // ],
    // //分后前后空格
    // 'semi-spacing': [
    //   2,
    //   {
    //     before: false,
    //     after: true
    //   }
    // ],
    // 'no-delete-var': 2,////不允许使用delete操作符
    // 要求使用 const 声明那些声明后不再被修改的变量
    // 'prefer-const': [
    //   2,
    //   {
    //     ignoreReadBeforeAssign: false
    //   }
    // ],
    // 'template-curly-spacing': 'off',
    // indent: [2, 2, { SwitchCase: 1 }],
    // 'arrow-spacing': [
    //   2,
    //   {
    //     before: true,
    //     after: true
    //   }
    // ],
    // // 禁止空格和 tab 的混合缩进
    // 'no-mixed-spaces-and-tabs': 2,
    // // 禁止使用多个空格
    // 'no-multi-spaces': 2,
    // // 禁止出现多行空行（此处设置最多出现连续3个空行）
    // 'no-multiple-empty-lines': [
    //   2,
    //   {
    //     max: 3,
    //     maxEOF: 3,
    //     maxBOF: 3
    //   }
    // ],
    // // 禁用行尾空格
    // 'no-trailing-spaces': 1,
    // // 强制在注释中 // 或 /* 使用一致的空格
    // 'spaced-comment': [
    //   1,
    //   'always',
    //   {
    //     markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    //   }
    // ]
    // // 强制在大括号中使用一致的空格
    // 'object-curly-spacing': [
    //   1,
    //   'always',
    //   {
    //     objectsInObjects: false
    //   }
    // ],
    'array-bracket-spacing': [1, 'never'], // 强制数组方括号中使用一致的空格
    // "space-infix-ops": [2, {"int32Hint": true}], //操作符周围的空格
    // "space-unary-ops": [2, { "words": true, "nonwords": false}], //在一元操作符前后使用一致的空格
    // "no-irregular-whitespace": 2, //不允许出现不规则的空格
    // "key-spacing": [2, {"beforeColon": false, "afterColon": true}], //对象字面量中冒号的前后空格
    // 'space-before-function-paren': 0,// 函数定义时括号前面要不要有空格
    // "keyword-spacing": 2, //关键字前后的空格
    // // 'vue/name-property-casing': ['error', 'PascalCase'], // vue/component-definition-name-casing 对组件定义名称强制使用特定的大小
    'no-var': 2, // 使用let和const代替var
    // "comma-dangle": ["error", "never"], //是否允许对象中出现结尾逗号
    // "no-cond-assign": 2, //条件语句的条件中不允许出现赋值运算符
    // "no-constant-condition": 2, //条件语句的条件中不允许出现恒定不变的量
    // "no-control-regex": 2, //正则表达式中不允许出现控制字符
    // "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
    // "no-dupe-keys": 2, //对象中不允许出现重复的键
    // "no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
    // "no-empty": 2, //不允许出现空的代码块
    // "no-empty-character-class": 2, //正则表达式中不允许出现空的字符组
    // "no-ex-assign": 2, //在try catch语句中不允许重新分配异常变量
    'no-extra-boolean-cast': 0 // 不允许出现不必要的布尔值转换
    // "no-extra-parens": 0, //不允许出现不必要的圆括号
    // "no-extra-semi": 2, //不允许出现不必要的分号
    // "no-func-assign": 2, //不允许重新分配函数声明
    // "no-inner-declarations": ["error", "functions"], //不允许在嵌套代码块里声明函数
    // "no-invalid-regexp": 2, //不允许在RegExp构造函数里出现无效的正则表达式
    // "no-negated-in-lhs": 2, //不允许在in表达式语句中对最左边的运算数使用取反操作
    // "no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
    // "no-regex-spaces": 2, //正则表达式中不允许出现多个连续空格
    // "quote-props": 2, //对象中的属性名是否需要用引号引起来
    // "no-sparse-arrays": 2, //数组中不允许出现空位置
    // "no-unreachable": 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
    // "use-isnan": 2, //要求检查NaN的时候使用isNaN()
    // "valid-jsdoc": ["error", {
    //     "requireReturn": false,
    //     "requireParamDescription": false,
    //     "requireReturnDescription": true
    // }], //强制JSDoc注释
    // "valid-typeof": ["error", {
    //     "requireStringLiterals": true
    // }], //在使用typeof表达式比较的时候强制使用有效的字符串
    // "block-scoped-var": 2, //将变量声明放在合适的代码块里
    // "complexity": 0, //限制条件语句的复杂度
    // "consistent-return": 2, //无论有没有返回值都强制要求return语句返回一个值
    // "curly": ["error", "all"], //强制使用花括号的风格
    // "default-case": 0, //在switch语句中需要有default语句
    // "dot-notation": ["error", {"allowKeywords": false, "allowPattern": ""}], //获取对象属性的时候使用点号
    // "no-alert": 1, //不允许使用alert，confirm，prompt语句
    // "no-caller": 2, //不允许使用arguments.callee和arguments.caller属性
    // "guard-for-in": 0, //监视for in循环，防止出现不可预料的情况
    // "no-div-regex": 2, //不能使用看起来像除法的正则表达式
    // "no-else-return": 0, //如果if语句有return，else里的return不用放在else里
    // "no-labels": ["error", {
    //     "allowLoop": false,
    //     "allowSwitch": false
    // }], //不允许标签语句
    // "no-eq-null": 2, //不允许对null用==或者!=
    // "no-eval": 2, //不允许使用eval()
    // "no-extend-native": 2, //不允许扩展原生对象
    // "no-extra-bind": 2, //不允许不必要的函数绑定
    // "no-fallthrough": 2, //不允许switch按顺序全部执行所有case
    // "no-floating-decimal": 2, //不允许浮点数缺失数字
    // "no-implied-eval": 2, //不允许使用隐式eval()
    // "no-iterator": 2, //不允许使用__iterator__属性
    // "no-lone-blocks": 2, //不允许不必要的嵌套代码块
    // "no-loop-func": 2, //不允许在循环语句中进行函数声明
    // "no-multi-spaces": 2, //不允许出现多余的空格
    // "no-multi-str": 2, //不允许用\来让字符串换行
    // "no-global-assign": 2, //不允许重新分配原生对象
    // "no-new": 2, //不允许new一个实例后不赋值或者不比较
    // "no-new-func": 2, //不允许使用new Function
    // "no-new-wrappers": 2, //不允许使用new String，Number和Boolean对象
    // "no-octal": 2, //不允许使用八进制字面值
    // "no-octal-escape": 2, //不允许使用八进制转义序列
    // "no-param-reassign": 0, //不允许重新分配函数参数"no-proto": 2, //不允许使用__proto__属性
    // "no-redeclare": 2, //不允许变量重复声明
    // "no-return-assign": 2, //不允许在return语句中使用分配语句
    // "no-script-url": 2, //不允许使用javascript:void(0)
    // "no-self-compare": 2, //不允许自己和自己比较
    // "no-sequences": 2, //不允许使用逗号表达式
    // "no-throw-literal": 2, //不允许抛出字面量错误 throw "error"
    // "no-unused-expressions": 2, //不允许无用的表达式
    // "no-void": 2, //不允许void操作符
    // "no-warning-comments": [1, {"terms": ["todo", "fixme", "any other term"]}], //不允许警告备注
    // "no-with": 2, //不允许使用with语句
    // "radix": 1, //使用parseInt时强制使用基数来指定是十进制还是其他进制
    // "vars-on-top": 0, //var必须放在作用域顶部
    // "wrap-iife": [2, "any"], //立即执行表达式的括号风格
    // "yoda": [2, "never", {"exceptRange": true}], //不允许在if条件中使用yoda条件
    // "strict": [2, "function"], //使用严格模式
    // "no-catch-shadow": 2, //不允许try catch语句接受的err变量与外部变量重名"no-delete-var": 2, //不允许使用delete操作符
    // "no-label-var": 2, //不允许标签和变量同名
    // "no-shadow": 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    // "no-shadow-restricted-names": 2, //js关键字和保留字不能作为函数名或者变量名
    // "no-undef": 2, //不允许未声明的变量
    // "no-undef-init": 2, //不允许初始化变量时给变量赋值undefined
    // "no-undefined": 2, //不允许把undefined当做标识符使用
    // "brace-style": [2, "1tbs", { "allowSingleLine": false}], //大括号风格
    // "camelcase": [2, {"properties": "never"}], //强制驼峰命名规则
    // "comma-style": [2, "last"], //逗号风格
    // "consistent-this": [0, "self"], //当获取当前环境的this是用一样的风格
    // "eol-last": 2, //文件以换行符结束
    // "func-names": 0, //函数表达式必须有名字
    // "func-style": 0, //函数风格，规定只能使用函数声明或者函数表达式
    // "max-nested-callbacks": 0, //回调嵌套深度
    // "new-cap": [2, {"newIsCap": true, "capIsNew": false}], //构造函数名字首字母要大写
    // "new-parens": 2, //new时构造函数必须有小括号
    // "newline-after-var": 0, //变量声明后必须空一行
    // "no-array-constructor": 2, //不允许使用数组构造器
    // "no-inline-comments": 0, //不允许行内注释
    // "no-lonely-if": 0, //不允许else语句内只有if语句
    // "no-multiple-empty-lines": [2, {"max": 2}], //空行最多不能超过两行
    // "no-nested-ternary": 2, //不允许使用嵌套的三目运算符
    // "no-new-object": 2, //禁止使用new Object()
    // "fun-call-spacing": 2, //函数调用时，函数名与()之间不能有空格
    // "no-ternary": 0, //不允许使用三目运算符
    // "no-trailing-spaces": 2, //一行最后不允许有空格
    // "no-underscore-dangle": 2, //不允许标识符以下划线开头
    // "no-extra-parens": 0, //不允许出现多余的括号
    // "one-var": 0, //强制变量声明放在一起
    // "operator-assignment": 0, //赋值运算符的风格
    // "padded-blocks": [2, "never"], //块内行首行尾是否空行
    // "quote-props": 0, //对象字面量中属性名加引号
    // "sort-vars": 0, //变量声明时排序
    // "space-before-blocks": [2, "always"], //块前的空格
    // "wrap-regex": 2, //正则表达式字面量用括号括起来
    // "max-depth": 0, //嵌套块深度
    // "max-len": 0, //一行最大长度，单位为字符
    // "max-params": 0, //函数最多能有多少个参数
    // "max-statements": 0, //函数内最多有几个声明
    // "no-bitwise": 0, //不允许使用位运算符
    // "no-plusplus": 0, // 不允许使用++ --运算符
    // 'no-bitwise': 'off', // 禁用按位运算符
    // indent: [
    //   'error',
    //   2,
    //   { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] },
    // ], // 强制使用一致的缩进
    // 'comma-dangle': ['error', 'always-multiline'], // 要求或禁止末尾逗号
    // 'max-len': ['error', 120], // 强制一行的最大长度
    // 'no-new': 'off', // 禁止使用 new 以避免产生副作用
    // 'linebreak-style': 'off', // 强制使用一致的换行风格
    // 'import/extensions': 'off', // 确保在导入路径中统一使用文件扩展名
    // 'eol-last': 'off', // 要求或禁止文件末尾存在空行
    // 'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    // 'import/no-cycle': 'off', // 禁止一个模块导入一个有依赖路径的模块回到自己身上
    // 'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
    // 'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
    // 'import/prefer-default-export': 'off', // 如果模块只输入一个名字，则倾向于默认输出
    // 'no-continue': 'off', // 禁用 continue 语句
    // 'prefer-destructuring': 'off', // 优先使用数组和对象解构
    // 'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    // 'global-require': 'off', // 要求 require() 出现在顶层模块作用域中
    // 'no-prototype-builtins': 'off', // 禁止直接调用 Object.prototypes 的内置属性
    // 'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
    // 'one-var-declaration-per-line': 'off', // 要求或禁止在变量声明周围换行
    // 'one-var': 'off', // 强制函数中的变量要么一起声明要么分开声明
    // 'import/named': 'off', // 确保命名导入与远程文件中的命名导出相对应
    // 'object-curly-newline': 'off', // 强制大括号内换行符的一致性
    // 'default-case': 'off', // 要求 switch 语句中有 default 分支
    // 'no-trailing-spaces': 'off', // 禁用行尾空格
    // 'func-names': 'off', // 要求或禁止使用命名的 function 表达式
    // radix: 'off', // 强制在 parseInt() 使用基数参数
    // 'no-unused-expressions': 'off', // 禁止出现未使用过的表达式
    // 'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
    // 'no-nested-ternary': 'off', // 禁用嵌套的三元表达式
    // 'no-restricted-syntax': 'off', // 禁用特定的语法
    // 'no-await-in-loop': 'off', // 禁止在循环中出现 await
    // 'import/no-extraneous-dependencies': 'off', // 禁止使用外部包
    // 'import/no-unresolved': 'off', // 确保导入指向一个可以解析的文件/模块
    // 'template-curly-spacing': ['error', 'always'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    // 'guard-for-in': 'off', // 要求 for-in 循环中有一个 if 语句
    // 'class-methods-use-this': 'off', // 强制类方法使用 this
    // 'vue/html-indent': [2, 2], // 在<template>中强制一致缩进
  }
};
